import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { getCurrentUser, hashPassword, publicUser } from "@/lib/server/auth";
import { createUser, findUserByEmail } from "@/lib/server/db";
import { clientIp, isRateLimited } from "@/lib/server/rateLimit";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const admin = await getCurrentUser();
  if (admin?.role !== "admin") {
    return NextResponse.json({ success: false, error: "forbidden" }, { status: 403 });
  }
  if (isRateLimited(`admin-students:${admin.id}:${clientIp(request)}`, 20, 5 * 60 * 1000)) {
    return NextResponse.json({ success: false, error: "rate_limited" }, { status: 429 });
  }

  try {
    const body = (await request.json()) as { name?: unknown; email?: unknown };
    if (typeof body.name !== "string" || typeof body.email !== "string") {
      return NextResponse.json({ success: false, error: "invalid_request" }, { status: 400 });
    }
    const name = body.name.trim();
    const email = body.email.trim().toLowerCase();
    if (name.length < 2 || name.length > 100 || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ success: false, error: "invalid_request" }, { status: 400 });
    }
    if (findUserByEmail(email)) {
      return NextResponse.json({ success: false, error: "email_taken" }, { status: 409 });
    }

    // Activation is passwordless. This unusable random password prevents the
    // staff-created account from having a shared/default credential.
    const temporarySecret = randomBytes(32).toString("hex");
    const user = createUser(name, email, hashPassword(temporarySecret), "student");
    return NextResponse.json({
      success: true,
      user: { id: user.id, ...publicUser(user) },
      tempInfo: { activationPending: true },
    });
  } catch {
    return NextResponse.json({ success: false, error: "invalid_request" }, { status: 400 });
  }
}
