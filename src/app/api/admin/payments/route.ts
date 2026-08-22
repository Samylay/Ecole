import { NextResponse } from "next/server";
import { getCourse } from "@/lib/data";
import { getCurrentUser } from "@/lib/server/auth";
import {
  createPayment,
  findUserById,
  listPendingPayments,
} from "@/lib/server/db";
import { clientIp, isRateLimited } from "@/lib/server/rateLimit";

async function requireAdmin(request: Request, action: string) {
  const admin = await getCurrentUser();
  if (admin?.role !== "admin") return { error: "forbidden" as const };
  if (isRateLimited(`${action}:${admin.id}:${clientIp(request)}`, 60, 5 * 60 * 1000)) {
    return { error: "rate_limited" as const };
  }
  return { admin };
}

export async function GET(request: Request) {
  const auth = await requireAdmin(request, "admin-payments-list");
  if ("error" in auth) {
    return NextResponse.json(
      { success: false, error: auth.error },
      { status: auth.error === "forbidden" ? 403 : 429 }
    );
  }
  return NextResponse.json({ success: true, payments: listPendingPayments() });
}

export async function POST(request: Request) {
  const auth = await requireAdmin(request, "admin-payments-create");
  if ("error" in auth) {
    return NextResponse.json(
      { success: false, error: auth.error },
      { status: auth.error === "forbidden" ? 403 : 429 }
    );
  }

  try {
    const body = (await request.json()) as {
      userId?: unknown;
      courseId?: unknown;
      amount?: unknown;
      method?: unknown;
    };
    if (
      !Number.isInteger(body.userId) ||
      typeof body.courseId !== "string" ||
      body.courseId.length === 0 ||
      body.courseId.length > 128 ||
      !Number.isInteger(body.amount) ||
      (body.amount as number) < 0 ||
      (body.method !== "cash" && body.method !== "chargily")
    ) {
      return NextResponse.json({ success: false, error: "invalid_request" }, { status: 400 });
    }
    if (!findUserById(body.userId as number) || !getCourse(body.courseId)) {
      return NextResponse.json({ success: false, error: "not_found" }, { status: 404 });
    }
    const payment = createPayment(
      body.userId as number,
      body.courseId,
      body.amount as number,
      body.method,
      auth.admin.id
    );
    return NextResponse.json({ success: true, payment }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "invalid_request" }, { status: 400 });
  }
}
