import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/server/auth";
import { hashPassword, verifyPassword } from "@/lib/server/auth";
import { getDb } from "@/lib/server/db";
import { isRateLimited, clientIp } from "@/lib/server/rateLimit";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ success: false }, { status: 401 });
  if (isRateLimited(`password:${clientIp(request)}`, 10, 5 * 60 * 1000)) {
    return NextResponse.json({ success: false, error: "rate_limited" }, { status: 429 });
  }
  try {
    const { currentPassword, newPassword } = await request.json();
    if (typeof currentPassword !== "string" || typeof newPassword !== "string") {
      return NextResponse.json({ success: false, error: "missing_fields" }, { status: 400 });
    }
    if (newPassword.length < 6) {
      return NextResponse.json({ success: false, error: "weak_password" }, { status: 400 });
    }
    if (!verifyPassword(currentPassword, user.password_hash)) {
      return NextResponse.json({ success: false, error: "invalid_credentials" }, { status: 401 });
    }
    getDb().prepare("UPDATE users SET password_hash = ? WHERE id = ?").run(hashPassword(newPassword), user.id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "invalid_request" }, { status: 400 });
  }
}
