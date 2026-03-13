import { NextResponse } from "next/server";

// Hardcoded existing emails (simulating a database)
const EXISTING_EMAILS = ["student@layaida.com", "sara@layaida.com"];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (
      !name || !email || !password ||
      typeof name !== "string" || typeof email !== "string" || typeof password !== "string"
    ) {
      return NextResponse.json({ success: false, error: "missing_fields" }, { status: 400 });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (trimmedName.length < 2 || trimmedName.length > 100) {
      return NextResponse.json({ success: false, error: "missing_fields" }, { status: 400 });
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return NextResponse.json({ success: false, error: "missing_fields" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ success: false, error: "weak_password" }, { status: 400 });
    }

    if (EXISTING_EMAILS.includes(trimmedEmail)) {
      return NextResponse.json({ success: false, error: "email_taken" }, { status: 409 });
    }

    // Simulate successful registration
    return NextResponse.json({
      success: true,
      user: { name: trimmedName, email: trimmedEmail },
    });
  } catch {
    return NextResponse.json({ success: false, error: "invalid_request" }, { status: 400 });
  }
}
