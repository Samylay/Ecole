"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { useAuth } from "@/lib/auth-context";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function SignInPage() {
  const { t } = useLocale();
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = () => {
    setFieldErrors((prev) => ({ ...prev, email: email.trim() ? undefined : t.auth.missingFields }));
  };
  const validatePassword = () => {
    setFieldErrors((prev) => ({ ...prev, password: password ? undefined : t.auth.missingFields }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setFormError(t.auth.missingFields);
      return;
    }
    setFormError("");
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      router.push("/dashboard");
    } else {
      setFormError(t.auth.invalidCredentials);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4 py-10">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-card bg-surface shadow-card md:grid-cols-2">
        {/* Ink testimonial panel (desktop) */}
        <div className="hidden flex-col justify-between bg-ink p-10 text-bg dark:bg-bg dark:text-ink md:flex">
          <Link href="/" className="flex items-center gap-2" aria-label="Layaida">
            <Image src="/logo.png" alt="" width={36} height={36} className="rounded-chip bg-surface p-0.5" />
            <span className="text-[17px] font-semibold lowercase">layaida</span>
          </Link>
          <div>
            <p className="text-[17px] leading-relaxed">{t.auth.testimonial}</p>
            <p className="mt-4 text-[13px] font-medium text-faint">{t.auth.testimonialAuthor}</p>
          </div>
          <p className="text-[13px] text-faint">{t.footer.tagline}</p>
        </div>

        {/* Form */}
        <div className="p-8 md:p-10">
          <Link href="/" className="mb-8 flex items-center gap-2 md:hidden" aria-label="Layaida">
            <Image src="/logo.png" alt="" width={32} height={32} className="rounded-chip" />
            <span className="text-[17px] font-semibold lowercase text-ink">layaida</span>
          </Link>

          <h1 className="text-[22px] font-semibold text-ink">{t.auth.signInTitle}</h1>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            <Input
              type="email"
              label={t.auth.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
              error={fieldErrors.email}
              icon={<Mail className="h-5 w-5" />}
              autoComplete="email"
              required
            />
            <Input
              type="password"
              label={t.auth.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={validatePassword}
              error={fieldErrors.password}
              icon={<Lock className="h-5 w-5" />}
              autoComplete="current-password"
              required
            />

            {formError && (
              <p role="alert" className="rounded-input bg-error-soft px-4 py-3 text-[13px] font-medium text-error">
                {formError}
              </p>
            )}

            <div className="text-end">
              <Link href="#" className="text-[13px] font-medium text-primary hover:underline">
                {t.auth.forgotPassword}
              </Link>
            </div>

            <Button type="submit" loading={loading} className="w-full">
              {t.auth.signIn}
            </Button>
          </form>

          <p className="mt-6 text-center text-[13px] text-muted">
            {t.auth.noAccount}{" "}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              {t.auth.signUp}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
