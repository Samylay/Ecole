import { NextResponse } from "next/server";

// Hardcoded existing emails (simulating a database)
const EXISTING_EMAILS = ["student@layaida.com", "sara@layaida.com"];

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json({ success: false, error: "missing_fields" }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ success: false, error: "weak_password" }, { status: 400 });
  }

  if (EXISTING_EMAILS.includes(email)) {
    return NextResponse.json({ success: false, error: "email_taken" }, { status: 409 });
  }

  // Simulate successful registration
  return NextResponse.json({
    success: true,
    user: { name, email },
  });
}
