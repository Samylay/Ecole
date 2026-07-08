"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Settings2, Lock, Bell } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Segmented } from "@/components/Tabs";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useToast } from "@/components/Toast";
import { useLocale } from "@/lib/locale-context";
import { useAuth } from "@/lib/auth-context";
import { useTheme, Theme } from "@/lib/theme-context";
import { Locale, localeNames, formatNumber } from "@/lib/i18n";
import {
  getWeeklyGoal,
  setWeeklyGoal,
  getNotificationsEnabled,
  setNotificationsEnabled,
  migrateLegacyProgress,
} from "@/lib/progress";

type Section = "account" | "preferences" | "security";

export default function ProfilePage() {
  const { t, locale, setLocale } = useLocale();
  const { theme, setTheme } = useTheme();
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();

  const [section, setSection] = useState<Section>("account");
  const [goal, setGoal] = useState(4);
  const [notifications, setNotifications] = useState(true);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [pwError, setPwError] = useState("");

  useEffect(() => {
    if (!isLoading && !user) router.replace("/signin");
  }, [user, isLoading, router]);

  useEffect(() => {
    migrateLegacyProgress();
    setGoal(getWeeklyGoal());
    setNotifications(getNotificationsEnabled());
  }, [user]);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const sections: { value: Section; label: string; icon: React.ReactNode }[] = [
    { value: "account", label: t.profile.account, icon: <User className="h-4 w-4" aria-hidden="true" /> },
    { value: "preferences", label: t.profile.preferences, icon: <Settings2 className="h-4 w-4" aria-hidden="true" /> },
    { value: "security", label: t.profile.security, icon: <Lock className="h-4 w-4" aria-hidden="true" /> },
  ];

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPw.length < 6) {
      setPwError(t.auth.weakPassword);
      return;
    }
    setPwError("");
    setCurrentPw("");
    setNewPw("");
    showToast(t.profile.savedToast);
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <a href="#main" className="skip-to-content">
        Skip to content
      </a>
      <Navbar />

      <main id="main" className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-[22px] font-semibold text-ink">{t.profile.title}</h1>

        <div className="mt-6 grid gap-8 md:grid-cols-[230px_1fr]">
          {/* Settings sidebar (desktop) / segmented (mobile) */}
          <div className="md:hidden">
            <Segmented
              options={sections.map((s) => ({ value: s.value, label: s.label }))}
              value={section}
              onChange={setSection}
              label={t.profile.title}
            />
          </div>
          <nav className="hidden md:block" aria-label={t.profile.title}>
            <ul className="space-y-1">
              {sections.map((s) => (
                <li key={s.value}>
                  <button
                    onClick={() => setSection(s.value)}
                    aria-current={section === s.value ? "true" : undefined}
                    className={`flex min-h-11 w-full items-center gap-3 rounded-input px-3 text-start text-[15px] font-medium transition-colors duration-[180ms] ${
                      section === s.value
                        ? "bg-primary-soft text-primary-hover dark:text-primary"
                        : "text-slate hover:bg-mist"
                    }`}
                  >
                    {s.icon}
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-6">
            {/* Account */}
            {section === "account" && (
              <div className="rounded-card border border-border bg-surface p-6">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-pill bg-primary-soft text-[22px] font-semibold text-primary-hover dark:text-primary">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <p className="text-[17px] font-semibold text-ink">{user.name}</p>
                    <p className="text-[13px] text-muted">{user.email}</p>
                  </div>
                </div>
                <div className="mt-6 border-t border-border-soft pt-5">
                  <Button variant="ghost" onClick={() => { logout(); router.push("/"); }} className="text-error hover:bg-error-soft">
                    {t.auth.logout}
                  </Button>
                </div>
              </div>
            )}

            {/* Preferences */}
            {section === "preferences" && (
              <>
                {/* Language — instant, flips dir at root via locale context */}
                <div className="rounded-card border border-border bg-surface p-6">
                  <h2 className="text-[15px] font-semibold text-ink">{t.profile.language}</h2>
                  <div className="mt-3">
                    <Segmented
                      options={(Object.keys(localeNames) as Locale[]).map((l) => ({ value: l, label: localeNames[l] }))}
                      value={locale}
                      onChange={setLocale}
                      label={t.profile.language}
                    />
                  </div>
                </div>

                {/* Theme */}
                <div className="rounded-card border border-border bg-surface p-6">
                  <h2 className="text-[15px] font-semibold text-ink">{t.profile.theme}</h2>
                  <div className="mt-3">
                    <Segmented
                      options={[
                        { value: "light", label: t.profile.themeLight },
                        { value: "dark", label: t.profile.themeDark },
                        { value: "system", label: t.profile.themeSystem },
                      ]}
                      value={theme}
                      onChange={(v) => setTheme(v as Theme)}
                      label={t.profile.theme}
                    />
                  </div>
                </div>

                {/* Notifications */}
                <div className="flex items-center justify-between rounded-card border border-border bg-surface p-6">
                  <div className="flex items-start gap-3">
                    <Bell className="mt-0.5 h-5 w-5 text-muted" aria-hidden="true" />
                    <div>
                      <h2 className="text-[15px] font-semibold text-ink">{t.profile.notifications}</h2>
                      <p className="mt-0.5 text-[13px] text-muted">{t.profile.notificationsDesc}</p>
                    </div>
                  </div>
                  <button
                    role="switch"
                    aria-checked={notifications}
                    aria-label={t.profile.notifications}
                    onClick={() => {
                      const next = !notifications;
                      setNotifications(next);
                      setNotificationsEnabled(next);
                      showToast(t.profile.savedToast);
                    }}
                    className={`relative h-7 w-12 shrink-0 rounded-pill transition-colors duration-[180ms] ${
                      notifications ? "bg-primary" : "bg-mist"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-5 w-5 rounded-pill bg-white transition-all duration-[180ms] ${
                        notifications ? "start-6" : "start-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Weekly goal */}
                <div className="rounded-card border border-border bg-surface p-6">
                  <h2 className="text-[15px] font-semibold text-ink">{t.profile.weeklyGoalSetting}</h2>
                  <p className="mt-0.5 text-[13px] text-muted">{t.profile.weeklyGoalDesc}</p>
                  <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label={t.profile.weeklyGoalSetting}>
                    {[2, 4, 7].map((n) => (
                      <button
                        key={n}
                        role="radio"
                        aria-checked={goal === n}
                        onClick={() => {
                          setGoal(n);
                          setWeeklyGoal(n);
                          showToast(t.profile.savedToast);
                        }}
                        className={`min-h-11 rounded-pill border-[1.5px] px-5 font-mono text-[13px] font-medium transition-all duration-[180ms] ${
                          goal === n
                            ? "border-primary bg-primary-soft/50 text-primary-hover dark:text-primary"
                            : "border-mist text-slate hover:border-faint"
                        }`}
                      >
                        {formatNumber(locale, n)} {t.onboarding.lessonsPerWeek}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Security */}
            {section === "security" && (
              <form onSubmit={handleChangePassword} className="rounded-card border border-border bg-surface p-6">
                <h2 className="text-[15px] font-semibold text-ink">{t.profile.changePassword}</h2>
                <div className="mt-4 max-w-sm space-y-4">
                  <Input
                    type="password"
                    label={t.profile.currentPassword}
                    value={currentPw}
                    onChange={(e) => setCurrentPw(e.target.value)}
                    autoComplete="current-password"
                  />
                  <Input
                    type="password"
                    label={t.profile.newPassword}
                    value={newPw}
                    onChange={(e) => setNewPw(e.target.value)}
                    error={pwError || undefined}
                    autoComplete="new-password"
                  />
                  <Button type="submit" disabled={!currentPw || !newPw}>
                    {t.common.save}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
