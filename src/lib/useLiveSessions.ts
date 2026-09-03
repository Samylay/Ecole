"use client";

import { useEffect, useState } from "react";

export type LiveSession = {
  scope: "chapter" | "lesson";
  chapterId: string;
  lessonId: string | null;
  livestreamUrl: string;
  scheduledAt: string | null;
};

/**
 * P8-H: the Meet link for a course lives behind an enrolment-checked endpoint,
 * so it is fetched after mount instead of shipping inside the catalogue data.
 * A non-enrolled or signed-out visitor simply gets nothing back.
 */
export function useLiveSessions(courseId: string, enabled: boolean): LiveSession[] {
  const [sessions, setSessions] = useState<LiveSession[]>([]);

  useEffect(() => {
    if (!enabled) {
      setSessions([]);
      return;
    }
    let active = true;
    void (async () => {
      try {
        const response = await fetch(`/api/live/${encodeURIComponent(courseId)}`);
        if (!response.ok) return;
        const data = await response.json();
        if (active) setSessions(data.sessions ?? []);
      } catch {
        // Offline or forbidden: the live block stays hidden, nothing else breaks.
      }
    })();
    return () => {
      active = false;
    };
  }, [courseId, enabled]);

  return sessions;
}
