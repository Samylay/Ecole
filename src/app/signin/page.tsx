"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLocale } from "@/lib/locale-context";
import { useProgress } from "@/lib/progress-context";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignInPage() {
  const { t } = useLocale();
  const { login } = useProgress();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  function markTouched(field: string) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  const emailError = useMemo(() => {
    if (!touched.email || !email) return "";
    if (!EMAIL_REGEX.test(email)) return t.auth.emailInvalid;
    return "";
  }, [email, touched.email, t.auth.emailInvalid]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email && password) {
      const name = email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      login(name, email);
      router.push("/");
    }
  }

  const EyeIcon = ({ open }: { open: boolean }) =>
    open ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 012.31-3.814M6.938 6.937A9.966 9.966 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.969 9.969 0 01-4.043 5.063M15 12a3 3 0 01-6 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
      </svg>
    );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md animate-fade-in-up">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">{t.auth.signIn}</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Email */}
              <div>
                <label htmlFor="signin-email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t.auth.email}
                </label>
                <input
                  id="signin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => markTouched("email")}
                  aria-label={t.auth.email}
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? "signin-email-error" : undefined}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all ${
                    emailError ? "border-red-400" : "border-gray-300"
                  }`}
                  placeholder="email@example.com"
                  required
                />
                {emailError && (
                  <p id="signin-email-error" className="mt-1 text-sm text-red-600" role="alert">
                    {emailError}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="signin-password" className="block text-sm font-medium text-gray-700 mb-1">
                  {t.auth.password}
                </label>
                <div className="relative">
                  <input
                    id="signin-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-label={t.auth.password}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all pr-12"
                    placeholder="********"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 hover:opacity-75 transition-opacity"
                    aria-label={t.auth.showPassword}
                    tabIndex={-1}
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                </div>
              </div>

              {/* Remember me + Forgot password row */}
              <div className="flex items-center justify-between">
                <label htmlFor="remember-me" className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    aria-label={t.auth.rememberMe}
                  />
                  <span className="text-sm text-gray-600">{t.auth.rememberMe}</span>
                </label>
                <button type="button" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  {t.auth.forgotPassword}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all active:scale-[0.98]"
              >
                {t.auth.signIn}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">{t.auth.orContinueWith}</span>
                </div>
              </div>

              <button
                onClick={() => { login("Google User", "user@gmail.com"); router.push("/"); }}
                className="mt-4 w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="font-medium text-gray-700">{t.auth.google}</span>
              </button>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              {t.auth.noAccount}{" "}
              <Link href="/signup" className="text-indigo-600 font-medium hover:text-indigo-700">
                {t.auth.signUp}
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
