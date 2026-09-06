import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/server/auth";
import { createAccessPlan, listSubjectPrograms, setAccessPlanActive, type AccessPeriod } from "@/lib/server/db";
import { clientIp, isRateLimited } from "@/lib/server/rateLimit";

const PERIODS: AccessPeriod[] = ["annual", "term", "monthly", "installment"];

async function requireAdmin(request: Request, action: string) {
  const admin = await getCurrentUser();
  if (admin?.role !== "admin") return { error: "forbidden" as const };
  if (isRateLimited(`${action}:${admin.id}:${clientIp(request)}`, 60, 5 * 60 * 1000)) {
    return { error: "rate_limited" as const };
  }
  return { admin };
}

export async function POST(request: Request, { params }: { params: Promise<{ programId: string }> }) {
  const auth = await requireAdmin(request, "admin-access-plans-create");
  if ("error" in auth) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.error === "forbidden" ? 403 : 429 });
  }
  const { programId } = await params;
  if (!listSubjectPrograms().some((program) => program.id === programId)) {
    return NextResponse.json({ success: false, error: "not_found" }, { status: 404 });
  }
  try {
    const body = (await request.json()) as {
      period?: unknown;
      amountDzd?: unknown;
      periodMonths?: unknown;
      periodsCovered?: unknown;
      graceDays?: unknown;
    };
    if (
      typeof body.period !== "string" || !PERIODS.includes(body.period as AccessPeriod) ||
      !Number.isInteger(body.amountDzd) || (body.amountDzd as number) < 0
    ) {
      return NextResponse.json({ success: false, error: "invalid_request" }, { status: 400 });
    }
    const plan = createAccessPlan({
      id: randomUUID(),
      programId,
      period: body.period as AccessPeriod,
      amountDzd: body.amountDzd as number,
      periodMonths: Number.isInteger(body.periodMonths) && (body.periodMonths as number) > 0 ? (body.periodMonths as number) : undefined,
      periodsCovered: Number.isInteger(body.periodsCovered) && (body.periodsCovered as number) > 0 ? (body.periodsCovered as number) : undefined,
      graceDays: Number.isInteger(body.graceDays) && (body.graceDays as number) >= 0 ? (body.graceDays as number) : undefined,
    });
    return NextResponse.json({ success: true, plan }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "invalid_request" }, { status: 400 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ programId: string }> }) {
  const auth = await requireAdmin(request, "admin-access-plans-update");
  if ("error" in auth) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.error === "forbidden" ? 403 : 429 });
  }
  const { programId } = await params;
  try {
    const body = (await request.json()) as { planId?: unknown; active?: unknown };
    if (typeof body.planId !== "string" || typeof body.active !== "boolean") {
      return NextResponse.json({ success: false, error: "invalid_request" }, { status: 400 });
    }
    setAccessPlanActive(programId, body.planId, body.active);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "invalid_request" }, { status: 400 });
  }
}
