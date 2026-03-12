"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLocale } from "@/lib/locale-context";
import { useProgress } from "@/lib/progress-context";
import { SearchBar } from "@/components/SearchBar";
import { Locale, localeNames, locales } from "@/lib/i18n";

export function Navbar() {
  const { locale, setLocale, t } = useLocale();
  const { user, logout } = useProgress();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">Layaida</span>
          </Link>

          {/* Search - center */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <SearchBar />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors text-sm">
              {t.nav.home}
            </Link>
            <Link href="/#courses" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors text-sm">
              {t.nav.courses}
            </Link>
            <Link href="/my-courses" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors text-sm">
              {t.nav.myCourses}
            </Link>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-indigo-600 px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                {localeNames[locale]}
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[130px] animate-scale-in">
                  {locales.map((l: Locale) => (
                    <button
                      key={l}
                      onClick={() => { setLocale(l); setLangOpen(false); }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${locale === l ? "text-indigo-600 font-medium" : "text-gray-700"}`}
                    >
                      {localeNames[l]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {user.isLoggedIn ? (
              <div className="relative" ref={userRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {user.avatar}
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden lg:block">{user.name}</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[180px] animate-scale-in">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-medium text-sm text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <Link href="/my-courses" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      {t.nav.myCourses}
                    </Link>
                    <Link href="/dashboard" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      {t.nav.dashboard}
                    </Link>
                    <button onClick={() => { logout(); setUserMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                      {t.nav.signOut}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/signin" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors text-sm">
                  {t.nav.signIn}
                </Link>
                <Link
                  href="/signup"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-medium transition-colors text-sm"
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
        <div className="md:hidden border-t border-gray-200 bg-white animate-fade-in">
          <div className="px-4 py-3 space-y-2">
            {/* Mobile Search */}
            <div className="pb-2">
              <SearchBar />
            </div>
            <Link href="/" className="block py-2 text-gray-600 font-medium" onClick={() => setMobileOpen(false)}>
              {t.nav.home}
            </Link>
            <Link href="/#courses" className="block py-2 text-gray-600 font-medium" onClick={() => setMobileOpen(false)}>
              {t.nav.courses}
            </Link>
            <Link href="/my-courses" className="block py-2 text-gray-600 font-medium" onClick={() => setMobileOpen(false)}>
              {t.nav.myCourses}
            </Link>
            <hr className="my-2" />
            <div className="flex gap-2">
              {locales.map((l: Locale) => (
                <button
                  key={l}
                  onClick={() => { setLocale(l); }}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${locale === l ? "bg-indigo-100 text-indigo-700 font-medium" : "text-gray-600 hover:bg-gray-100"}`}
                >
                  {localeNames[l]}
                </button>
              ))}
            </div>
            <hr className="my-2" />
            {user.isLoggedIn ? (
              <>
                <div className="flex items-center gap-3 py-2">
                  <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {user.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <button onClick={() => { logout(); setMobileOpen(false); }} className="block w-full text-left py-2 text-red-600 font-medium">
                  {t.nav.signOut}
                </button>
              </>
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
