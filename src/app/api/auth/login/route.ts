import { NextResponse } from "next/server";
import { findUserByEmail } from "@/lib/server/db";
import { verifyPassword, startSession, publicUser } from "@/lib/server/auth";
import { isBlocked, recordFailure, clearFailures, clientIp } from "@/lib/server/rateLimit";

const WINDOW_MS = 5 * 60 * 1000;
const MAX_FAILURES = 10;

export async function POST(request: Request) {
  // Algerian mobile carriers put large, unrelated populations behind shared
  // CGNAT (see .scratch/risk-auth/MAP.md), so one public IP is not one
  // attacker or even one household — it can be a whole class on the same
  // carrier. Blocking on ATTEMPTS would lock out a classroom sharing that IP.
  // Block on FAILURES per IP instead, and only consume the budget on an
  // actual wrong password, so legitimate concurrent sign-ins are unaffected
  // while brute force is still capped.
  const ipKey = `login:${clientIp(request)}`;
  if (isBlocked(ipKey, MAX_FAILURES, WINDOW_MS)) {
    return NextResponse.json({ success: false, error: "rate_limited" }, { status: 429 });
  }
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json({ success: false, error: "missing_fields" }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    // Also rate-limit per account, independent of IP: this is what actually
    // stops a targeted password-guessing attempt, since the attacker's IP is
    // not shared with anyone and the account-scoped budget can't be drained
    // by unrelated users on the same carrier NAT.
    const accountKey = `login-acct:${normalizedEmail}`;
    if (isBlocked(accountKey, MAX_FAILURES, WINDOW_MS)) {
      return NextResponse.json({ success: false, error: "rate_limited" }, { status: 429 });
    }

    const user = findUserByEmail(normalizedEmail);
    if (!user || !verifyPassword(password, user.password_hash)) {
      recordFailure(ipKey, WINDOW_MS);
      recordFailure(accountKey, WINDOW_MS);
      return NextResponse.json({ success: false, error: "invalid_credentials" }, { status: 401 });
    }

    clearFailures(ipKey);
    clearFailures(accountKey);
    await startSession(user.id);
    return NextResponse.json({ success: true, user: publicUser(user) });
  } catch {
    return NextResponse.json({ success: false, error: "invalid_request" }, { status: 400 });
  }
}
