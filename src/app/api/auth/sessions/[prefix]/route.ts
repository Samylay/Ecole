import { NextResponse } from "next/server";
import { getCurrentSessionToken, getCurrentUser } from "@/lib/server/auth";
import { deleteSessionByPrefix } from "@/lib/server/db";
import { clientIp, isRateLimited } from "@/lib/server/rateLimit";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ prefix: string }> }
) {
  const user = await getCurrentUser();
  const token = await getCurrentSessionToken();
  if (!user || !token) return NextResponse.json({ success: false }, { status: 401 });
  if (isRateLimited(`session-revoke:${user.id}:${clientIp(request)}`, 20, 5 * 60 * 1000)) {
    return NextResponse.json({ success: false, error: "rate_limited" }, { status: 429 });
  }

  const { prefix } = await context.params;
  if (!/^[a-f0-9]{8}$/.test(prefix)) {
    return NextResponse.json({ success: false, error: "invalid_request" }, { status: 400 });
  }
  if (token.startsWith(prefix)) {
    return NextResponse.json({ success: false, error: "current_session" }, { status: 400 });
  }

  const revoked = deleteSessionByPrefix(user.id, prefix, token);
  if (!revoked) return NextResponse.json({ success: false, error: "not_found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
