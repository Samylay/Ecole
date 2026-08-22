"use client";

import { useEffect, useState } from "react";
import { Calendar, Video } from "lucide-react";
import { ButtonLink } from "@/components/Button";
import { useLocale } from "@/lib/locale-context";

const EARLY_JOIN_MS = 15 * 60 * 1000;
const LATE_JOIN_MS = 2 * 60 * 60 * 1000;

type LiveSessionLinkProps = {
  livestreamUrl?: string;
  scheduledAt?: string;
  className?: string;
};

export function LiveSessionLink({ livestreamUrl, scheduledAt, className = "" }: LiveSessionLinkProps) {
  const { locale, t } = useLocale();
  const [now, setNow] = useState<number | null>(scheduledAt ? null : Date.now());

  useEffect(() => {
    if (!scheduledAt) return;
    const updateNow = () => setNow(Date.now());
    updateNow();
    const interval = window.setInterval(updateNow, 60_000);
    return () => window.clearInterval(interval);
  }, [scheduledAt]);

  if (!livestreamUrl) return null;

  const scheduledTime = scheduledAt ? Date.parse(scheduledAt) : null;
  const validSchedule = scheduledTime !== null && Number.isFinite(scheduledTime);
  const canJoin = !scheduledAt || (
    now !== null && validSchedule && now >= scheduledTime - EARLY_JOIN_MS && now <= scheduledTime + LATE_JOIN_MS
  );

  if (!canJoin) return null;

  const formattedSchedule = validSchedule
    ? new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }).format(scheduledTime)
    : null;

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <ButtonLink href={livestreamUrl} target="_blank" rel="noopener noreferrer" className="min-h-11">
        <Video className="h-4 w-4" aria-hidden="true" />
        {t.live.joinLive}
      </ButtonLink>
      {formattedSchedule && (
        <span className="flex items-center gap-1.5 text-[13px] text-muted">
          <Calendar className="h-4 w-4" aria-hidden="true" />
          {t.live.scheduledFor.replace("{date}", formattedSchedule)}
        </span>
      )}
    </div>
  );
}
