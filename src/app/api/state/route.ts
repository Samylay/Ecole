import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/server/auth";
import { getLearnerState, putLearnerState } from "@/lib/server/db";

// Server mirror of the client's learner-state namespace (see src/lib/progress.ts).
// GET returns all keys; PUT upserts the posted keys. Server wins on login pull.

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ success: false }, { status: 401 });
  return NextResponse.json({ success: true, state: getLearnerState(user.id) });
}

export async function PUT(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ success: false }, { status: 401 });
  try {
    const body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ success: false, error: "invalid_request" }, { status: 400 });
    }
    const entries = Object.entries(body as Record<string, unknown>).filter(
      ([key]) => key.length <= 64 && /^[a-z_]+$/.test(key)
    );
    if (entries.length > 50 || JSON.stringify(body).length > 500_000) {
      return NextResponse.json({ success: false, error: "too_large" }, { status: 413 });
    }
    putLearnerState(user.id, Object.fromEntries(entries));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "invalid_request" }, { status: 400 });
  }
}
