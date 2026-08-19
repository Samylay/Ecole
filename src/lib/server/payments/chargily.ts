// Chargily Pay v2 client — the front-runner candidate in .scratch/payments/MAP.md
// (registration drops you into Test Mode with zero documents; Live Mode's
// approval gate for an individual is unverified — see that map). Built and
// tested offline before any account/key exists, same pattern LifeOS used for
// enable-banking.ts: the request/response shapes and the webhook signature
// algorithm are public API contract, not secrets, so they can be implemented
// and proven correct with node:crypto now. No new dependency.
//
// NOT wired into any route yet — there is nowhere to write an enrolment to
// (ROADMAP P6-T1, enrollments table, still NEEDS-USER) and no provider has
// actually been picked (P6-T3, still NEEDS-USER). This is the provider-
// specific half of the "payment port" MAP.md describes; the port interface
// itself stays unbuilt until a second provider is ever in scope — one
// implementation doesn't need an abstraction over itself.
//
// Sources (dev.chargily.com/pay-v2/webhooks, github.com/Chargily/chargily-pay-javascript,
// researched 2026-08-17 — see .scratch/payments/RESEARCH.md):
//   - Signature header: "signature" (lowercase), HMAC-SHA256 over the RAW
//     request body bytes (pre-JSON-parse), hex-encoded, signed with the API
//     SECRET key (not a separate webhook secret).
//   - Confirmed event types: checkout.paid / checkout.failed / checkout.canceled
//     (only these three are attested by Chargily's own docs — no published
//     exhaustive enum).
//   - UNVERIFIED: whether the checkout-creation field for the callback URL is
//     named `webhook_endpoint` (per the SDK's TypeScript types, checked-in
//     working code) or `webhook_url` (per the docs' prose, which disagrees).
//     Using the SDK's name below since it's the more trustworthy of two
//     disagreeing primary sources — confirm against the real sandbox before
//     this is ever wired to a live checkout.

import { createHmac, timingSafeEqual } from "node:crypto";

export type ChargilyLocale = "ar" | "en" | "fr";

export type CreateCheckoutParams = {
  amount: number;
  currency: string; // e.g. "dzd"
  success_url: string;
  failure_url?: string;
  webhook_endpoint?: string; // see the UNVERIFIED note above
  description?: string;
  locale?: ChargilyLocale;
  metadata?: Record<string, unknown>;
};

/**
 * Build the request body for POST {base}/checkouts. Pure function — no
 * network, no key required, safe to unit test. Mirrors the SDK's own
 * pre-flight checks (success_url must be http(s), amount/currency required)
 * so a bad request fails locally instead of round-tripping to the API first.
 */
export function buildCheckoutPayload(params: CreateCheckoutParams): CreateCheckoutParams {
  if (!/^https?:\/\//.test(params.success_url)) {
    throw new Error("Chargily: success_url must start with http:// or https://");
  }
  if (!Number.isInteger(params.amount) || params.amount <= 0) {
    throw new Error("Chargily: amount must be a positive integer (smallest currency unit)");
  }
  if (!params.currency) {
    throw new Error("Chargily: currency is required");
  }
  return params;
}

export type ChargilyEventType = "checkout.paid" | "checkout.failed" | "checkout.canceled";

export type ChargilyCheckoutStatus = "pending" | "processing" | "paid" | "failed" | "canceled";

export type ChargilyWebhookEvent = {
  id: string;
  entity: "event";
  livemode: boolean | string;
  type: ChargilyEventType | (string & {});
  data: {
    id: string;
    entity: "checkout";
    amount: number;
    currency?: string;
    status: ChargilyCheckoutStatus;
    metadata: Record<string, unknown> | null;
    created_at: number;
    updated_at: number;
    [key: string]: unknown;
  };
  created_at: number;
  updated_at: number;
};

/**
 * Verify a Chargily webhook's "signature" header against the raw request
 * body. MUST be called with the raw bytes exactly as received — parsing the
 * body to JSON and re-serializing it before verifying will not match, the
 * same gotcha Stripe's SDK warns about. Throws (matching the official SDK's
 * own behavior) rather than returning false on a mismatch, so a caller can't
 * accidentally ignore the return value and proceed.
 */
export function verifyChargilyWebhookSignature(rawBody: Buffer, signatureHeader: string, apiSecretKey: string): true {
  if (!signatureHeader) {
    throw new Error("Chargily webhook: missing signature header");
  }
  const computed = createHmac("sha256", apiSecretKey).update(rawBody).digest("hex");
  const digest = Buffer.from(computed, "utf8");
  const provided = Buffer.from(signatureHeader, "utf8");
  if (digest.length !== provided.length || !timingSafeEqual(digest, provided)) {
    throw new Error("Chargily webhook: invalid signature");
  }
  return true;
}

/**
 * Parse+verify in one step. Throws on a bad signature or unparseable body.
 * The caller is responsible for idempotency (dedupe on `event.data.id` +
 * `event.type` against the `payments.provider_ref` UNIQUE index, per
 * .scratch/payments/MAP.md — Chargily documents no idempotency-key mechanism
 * of its own, confirmed absent in both docs and SDK source).
 */
export function parseChargilyWebhook(rawBody: Buffer, signatureHeader: string, apiSecretKey: string): ChargilyWebhookEvent {
  verifyChargilyWebhookSignature(rawBody, signatureHeader, apiSecretKey);
  return JSON.parse(rawBody.toString("utf8")) as ChargilyWebhookEvent;
}
