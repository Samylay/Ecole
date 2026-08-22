import { NextResponse } from "next/server";
import { getCurrentSessionToken, getCurrentUser } from "@/lib/server/auth";
import { listActiveSessions } from "@/lib/server/db";
import { clientIp, isRateLimited } from "@/lib/server/rateLimit";

export async function GET(request: Request) {
  const user = await getCurrentUser();
  const token = await getCurrentSessionToken();
  if (!user || !token) return NextResponse.json({ success: false }, { status: 401 });
  if (isRateLimited(`sessions:${user.id}:${clientIp(request)}`, 60, 5 * 60 * 1000)) {
    return NextResponse.json({ success: false, error: "rate_limited" }, { status: 429 });
  }

  const sessions = listActiveSessions(user.id, token).map((session) => ({
    id: session.id,
    ua: session.user_agent,
    ip: session.ip,
    created_at: session.created_at,
    last_seen_at: session.last_seen_at,
    current: Boolean(session.current),
  }));
  return NextResponse.json({ success: true, sessions });
}
