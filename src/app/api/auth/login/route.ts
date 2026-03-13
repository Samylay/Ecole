import { NextResponse } from "next/server";

// Hardcoded users database
const USERS = [
  { name: "Ahmed Layaida", email: "student@layaida.com", password: "password123" },
  { name: "Sara Benali", email: "sara@layaida.com", password: "password123" },
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json({ success: false, error: "missing_fields" }, { status: 400 });
    }

    const trimmedEmail = email.trim().toLowerCase();

    const user = USERS.find((u) => u.email === trimmedEmail && u.password === password);

    if (!user) {
      return NextResponse.json({ success: false, error: "invalid_credentials" }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      user: { name: user.name, email: user.email },
    });
  } catch {
    return NextResponse.json({ success: false, error: "invalid_request" }, { status: 400 });
  }
}
