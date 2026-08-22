import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/server/auth";
import { clientIp, isRateLimited } from "@/lib/server/rateLimit";
import { countDistinctActiveDevices } from "@/lib/server/risk";

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ success: false }, { status: 401 });
  if (isRateLimited(`risk:${user.id}:${clientIp(request)}`, 60, 5 * 60 * 1000)) {
    return NextResponse.json({ success: false, error: "rate_limited" }, { status: 429 });
  }
  return NextResponse.json({ distinctDevices24h: countDistinctActiveDevices(user.id) });
}
