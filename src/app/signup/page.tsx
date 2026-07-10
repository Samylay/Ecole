"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, GraduationCap, Users, Check } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { useAuth } from "@/lib/auth-context";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

type Role = "student" | "parent";

function passwordStrength(pw: string): 0 | 1 | 2 | 3 {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[0-9]/.test(pw) && /[a-zA-Z]/.test(pw)) score++;
  return Math.min(score, 3) as 0 | 1 | 2 | 3;
}

export default function SignUpPage() {
  const { t } = useLocale();
  const { signup } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<Role>("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | undefined>>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const strength = passwordStrength(password);
  const strengthLabels = ["", t.auth.strengthWeak, t.auth.strengthMedium, t.auth.strengthStrong];
  const strengthColors = ["", "bg-error", "bg-warning", "bg-success"];

  const validate = (field: string) => {
    setFieldErrors((prev) => {
      const next = { ...prev };
      if (field === "name") next.name = name.trim() ? undefined : t.auth.missingFields;
      if (field === "email") next.email = /\S+@\S+\.\S+/.test(email) ? undefined : t.auth.missingFields;
      if (field === "password") next.password = password.length >= 6 ? undefined : t.auth.weakPassword;
      if (field === "confirm") next.confirm = confirm === password ? undefined : t.auth.passwordMismatch;
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password) {
      setFormError(t.auth.missingFields);
      return;
    }
    if (password.length < 6) {
      setFormError(t.auth.weakPassword);
      return;
    }
    if (password !== confirm) {
      setFormError(t.auth.passwordMismatch);
      return;
    }
    setFormError("");
    setLoading(true);
    const result = await signup(name, email, password, role);
    setLoading(false);
    if (result.success) {
      router.push(role === "parent" ? "/parent" : "/onboarding");
    } else {
      setFormError(result.error === "email_taken" ? t.auth.emailTaken : t.auth.invalidCredentials);
    }
  };

  const roles: { value: Role; icon: React.ReactNode; label: string; desc: string }[] = [
    {
      value: "student",
      icon: <GraduationCap className="h-6 w-6" aria-hidden="true" />,
      label: t.auth.iAmStudent,
      desc: t.auth.iAmStudentDesc,
    },
    {
      value: "parent",
      icon: <Users className="h-6 w-6" aria-hidden="true" />,
      label: t.auth.iAmParent,
      desc: t.auth.iAmParentDesc,
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4 py-10">
      <div className="w-full max-w-md rounded-card bg-surface p-8 shadow-card">
        <Link href="/" className="mb-6 flex items-center gap-2" aria-label="Layaida">
          <Image src="/logo.png" alt="" width={32} height={32} className="rounded-chip" />
          <span className="text-[17px] font-semibold lowercase text-ink">layaida</span>
        </Link>

        <h1 className="text-[22px] font-semibold text-ink">{t.auth.signUpTitle}</h1>

        {/* Role cards, toggle like radios */}
        <fieldset className="mt-5">
          <legend className="mb-2 text-[13px] font-medium text-slate">{t.auth.whoAreYou}</legend>
          <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label={t.auth.whoAreYou}>
            {roles.map((r) => {
              const active = role === r.value;
              return (
                <button
                  key={r.value}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setRole(r.value)}
                  className={`relative rounded-card border-[1.5px] p-4 text-start transition-[border-color,background-color,box-shadow,transform] duration-[var(--duration-base)] ease-[var(--ease-out-custom)] active:scale-[0.98] ${
                    active ? "border-primary bg-primary-soft/50 shadow-card" : "border-mist hover:border-faint"
                  }`}
                >
                  {active && (
                    <span className="absolute end-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-pill bg-primary text-white">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  )}
                  <span className={active ? "text-primary" : "text-muted"}>{r.icon}</span>
                  <span className="mt-2 block text-[15px] font-semibold text-ink">{r.label}</span>
                  <span className="mt-0.5 block text-[13px] leading-snug text-muted">{r.desc}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
          <Input
            label={t.auth.fullName}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => validate("name")}
            error={fieldErrors.name}
            icon={<User className="h-5 w-5" />}
            autoComplete="name"
            required
          />
          <Input
            type="email"
            label={t.auth.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => validate("email")}
            error={fieldErrors.email}
            icon={<Mail className="h-5 w-5" />}
            autoComplete="email"
            required
          />
          <div>
            <Input
              type="password"
              label={t.auth.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => validate("password")}
              error={fieldErrors.password}
              icon={<Lock className="h-5 w-5" />}
              autoComplete="new-password"
              required
            />
            {/* Live strength meter */}
            {password && (
              <div className="mt-2 flex items-center gap-3">
                <div className="flex flex-1 gap-1.5" aria-hidden="true">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`h-1.5 flex-1 rounded-pill transition-colors duration-[var(--duration-base)] ${
                        strength >= step ? strengthColors[strength] : "bg-mist"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[13px] font-medium text-muted">{strengthLabels[strength]}</span>
              </div>
            )}
          </div>
          <Input
            type="password"
            label={t.auth.confirmPassword}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            onBlur={() => validate("confirm")}
            error={fieldErrors.confirm}
            icon={<Lock className="h-5 w-5" />}
            autoComplete="new-password"
            required
          />

          {formError && (
            <p role="alert" className="rounded-input bg-error-soft px-4 py-3 text-[13px] font-medium text-error">
              {formError}
            </p>
          )}

          <Button type="submit" loading={loading} className="w-full">
            {t.auth.signUp}
          </Button>
        </form>

        <p className="mt-6 text-center text-[13px] text-muted">
          {t.auth.hasAccount}{" "}
          <Link href="/signin" className="font-semibold text-primary hover:underline">
            {t.auth.signIn}
          </Link>
        </p>
      </div>
    </div>
  );
}
