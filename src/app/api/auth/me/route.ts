import { NextResponse } from "next/server";
import { getCurrentUser, publicUser } from "@/lib/server/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, user: null }, { status: 401 });
  }
  return NextResponse.json({ success: true, user: publicUser(user) });
}
