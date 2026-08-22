import { createHash, randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { getTranslations } from "@/lib/i18n";
import { getCurrentUser } from "@/lib/server/auth";
import {
  createEmailToken,
  findUserById,
  grantEnrollment,
  markPaymentPaid,
} from "@/lib/server/db";
import { sendMail } from "@/lib/server/mailer";
import { clientIp, isRateLimited } from "@/lib/server/rateLimit";

const ACTIVATION_TTL_MS = 24 * 60 * 60 * 1000;

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentUser();
  if (admin?.role !== "admin") {
    return NextResponse.json({ success: false, error: "forbidden" }, { status: 403 });
  }
  if (isRateLimited(`admin-mark-paid:${admin.id}:${clientIp(request)}`, 30, 5 * 60 * 1000)) {
    return NextResponse.json({ success: false, error: "rate_limited" }, { status: 429 });
  }

  const rawId = (await params).id;
  if (!/^\d+$/.test(rawId)) {
    return NextResponse.json({ success: false, error: "invalid_request" }, { status: 400 });
  }
  const payment = markPaymentPaid(Number(rawId));
  if (!payment) {
    return NextResponse.json({ success: false, error: "not_pending" }, { status: 409 });
  }

  const student = findUserById(payment.user_id);
  if (!student) {
    return NextResponse.json({ success: false, error: "not_found" }, { status: 404 });
  }
  grantEnrollment(student.id, payment.course_id, "cash", admin.id);

  const token = randomBytes(32).toString("hex");
  createEmailToken(student.email, "account_activation", hashToken(token), ACTIVATION_TTL_MS);
  const base = process.env.LAYAIDA_PUBLIC_URL ?? new URL(request.url).origin;
  const link = `${base}/auth/magic?token=${token}`;
  const copy = getTranslations("fr").admin;
  const mailSent = await sendMail({
    to: student.email,
    subject: copy.activationSubject,
    text: copy.activationText.replace("{name}", student.name).replace("{link}", link),
  });

  return NextResponse.json({ success: true, payment, mailSent });
}
