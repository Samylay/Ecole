import { NextResponse } from "next/server";
import { createUser, findUserByEmail } from "@/lib/server/db";
import { hashPassword, startSession, publicUser } from "@/lib/server/auth";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, role } = body;

    if (
      !name || !email || !password ||
      typeof name !== "string" || typeof email !== "string" || typeof password !== "string"
    ) {
      return NextResponse.json({ success: false, error: "missing_fields" }, { status: 400 });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const userRole = role === "parent" ? "parent" : "student";

    if (trimmedName.length < 2 || trimmedName.length > 100) {
      return NextResponse.json({ success: false, error: "missing_fields" }, { status: 400 });
    }
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return NextResponse.json({ success: false, error: "missing_fields" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ success: false, error: "weak_password" }, { status: 400 });
    }
    if (findUserByEmail(trimmedEmail)) {
      return NextResponse.json({ success: false, error: "email_taken" }, { status: 409 });
    }

    const user = createUser(trimmedName, trimmedEmail, hashPassword(password), userRole);
    await startSession(user.id);

    return NextResponse.json({ success: true, user: publicUser(user) });
  } catch {
    return NextResponse.json({ success: false, error: "invalid_request" }, { status: 400 });
  }
}
