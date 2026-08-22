"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Banknote, UserPlus } from "lucide-react";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/Input";
import { Navbar } from "@/components/Navbar";
import { useToast } from "@/components/Toast";
import { useAuth } from "@/lib/auth-context";
import { courses } from "@/lib/data";
import { formatNumber } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";

type PendingPayment = {
  id: number;
  user_id: number;
  user_name: string;
  user_email: string;
  course_id: string;
  amount: number;
  method: "cash" | "chargily";
  status: "pending";
  created_at: number;
};

export default function AdminPage() {
  const { user, isLoading } = useAuth();
  const { locale, t } = useLocale();
  const { showToast } = useToast();
  const router = useRouter();
  const [payments, setPayments] = useState<PendingPayment[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [courseId, setCourseId] = useState(courses[0]?.id ?? "");
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [markingId, setMarkingId] = useState<number | null>(null);
  const [formError, setFormError] = useState("");

  const loadPayments = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/payments");
      if (!response.ok) return;
      const data = await response.json();
      setPayments(data.payments ?? []);
    } catch {
      // The list stays usable with its last successful state while offline.
    }
  }, []);

  useEffect(() => {
    if (!isLoading && user?.role !== "admin") router.replace(user ? "/dashboard" : "/signin");
  }, [isLoading, router, user]);

  useEffect(() => {
    if (user?.role === "admin") void loadPayments();
  }, [loadPayments, user]);

  if (isLoading || user?.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    const dinars = Number(amount);
    if (name.trim().length < 2 || !email.includes("@") || !Number.isFinite(dinars) || dinars < 0) {
      setFormError(t.admin.invalidForm);
      return;
    }
    setSubmitting(true);
    setFormError("");
    try {
      const studentResponse = await fetch("/api/admin/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const studentData = await studentResponse.json();
      if (!studentResponse.ok) {
        setFormError(studentData.error === "email_taken" ? t.admin.emailTaken : t.admin.requestFailed);
        return;
      }
      showToast(t.admin.studentCreatedToast);

      const paymentResponse = await fetch("/api/admin/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: studentData.user.id,
          courseId,
          amount: Math.round(dinars * 100),
          method: "cash",
        }),
      });
      if (!paymentResponse.ok) {
        setFormError(t.admin.requestFailed);
        return;
      }
      showToast(t.admin.paymentCreatedToast);
      setName("");
      setEmail("");
      setAmount("");
      await loadPayments();
    } catch {
      setFormError(t.admin.requestFailed);
    } finally {
      setSubmitting(false);
    }
  };

  const handleMarkPaid = async (paymentId: number) => {
    setMarkingId(paymentId);
    try {
      const response = await fetch(`/api/admin/payments/${paymentId}/mark-paid`, { method: "POST" });
      const data = await response.json();
      if (!response.ok) {
        showToast(t.admin.requestFailed);
        return;
      }
      setPayments((current) => current.filter((payment) => payment.id !== paymentId));
      showToast(data.mailSent ? t.admin.paymentPaidToast : t.admin.activationMailWarning);
    } catch {
      showToast(t.admin.requestFailed);
    } finally {
      setMarkingId(null);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <a href="#main" className="skip-to-content">{t.common.skipToContent}</a>
      <Navbar />
      <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-[22px] font-semibold text-ink">{t.admin.title}</h1>
        <p className="mt-1 text-[15px] text-muted">{t.admin.subtitle}</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <form onSubmit={handleCreate} className="rounded-card border border-border bg-surface p-6 shadow-card">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-pill bg-primary-soft text-primary-hover dark:text-primary">
                <UserPlus className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="text-[17px] font-semibold text-ink">{t.admin.createStudent}</h2>
            </div>
            <div className="mt-5 space-y-4">
              <Input label={t.admin.studentName} value={name} onChange={(e) => setName(e.target.value)} required />
              <Input label={t.admin.studentEmail} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <div>
                <label htmlFor="admin-course" className="mb-1.5 block text-[13px] font-medium text-slate">{t.admin.course}</label>
                <select id="admin-course" value={courseId} onChange={(e) => setCourseId(e.target.value)} className="h-12 w-full rounded-input border-[1.5px] border-mist bg-surface px-4 text-[15px] text-ink transition-colors duration-[var(--duration-base)] focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary-soft">
                  {courses.map((course) => <option key={course.id} value={course.id}>{course.title[locale]}</option>)}
                </select>
              </div>
              <Input label={t.admin.amount} type="number" min="0" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} required />
              <p className="text-[13px] text-muted">{t.admin.amountHint}</p>
              {formError && <p role="alert" className="text-[13px] font-medium text-error">{formError}</p>}
              <Button type="submit" loading={submitting} className="w-full">{t.admin.createAndRecord}</Button>
            </div>
          </form>

          <section aria-labelledby="pending-payments-title">
            <div className="flex items-center gap-3">
              <Banknote className="h-5 w-5 text-primary" aria-hidden="true" />
              <h2 id="pending-payments-title" className="text-[17px] font-semibold text-ink">{t.admin.pendingPayments}</h2>
            </div>
            {payments.length === 0 ? (
              <div className="mt-4 rounded-card border border-border bg-surface p-6 text-center">
                <p className="text-[15px] font-semibold text-ink">{t.admin.noPendingTitle}</p>
                <p className="mt-1 text-[13px] text-muted">{t.admin.noPendingBody}</p>
              </div>
            ) : (
              <ul className="mt-4 space-y-3">
                {payments.map((payment) => {
                  const course = courses.find((item) => item.id === payment.course_id);
                  return (
                    <li key={payment.id} className="rounded-card border border-border bg-surface p-5 shadow-card">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="text-[15px] font-semibold text-ink">{payment.user_name}</p>
                          <p className="text-[13px] text-muted">{payment.user_email}</p>
                          <p className="mt-2 text-[13px] text-slate">{course?.title[locale] ?? payment.course_id}</p>
                          <p className="mt-1 font-mono text-[11px] font-medium text-ink">
                            {formatNumber(locale, payment.amount / 100)} DA · {t.admin.cash} · {t.admin.pending}
                          </p>
                        </div>
                        <Button onClick={() => void handleMarkPaid(payment.id)} loading={markingId === payment.id} size="sm" className="min-h-11">
                          {t.admin.markPaid}
                        </Button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
