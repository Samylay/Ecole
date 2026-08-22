import { createHash, randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { findUserByEmail } from "@/lib/server/db";
import { createEmailToken } from "@/lib/server/db";
import { sendMail } from "@/lib/server/mailer";
import { isRateLimited, clientIp } from "@/lib/server/rateLimit";

// T7-3: passwordless login — issue a 15-minute single-use magic link.
// Always answers success (no account enumeration); the email decides.

const TOKEN_TTL_MS = 15 * 60 * 1000;

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function POST(request: Request) {
  if (isRateLimited(`magic:${clientIp(request)}`, 5, 5 * 60 * 1000)) {
    return NextResponse.json({ success: false, error: "rate_limited" }, { status: 429 });
  }
  try {
    const body = (await request.json()) as { email?: unknown };
    if (typeof body.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ success: false, error: "invalid_request" }, { status: 400 });
    }
    const email = body.email.trim().toLowerCase();
    const user = findUserByEmail(email);
    if (!user) {
      // do not reveal whether the address exists
      return NextResponse.json({ success: true });
    }
    const token = randomBytes(32).toString("hex");
    createEmailToken(email, "magic_login", hashToken(token), TOKEN_TTL_MS);

    const base = process.env.LAYAIDA_PUBLIC_URL ?? new URL(request.url).origin;
    const link = `${base}/auth/magic?token=${token}`;
    await sendMail({
      to: email,
      subject: "Ton lien de connexion Layaida",
      text:
        "Salam !\n\n" +
        `Voici ton lien de connexion (valable 15 minutes, à usage unique) :\n${link}\n\n` +
        "Si tu n'as pas demandé ce lien, ignore ce message.\n\n— Layaida",
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "invalid_request" }, { status: 400 });
  }
}
