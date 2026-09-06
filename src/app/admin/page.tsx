"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Banknote, GraduationCap, UserPlus } from "lucide-react";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/Input";
import { Navbar } from "@/components/Navbar";
import { LocalizedField, LocalizedValue } from "@/components/teacher/LocalizedField";
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

type AccessPeriod = "annual" | "term" | "monthly" | "installment";

type AccessPlan = {
  id: string;
  program_id: string;
  period: AccessPeriod;
  amount_dzd: number;
  active: 0 | 1;
};

type SubjectProgram = {
  id: string;
  subject: string;
  level: "middle" | "high";
  academic_year: string;
  stream: string | null;
  title_fr: string;
  title_en: string;
  title_ar: string;
  plans: AccessPlan[];
  courseIds: string[];
};

const EMPTY_LOCALIZED: LocalizedValue = { fr: "", en: "", ar: "" };

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

  const [programs, setPrograms] = useState<SubjectProgram[]>([]);
  const [programId, setProgramId] = useState("");
  const [programSubject, setProgramSubject] = useState<"math" | "physics" | "biology">("math");
  const [programLevel, setProgramLevel] = useState<"middle" | "high">("high");
  const [programAcademicYear, setProgramAcademicYear] = useState("");
  const [programStream, setProgramStream] = useState("");
  const [programTitle, setProgramTitle] = useState<LocalizedValue>(EMPTY_LOCALIZED);
  const [programError, setProgramError] = useState("");
  const [creatingProgram, setCreatingProgram] = useState(false);
  const [planForms, setPlanForms] = useState<Record<string, { period: AccessPeriod; amount: string }>>({});
  const [linkCourseForms, setLinkCourseForms] = useState<Record<string, string>>({});
  const [busyProgramId, setBusyProgramId] = useState<string | null>(null);

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

  const loadPrograms = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/subject-programs");
      if (!response.ok) return;
      const data = await response.json();
      setPrograms(data.programs ?? []);
    } catch {
      // The list stays usable with its last successful state while offline.
    }
  }, []);

  useEffect(() => {
    if (!isLoading && user?.role !== "admin") router.replace(user ? "/dashboard" : "/signin");
  }, [isLoading, router, user]);

  useEffect(() => {
    if (user?.role === "admin") {
      void loadPayments();
      void loadPrograms();
    }
  }, [loadPayments, loadPrograms, user]);

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

  const handleCreateProgram = async (event: React.FormEvent) => {
    event.preventDefault();
    if (
      !/^[a-z0-9-]{2,64}$/.test(programId) ||
      !programTitle.fr.trim() || !programTitle.en.trim() || !programTitle.ar.trim()
    ) {
      setProgramError(t.admin.invalidForm);
      return;
    }
    setCreatingProgram(true);
    setProgramError("");
    try {
      const response = await fetch("/api/admin/subject-programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: programId,
          subject: programSubject,
          level: programLevel,
          academicYear: programAcademicYear.trim() || undefined,
          stream: programStream.trim() || undefined,
          titleFr: programTitle.fr,
          titleEn: programTitle.en,
          titleAr: programTitle.ar,
        }),
      });
      if (!response.ok) {
        setProgramError(t.admin.requestFailed);
        return;
      }
      showToast(t.admin.programCreatedToast);
      setProgramId("");
      setProgramAcademicYear("");
      setProgramStream("");
      setProgramTitle(EMPTY_LOCALIZED);
      await loadPrograms();
    } catch {
      setProgramError(t.admin.requestFailed);
    } finally {
      setCreatingProgram(false);
    }
  };

  const handleAddPlan = async (targetProgramId: string) => {
    const form = planForms[targetProgramId] ?? { period: "annual" as AccessPeriod, amount: "" };
    const amountDzd = Math.round(Number(form.amount) * 100);
    if (!Number.isFinite(amountDzd) || amountDzd < 0) {
      showToast(t.admin.invalidForm);
      return;
    }
    setBusyProgramId(targetProgramId);
    try {
      const response = await fetch(`/api/admin/subject-programs/${targetProgramId}/plans`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ period: form.period, amountDzd }),
      });
      if (!response.ok) {
        showToast(t.admin.requestFailed);
        return;
      }
      showToast(t.admin.planCreatedToast);
      setPlanForms((current) => ({ ...current, [targetProgramId]: { period: form.period, amount: "" } }));
      await loadPrograms();
    } catch {
      showToast(t.admin.requestFailed);
    } finally {
      setBusyProgramId(null);
    }
  };

  const handleTogglePlan = async (targetProgramId: string, planId: string, active: boolean) => {
    setBusyProgramId(targetProgramId);
    try {
      const response = await fetch(`/api/admin/subject-programs/${targetProgramId}/plans`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, active }),
      });
      if (!response.ok) {
        showToast(t.admin.requestFailed);
        return;
      }
      showToast(t.admin.planUpdatedToast);
      await loadPrograms();
    } catch {
      showToast(t.admin.requestFailed);
    } finally {
      setBusyProgramId(null);
    }
  };

  const handleLinkCourse = async (targetProgramId: string) => {
    const targetCourseId = linkCourseForms[targetProgramId] ?? courses[0]?.id ?? "";
    if (!targetCourseId) return;
    setBusyProgramId(targetProgramId);
    try {
      const response = await fetch(`/api/admin/subject-programs/${targetProgramId}/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: targetCourseId }),
      });
      if (!response.ok) {
        showToast(t.admin.requestFailed);
        return;
      }
      showToast(t.admin.courseLinkedToast);
      await loadPrograms();
    } catch {
      showToast(t.admin.requestFailed);
    } finally {
      setBusyProgramId(null);
    }
  };

  const periodLabels: Record<AccessPeriod, string> = {
    annual: t.admin.periodAnnual,
    term: t.admin.periodTerm,
    monthly: t.admin.periodMonthly,
    installment: t.admin.periodInstallment,
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

        <div className="mt-12">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-pill bg-primary-soft text-primary-hover dark:text-primary">
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-[17px] font-semibold text-ink">{t.admin.programsTitle}</h2>
              <p className="text-[13px] text-muted">{t.admin.programsSubtitle}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <form onSubmit={handleCreateProgram} className="rounded-card border border-border bg-surface p-6 shadow-card">
              <h3 className="text-[15px] font-semibold text-ink">{t.admin.newProgram}</h3>
              <div className="mt-4 space-y-4">
                <Input label={t.admin.programId} value={programId} onChange={(e) => setProgramId(e.target.value.trim().toLowerCase())} required />
                <p className="-mt-2 text-[13px] text-muted">{t.admin.programIdHint}</p>
                <div>
                  <label htmlFor="program-subject" className="mb-1.5 block text-[13px] font-medium text-slate">{t.studio.subject}</label>
                  <select id="program-subject" value={programSubject} onChange={(e) => setProgramSubject(e.target.value as typeof programSubject)} className="h-12 w-full rounded-input border-[1.5px] border-mist bg-surface px-4 text-[15px] text-ink transition-colors duration-[var(--duration-base)] focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary-soft">
                    <option value="math">{t.studio.subjectMath}</option>
                    <option value="physics">{t.studio.subjectPhysics}</option>
                    <option value="biology">{t.studio.subjectBiology}</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="program-level" className="mb-1.5 block text-[13px] font-medium text-slate">{t.studio.level}</label>
                  <select id="program-level" value={programLevel} onChange={(e) => setProgramLevel(e.target.value as typeof programLevel)} className="h-12 w-full rounded-input border-[1.5px] border-mist bg-surface px-4 text-[15px] text-ink transition-colors duration-[var(--duration-base)] focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary-soft">
                    <option value="middle">{t.studio.levelMiddle}</option>
                    <option value="high">{t.studio.levelHigh}</option>
                  </select>
                </div>
                <Input label={t.admin.academicYear} value={programAcademicYear} onChange={(e) => setProgramAcademicYear(e.target.value)} placeholder="2026-2027" />
                <Input label={t.admin.stream} value={programStream} onChange={(e) => setProgramStream(e.target.value)} />
                <p className="-mt-2 text-[13px] text-muted">{t.admin.streamHint}</p>
                <LocalizedField label={t.admin.programTitle} value={programTitle} onChange={setProgramTitle} />
                {programError && <p role="alert" className="text-[13px] font-medium text-error">{programError}</p>}
                <Button type="submit" loading={creatingProgram} className="w-full">{t.admin.createProgram}</Button>
              </div>
            </form>

            {programs.length === 0 ? (
              <div className="rounded-card border border-border bg-surface p-6 text-center">
                <p className="text-[15px] font-semibold text-ink">{t.admin.noProgramsTitle}</p>
                <p className="mt-1 text-[13px] text-muted">{t.admin.noProgramsBody}</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {programs.map((program) => {
                  const planForm = planForms[program.id] ?? { period: "annual" as AccessPeriod, amount: "" };
                  const linkedCourseId = linkCourseForms[program.id] ?? courses[0]?.id ?? "";
                  const busy = busyProgramId === program.id;
                  return (
                    <li key={program.id} className="rounded-card border border-border bg-surface p-5 shadow-card">
                      <p className="text-[15px] font-semibold text-ink">{program.title_fr}</p>
                      <p className="font-mono text-[11px] text-faint">{program.id} · {program.subject} · {program.level}{program.stream ? ` · ${program.stream}` : ""}</p>

                      <div className="mt-4">
                        <p className="text-[13px] font-medium text-slate">{t.admin.plans}</p>
                        <ul className="mt-2 space-y-2">
                          {program.plans.map((plan) => (
                            <li key={plan.id} className="flex items-center justify-between gap-3 rounded-input border border-border px-3 py-2">
                              <span className="font-mono text-[13px] text-ink">
                                {periodLabels[plan.period]} · {formatNumber(locale, plan.amount_dzd / 100)} DA
                              </span>
                              <Button size="sm" variant="secondary" loading={busy} onClick={() => void handleTogglePlan(program.id, plan.id, plan.active === 0)}>
                                {plan.active === 1 ? t.admin.deactivate : t.admin.activate}
                              </Button>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-3 flex flex-wrap items-end gap-2">
                          <select
                            aria-label={t.admin.period}
                            value={planForm.period}
                            onChange={(e) => setPlanForms((current) => ({ ...current, [program.id]: { ...planForm, period: e.target.value as AccessPeriod } }))}
                            className="h-11 rounded-input border-[1.5px] border-mist bg-surface px-3 text-[13px] text-ink focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary-soft"
                          >
                            <option value="annual">{t.admin.periodAnnual}</option>
                            <option value="term">{t.admin.periodTerm}</option>
                            <option value="monthly">{t.admin.periodMonthly}</option>
                            <option value="installment">{t.admin.periodInstallment}</option>
                          </select>
                          <Input
                            label={t.admin.priceDzd}
                            type="number"
                            min="0"
                            step="0.01"
                            value={planForm.amount}
                            onChange={(e) => setPlanForms((current) => ({ ...current, [program.id]: { ...planForm, amount: e.target.value } }))}
                            className="w-32"
                          />
                          <Button size="sm" loading={busy} onClick={() => void handleAddPlan(program.id)}>{t.admin.addPlan}</Button>
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="text-[13px] font-medium text-slate">{t.admin.linkedCourses}</p>
                        {program.courseIds.length > 0 && (
                          <p className="mt-1 text-[13px] text-muted">
                            {program.courseIds.map((id) => courses.find((c) => c.id === id)?.title[locale] ?? id).join(", ")}
                          </p>
                        )}
                        <div className="mt-2 flex flex-wrap items-end gap-2">
                          <div>
                            <label htmlFor={`link-course-${program.id}`} className="mb-1.5 block text-[13px] font-medium text-slate">{t.admin.linkCourse}</label>
                            <select
                              id={`link-course-${program.id}`}
                              value={linkedCourseId}
                              onChange={(e) => setLinkCourseForms((current) => ({ ...current, [program.id]: e.target.value }))}
                              className="h-11 rounded-input border-[1.5px] border-mist bg-surface px-3 text-[13px] text-ink focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-primary-soft"
                            >
                              {courses.map((course) => <option key={course.id} value={course.id}>{course.title[locale]}</option>)}
                            </select>
                          </div>
                          <Button size="sm" loading={busy} onClick={() => void handleLinkCourse(program.id)}>{t.admin.link}</Button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
