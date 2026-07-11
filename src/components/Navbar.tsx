"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Globe, Menu, X, LogOut } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { useAuth } from "@/lib/auth-context";
import { Locale, localeNames, locales } from "@/lib/i18n";
import { ButtonLink } from "./Button";

function NavPill({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`rounded-pill px-4 py-2 text-[15px] font-medium transition-[background-color,color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-custom)] active:scale-[0.98] ${
        active ? "bg-primary-soft text-primary-hover dark:text-primary" : "text-slate hover:bg-mist"
      }`}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const { locale, setLocale, t } = useLocale();
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const links = user
    ? [
        { href: "/dashboard", label: t.nav.dashboard },
        { href: "/courses", label: t.nav.courses },
        { href: "/my-courses", label: t.nav.myCourses },
        { href: "/profile", label: t.nav.profile },
      ]
    : [
        { href: "/", label: t.nav.home },
        { href: "/courses", label: t.nav.courses },
      ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-surface" aria-label={t.common.mainNav}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2" aria-label="Layaida">
            <Image src="/logo.png" alt="" width={32} height={32} className="rounded-chip" />
            <span className="text-[17px] font-semibold lowercase text-ink">layaida</span>
          </Link>

          {/* Desktop nav pills */}
          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <NavPill key={link.href} href={link.href} label={link.label} active={pathname === link.href} />
            ))}
          </div>

          {/* Right side */}
          <div className="hidden items-center gap-2 md:flex">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex min-h-11 items-center gap-1.5 rounded-pill px-3 text-[13px] font-medium text-slate transition-[background-color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-custom)] hover:bg-mist active:scale-[0.98]"
                aria-expanded={langOpen}
                aria-haspopup="listbox"
                aria-label={`${t.common.languageLabel}: ${localeNames[locale]}`}
              >
                <Globe className="h-4 w-4" aria-hidden="true" />
                {localeNames[locale]}
              </button>
              {langOpen && (
                <div
                  className="absolute end-0 mt-1 min-w-[130px] rounded-input border border-border bg-surface py-1 shadow-lift"
                  role="listbox"
                  aria-label={t.common.selectLanguage}
                >
                  {locales.map((l: Locale) => (
                    <button
                      key={l}
                      role="option"
                      aria-selected={locale === l}
                      onClick={() => {
                        setLocale(l);
                        setLangOpen(false);
                      }}
                      className={`block w-full px-4 py-2 text-start text-[13px] transition-[background-color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-custom)] hover:bg-mist active:scale-[0.98] ${
                        locale === l ? "font-semibold text-primary" : "text-slate"
                      }`}
                    >
                      {localeNames[l]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 rounded-pill px-2 py-1.5 transition-[background-color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-custom)] hover:bg-mist active:scale-[0.98]"
                  aria-label={t.nav.profile}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-pill bg-primary-soft text-[13px] font-semibold text-primary-hover dark:text-primary">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="text-[13px] font-medium text-slate">{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex min-h-11 items-center gap-1.5 rounded-pill px-3 text-[13px] font-medium text-muted transition-[background-color,color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-custom)] hover:bg-error-soft hover:text-error active:scale-[0.98]"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  {t.auth.logout}
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="rounded-pill px-4 py-2 text-[15px] font-medium text-slate transition-[background-color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-custom)] hover:bg-mist active:scale-[0.98]"
                >
                  {t.nav.signIn}
                </Link>
                <ButtonLink href="/signup">{t.nav.signUp}</ButtonLink>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex h-11 w-11 items-center justify-center rounded-pill text-slate transition-[background-color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-custom)] hover:bg-mist active:scale-[0.98] md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t.common.closeMenu : t.common.openMenu}
          >
            {mobileOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-surface md:hidden">
          <div className="space-y-1 px-4 py-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block rounded-input px-3 py-3 text-[15px] font-medium transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out-custom)] active:scale-[0.98] ${
                  pathname === link.href ? "bg-primary-soft text-primary-hover dark:text-primary" : "text-slate"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2 border-border-soft" />
            <div className="flex gap-2 px-1">
              {locales.map((l: Locale) => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className={`min-h-11 rounded-pill px-4 text-[13px] font-medium transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out-custom)] active:scale-[0.98] ${
                    locale === l ? "bg-primary-soft text-primary-hover dark:text-primary" : "text-slate"
                  }`}
                >
                  {localeNames[l]}
                </button>
              ))}
            </div>
            <hr className="my-2 border-border-soft" />
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                }}
                className="block w-full rounded-input px-3 py-3 text-start text-[15px] font-medium text-error transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out-custom)] active:scale-[0.98]"
              >
                {t.auth.logout}
              </button>
            ) : (
              <div className="flex gap-3 px-1 py-2">
                <ButtonLink href="/signin" variant="secondary" className="flex-1">
                  {t.nav.signIn}
                </ButtonLink>
                <ButtonLink href="/signup" className="flex-1">
                  {t.nav.signUp}
                </ButtonLink>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
