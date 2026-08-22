import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { consumeEmailToken, findUserByEmail } from "@/lib/server/db";
import { startSession } from "@/lib/server/auth";
import { isRateLimited, clientIp } from "@/lib/server/rateLimit";

// T7-3: consume a magic-login token and start a session. The raw token only
// ever lives in the emailed link; the DB stores sha256(token) — a DB leak
// cannot mint valid links.

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function POST(request: Request) {
  if (isRateLimited(`magicv:${clientIp(request)}`, 10, 5 * 60 * 1000)) {
    return NextResponse.json({ success: false, error: "rate_limited" }, { status: 429 });
  }
  try {
    const body = (await request.json()) as { token?: unknown };
    if (typeof body.token !== "string" || body.token.length < 32 || body.token.length > 256) {
      return NextResponse.json({ success: false, error: "invalid_request" }, { status: 400 });
    }
    const result = consumeEmailToken("magic_login", hashToken(body.token));
    if (!result) {
      return NextResponse.json({ success: false, error: "invalid_or_expired" }, { status: 401 });
    }
    // account may have been deleted between issue and consume
    const user = findUserByEmail(result.email);
    if (!user) {
      return NextResponse.json({ success: false, error: "invalid_or_expired" }, { status: 401 });
    }
    await startSession(user.id);
    return NextResponse.json({
      success: true,
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch {
    return NextResponse.json({ success: false, error: "invalid_request" }, { status: 400 });
  }
}
