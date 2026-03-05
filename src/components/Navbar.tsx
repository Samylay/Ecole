"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale } from "@/lib/locale-context";
import { useAuth } from "@/lib/auth-context";
import { Locale, localeNames, locales } from "@/lib/i18n";

export function Navbar() {
  const { locale, setLocale, t } = useLocale();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Layaida</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
              {t.nav.home}
            </Link>
            {user && (
              <>
                <Link href="/#courses" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
                  {t.nav.courses}
                </Link>
                <Link href="/my-courses" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
                  {t.nav.myCourses}
                </Link>
              </>
            )}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                {localeNames[locale]}
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[120px]">
                  {locales.map((l: Locale) => (
                    <button
                      key={l}
                      onClick={() => { setLocale(l); setLangOpen(false); }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${locale === l ? "text-indigo-600 font-medium" : "text-gray-700"}`}
                    >
                      {localeNames[l]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-indigo-700 font-semibold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-red-600 font-medium text-sm transition-colors"
                >
                  {t.auth.logout}
                </button>
              </div>
            ) : (
              <>
                <Link href="/signin" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
                  {t.nav.signIn}
                </Link>
                <Link
                  href="/signup"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-medium transition-colors"
                >
                  {t.nav.signUp}
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-2">
            <Link href="/" className="block py-2 text-gray-600 font-medium" onClick={() => setMobileOpen(false)}>
              {t.nav.home}
            </Link>
            {user && (
              <>
                <Link href="/#courses" className="block py-2 text-gray-600 font-medium" onClick={() => setMobileOpen(false)}>
                  {t.nav.courses}
                </Link>
                <Link href="/my-courses" className="block py-2 text-gray-600 font-medium" onClick={() => setMobileOpen(false)}>
                  {t.nav.myCourses}
                </Link>
              </>
            )}
            <hr className="my-2" />
            <div className="flex gap-2">
              {locales.map((l: Locale) => (
                <button
                  key={l}
                  onClick={() => { setLocale(l); }}
                  className={`px-3 py-1 rounded text-sm ${locale === l ? "bg-indigo-100 text-indigo-700" : "text-gray-600"}`}
                >
                  {localeNames[l]}
                </button>
              ))}
            </div>
            <hr className="my-2" />
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 py-2">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-indigo-700 font-semibold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </div>
                <button
                  onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="block w-full text-left py-2 text-red-600 font-medium"
                >
                  {t.auth.logout}
                </button>
              </div>
            ) : (
              <>
                <Link href="/signin" className="block py-2 text-gray-600 font-medium" onClick={() => setMobileOpen(false)}>
                  {t.nav.signIn}
                </Link>
                <Link
                  href="/signup"
                  className="block text-center bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {t.nav.signUp}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
