// In-memory sliding-window rate limiter for auth routes. No new dependency:
// ecole.service is a single long-lived Node process (not serverless), so an
// in-memory Map survives for the process lifetime and needs no external store.
const hits = new Map<string, number[]>();

function recent(key: string, windowMs: number, now: number): number[] {
  return (hits.get(key) ?? []).filter((t) => now - t < windowMs);
}

// Opportunistic cleanup so the map doesn't grow unbounded over long uptime.
function sweep(now: number, windowMs: number): void {
  if (hits.size <= 5000) return;
  for (const [k, timestamps] of hits) {
    if (timestamps.every((t) => now - t >= windowMs)) hits.delete(k);
  }
}

/**
 * Record an attempt and report whether the caller is now over the limit.
 * Counts every call, so it is the right shape for things where the *attempt*
 * is the abuse (creating accounts), not for sign-in — see the note below.
 */
export function isRateLimited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const timestamps = recent(key, windowMs, now);
  timestamps.push(now);
  hits.set(key, timestamps);
  sweep(now, windowMs);
  return timestamps.length > max;
}

/**
 * Read the window WITHOUT consuming from it.
 *
 * Sign-in needs this because our users sit behind carrier-grade NAT: a class of
 * students on Algerian mobile data shares one public IP, so counting every
 * sign-in *attempt* against that IP locks out a whole classroom of legitimate
 * children while doing nothing to an attacker who rotates addresses. Counting
 * only failures (recordFailure below) keeps the limit meaningful for brute
 * force and harmless for a busy shared connection.
 */
export function isBlocked(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const timestamps = recent(key, windowMs, now);
  hits.set(key, timestamps);
  return timestamps.length >= max;
}

/** Consume one slot. Call only on a genuine failure. */
export function recordFailure(key: string, windowMs: number): void {
  const now = Date.now();
  const timestamps = recent(key, windowMs, now);
  timestamps.push(now);
  hits.set(key, timestamps);
  sweep(now, windowMs);
}

/** Forget a key's failures. Call on success so one bad guess isn't sticky. */
export function clearFailures(key: string): void {
  hits.delete(key);
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

// Only for tests/probes — the Map is process-global otherwise.
export function __resetRateLimitState(): void {
  hits.clear();
}
