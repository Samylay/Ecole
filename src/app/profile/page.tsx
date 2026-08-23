"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Settings2, Lock, Bell, MonitorSmartphone, Gauge } from "lucide-react";
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
  getDataSaverEnabled,
  setDataSaverEnabled,
} from "@/lib/progress";

type Section = "account" | "preferences" | "security";

type DeviceSession = {
  id: string;
  ua: string | null;
  ip: string | null;
  created_at: number;
  last_seen_at: number | null;
  current: boolean;
};

export default function ProfilePage() {
  const { t, locale, setLocale, dir } = useLocale();
  const { theme, setTheme } = useTheme();
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();

  const [section, setSection] = useState<Section>("account");
  const [goal, setGoal] = useState(4);
  const [notifications, setNotifications] = useState(true);
  const [dataSaver, setDataSaver] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [sessions, setSessions] = useState<DeviceSession[]>([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [sessionsError, setSessionsError] = useState(false);
  const [revokingSession, setRevokingSession] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) router.replace("/signin");
  }, [user, isLoading, router]);

  useEffect(() => {
    migrateLegacyProgress();
    setGoal(getWeeklyGoal());
    setNotifications(getNotificationsEnabled());
    setDataSaver(getDataSaverEnabled());
  }, [user]);

  const loadSessions = async () => {
    setSessionsLoading(true);
    setSessionsError(false);
    try {
      const response = await fetch("/api/auth/sessions");
      const data = (await response.json()) as { success?: boolean; sessions?: DeviceSession[] };
      if (!response.ok || !data.success || !data.sessions) throw new Error("sessions_request_failed");
      setSessions(data.sessions);
    } catch {
      setSessionsError(true);
    } finally {
      setSessionsLoading(false);
    }
  };

  useEffect(() => {
    if (user && section === "security") void loadSessions();
  }, [user, section]);

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

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPw.length < 6) {
      setPwError(t.auth.weakPassword);
      return;
    }
    try {
      const res = await fetch("/api/auth/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
      });
      const data = await res.json();
      if (!data.success) {
        setPwError(data.error === "invalid_credentials" ? t.auth.invalidCredentials : t.auth.weakPassword);
        return;
      }
      setPwError("");
      setCurrentPw("");
      setNewPw("");
      showToast(
        data.revokedSessions > 0 ? t.profile.passwordChangedOthersToast : t.profile.passwordChangedToast
      );
    } catch {
      setPwError(t.states.errorBody);
    }
  };

  const handleRevokeSession = async (id: string) => {
    setRevokingSession(id);
    try {
      const response = await fetch(`/api/auth/sessions/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("session_revoke_failed");
      showToast(t.devices.disconnectedToast);
      await loadSessions();
    } catch {
      showToast(t.states.errorBody);
    } finally {
      setRevokingSession(null);
    }
  };

  const formatSessionDate = (timestamp: number) =>
    new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }).format(timestamp);

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <a href="#main" className="skip-to-content">
        {t.common.skipToContent}
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
                    className={`flex min-h-11 w-full items-center gap-3 rounded-input px-3 text-start text-[15px] font-medium transition-colors duration-[var(--duration-base)] ${
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
                      variant="radiogroup"
                      dir={dir}
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
                      variant="radiogroup"
                      dir={dir}
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
                    className={`relative h-7 w-12 shrink-0 rounded-pill transition-colors duration-[var(--duration-base)] ${
                      notifications ? "bg-primary" : "bg-mist"
                    }`}
                  >
                    <span
                      className="absolute start-1 top-1 h-5 w-5 rounded-pill bg-white transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-custom)]"
                      style={{
                        transform: notifications
                          ? `translateX(${dir === "rtl" ? "-" : ""}1.25rem)`
                          : "translateX(0)",
                      }}
                    />
                  </button>
                </div>

                {/* Data saver */}
                <div className="flex items-center justify-between gap-4 rounded-card border border-border bg-surface p-6">
                  <div className="flex items-start gap-3">
                    <Gauge className="mt-0.5 h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
                    <div>
                      <h2 id="data-saver-title" className="text-[15px] font-semibold text-ink">{t.dataSaver.title}</h2>
                      <p id="data-saver-description" className="mt-0.5 text-[13px] text-muted">
                        {t.dataSaver.description}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={dataSaver}
                    aria-labelledby="data-saver-title"
                    aria-describedby="data-saver-description"
                    onClick={() => {
                      const next = !dataSaver;
                      setDataSaver(next);
                      setDataSaverEnabled(next);
                      showToast(t.profile.savedToast);
                    }}
                    className={`relative h-7 w-12 shrink-0 rounded-pill transition-[background-color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-custom)] active:scale-[0.98] ${
                      dataSaver ? "bg-primary" : "bg-mist"
                    }`}
                  >
                    <span
                      className="absolute start-1 top-1 h-5 w-5 rounded-pill bg-white transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-custom)]"
                      style={{
                        transform: dataSaver
                          ? `translateX(${dir === "rtl" ? "-" : ""}1.25rem)`
                          : "translateX(0)",
                      }}
                    />
                  </button>
                </div>

                {/* Mes notes */}
                <div className="rounded-card border border-border bg-surface p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-[15px] font-semibold text-ink">{t.notes.title}</h2>
                      <p className="mt-0.5 text-[13px] text-muted">{t.notes.subtitle}</p>
                    </div>
                    <Link href="/mes-notes" className="flex min-h-11 shrink-0 items-center rounded-pill bg-primary-soft px-4 text-[13px] font-medium text-primary-hover transition-[background-color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-custom)] hover:bg-primary-soft/70 active:scale-[0.98]">
                      {t.notes.viewAll}
                    </Link>
                  </div>
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
                        className={`min-h-11 rounded-pill border-[1.5px] px-5 font-mono text-[13px] font-medium transition-[border-color,background-color,color,transform] duration-[var(--duration-base)] ease-[var(--ease-out-custom)] active:scale-[0.98] ${
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
              <>
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

                <section className="rounded-card border border-border bg-surface p-6" aria-labelledby="devices-title">
                  <div className="flex items-start gap-3">
                    <MonitorSmartphone className="mt-0.5 h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
                    <div>
                      <h2 id="devices-title" className="text-[15px] font-semibold text-ink">{t.devices.title}</h2>
                      <p className="mt-0.5 text-[13px] text-muted">{t.devices.description}</p>
                    </div>
                  </div>

                  {sessionsLoading && sessions.length === 0 ? (
                    <div className="mt-5 space-y-3" aria-label={t.common.loading}>
                      {[0, 1].map((item) => (
                        <div key={item} className="h-20 animate-pulse rounded-input bg-mist" />
                      ))}
                    </div>
                  ) : sessionsError ? (
                    <div className="mt-5 rounded-input bg-error-soft p-4">
                      <p className="text-[13px] text-error">{t.devices.loadError}</p>
                      <Button className="mt-3" variant="ghost" onClick={() => void loadSessions()}>
                        {t.common.retry}
                      </Button>
                    </div>
                  ) : sessions.length === 0 ? (
                    <div className="mt-5 rounded-input bg-bg p-4 text-center">
                      <p className="text-[15px] font-semibold text-ink">{t.devices.emptyTitle}</p>
                      <p className="mt-1 text-[13px] text-muted">{t.devices.emptyBody}</p>
                      <Button className="mt-3" variant="secondary" onClick={() => void loadSessions()}>
                        {t.devices.refresh}
                      </Button>
                    </div>
                  ) : (
                    <ul className="mt-5 divide-y divide-border-soft">
                      {sessions.map((session) => (
                        <li key={session.id} className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="truncate text-[15px] font-medium text-ink" title={session.ua ?? undefined}>
                                {session.ua || t.devices.unknownDevice}
                              </p>
                              {session.current && (
                                <span className="rounded-pill bg-primary-soft px-2 py-0.5 font-mono text-[11px] text-primary-hover dark:text-primary">
                                  {t.devices.current}
                                </span>
                              )}
                            </div>
                            <p className="mt-1 font-mono text-[11px] text-muted">{session.ip || t.devices.unknownIp}</p>
                            <p className="mt-1 text-[13px] text-muted">
                              {session.last_seen_at
                                ? `${t.devices.lastSeen}: ${formatSessionDate(session.last_seen_at)}`
                                : `${t.devices.connectedAt}: ${formatSessionDate(session.created_at)}`}
                            </p>
                          </div>
                          {!session.current && (
                            <Button
                              variant="ghost"
                              loading={revokingSession === session.id}
                              disabled={revokingSession !== null}
                              onClick={() => void handleRevokeSession(session.id)}
                              className="self-start text-error hover:bg-error-soft sm:self-auto"
                            >
                              {t.devices.disconnect}
                            </Button>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
