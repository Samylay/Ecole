"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { useLocale } from "@/lib/locale-context";
import { useAuth } from "@/lib/auth-context";

export default function SignInPage() {
  const { t } = useLocale();
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const errorMessages: Record<string, string> = {
    invalid_credentials: t.auth.invalidCredentials,
    missing_fields: t.auth.missingFields,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError(t.auth.missingFields);
      return;
    }

    setLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        router.push("/my-courses");
      } else {
        setError(errorMessages[result.error || ""] || t.auth.invalidCredentials);
      }
    } catch {
      setError(t.auth.invalidCredentials);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">{t.auth.signIn}</h1>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="signin-email" className="block text-sm font-medium text-gray-700 mb-1">{t.auth.email}</label>
                <input
                  id="signin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="email@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <label htmlFor="signin-password" className="block text-sm font-medium text-gray-700 mb-1">{t.auth.password}</label>
                <input
                  id="signin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="********"
                  autoComplete="current-password"
                  required
                />
              </div>

              <div className="text-right">
                <button type="button" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  {t.auth.forgotPassword}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "..." : t.auth.signIn}
              </button>
            </form>

            {/* Demo credentials hint */}
            <div className="mt-4 p-3 bg-indigo-50 border border-indigo-100 rounded-lg text-sm text-indigo-700">
              <p className="font-medium mb-1">Demo:</p>
              <p>student@layaida.com / password123</p>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              {t.auth.noAccount}{" "}
              <Link href="/signup" className="text-indigo-600 font-medium hover:text-indigo-700">
                {t.auth.signUp}
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
