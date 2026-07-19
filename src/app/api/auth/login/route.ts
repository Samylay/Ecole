import { NextResponse } from "next/server";
import { findUserByEmail } from "@/lib/server/db";
import { verifyPassword, startSession, publicUser } from "@/lib/server/auth";
import { isRateLimited, clientIp } from "@/lib/server/rateLimit";

export async function POST(request: Request) {
  if (isRateLimited(`login:${clientIp(request)}`, 10, 5 * 60 * 1000)) {
    return NextResponse.json({ success: false, error: "rate_limited" }, { status: 429 });
  }
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json({ success: false, error: "missing_fields" }, { status: 400 });
    }

    const user = findUserByEmail(email.trim().toLowerCase());
    if (!user || !verifyPassword(password, user.password_hash)) {
      return NextResponse.json({ success: false, error: "invalid_credentials" }, { status: 401 });
    }

    await startSession(user.id);
    return NextResponse.json({ success: true, user: publicUser(user) });
  } catch {
    return NextResponse.json({ success: false, error: "invalid_request" }, { status: 400 });
  }
}
