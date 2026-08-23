"use client";

import { useEffect, useMemo, useState } from "react";
import { Highlighter, ScrollText } from "lucide-react";

export type TranscriptLine = { start: number; duration: number; text: string };

type TranscriptLabels = {
  title: string;
  loading: string;
  unavailableTitle: string;
  unavailableBody: string;
  highlight: string;
};

function decodeHtml(value: string): string {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = value;
  return textarea.value;
}

function parseTranscript(payload: string): TranscriptLine[] {
  try {
    const json = JSON.parse(payload) as {
      events?: { tStartMs?: number; dDurationMs?: number; segs?: { utf8?: string }[] }[];
    };
    return (json.events ?? [])
      .filter((event) => event.segs?.length && typeof event.tStartMs === "number")
      .map((event) => ({
        start: (event.tStartMs ?? 0) / 1000,
        duration: (event.dDurationMs ?? 0) / 1000,
        text: (event.segs ?? []).map((segment) => segment.utf8 ?? "").join("").replace(/\n/g, " ").trim(),
      }))
      .filter((line) => line.text);
  } catch {
    const xml = new DOMParser().parseFromString(payload, "text/xml");
    return Array.from(xml.querySelectorAll("text"))
      .map((node) => ({
        start: Number(node.getAttribute("start") ?? 0),
        duration: Number(node.getAttribute("dur") ?? 0),
        text: decodeHtml(node.textContent ?? "").replace(/\n/g, " ").trim(),
      }))
      .filter((line) => line.text);
  }
}

function videoIdFromUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) return parsed.pathname.slice(1) || null;
    const embed = parsed.pathname.match(/\/embed\/([^/?]+)/)?.[1];
    return embed ?? parsed.searchParams.get("v");
  } catch {
    return null;
  }
}

function timestamp(seconds: number): string {
  const whole = Math.max(0, Math.floor(seconds));
  return `${String(Math.floor(whole / 60)).padStart(2, "0")}:${String(whole % 60).padStart(2, "0")}`;
}

export function TranscriptPanel({
  videoUrl,
  locale,
  currentTime,
  onSeek,
  onHighlight,
  labels,
  compact = false,
}: {
  videoUrl: string;
  locale: "fr" | "en" | "ar";
  currentTime: number;
  onSeek: (seconds: number) => void;
  onHighlight: (line: TranscriptLine) => void;
  labels: TranscriptLabels;
  compact?: boolean;
}) {
  const [lines, setLines] = useState<TranscriptLine[]>([]);
  const [loading, setLoading] = useState(true);
  const language = locale === "ar" ? "ar" : locale;

  useEffect(() => {
    const controller = new AbortController();
    const id = videoIdFromUrl(videoUrl);
    if (!id) {
      setLoading(false);
      return () => controller.abort();
    }
    const params = new URLSearchParams({ v: id, lang: language, fmt: "json3" });
    fetch(`https://www.youtube.com/api/timedtext?${params}`, { signal: controller.signal })
      .then((response) => (response.ok ? response.text() : ""))
      .then((payload) => setLines(payload ? parseTranscript(payload) : []))
      .catch(() => setLines([]))
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [language, videoUrl]);

  const activeIndex = useMemo(() => {
    const index = lines.findLastIndex((line) => line.start <= currentTime);
    return index >= 0 && currentTime <= lines[index].start + Math.max(lines[index].duration, 8) ? index : -1;
  }, [currentTime, lines]);

  return (
    <section className={`flex min-h-0 flex-col bg-surface ${compact ? "rounded-card border border-border" : "h-full"}`} aria-labelledby="transcript-title">
      <div className="border-b border-border px-4 py-3">
        <h2 id="transcript-title" className="flex items-center gap-2 text-[15px] font-semibold text-ink">
          <ScrollText className="h-4 w-4 text-primary" aria-hidden="true" />
          {labels.title}
        </h2>
      </div>
      {loading ? (
        <p className="p-4 text-[13px] text-muted" role="status">{labels.loading}</p>
      ) : lines.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-5 py-8 text-center">
          <ScrollText className="h-6 w-6 text-faint" aria-hidden="true" />
          <h3 className="mt-3 text-[15px] font-semibold text-ink">{labels.unavailableTitle}</h3>
          <p className="mt-1 max-w-xs text-[13px] leading-relaxed text-muted">{labels.unavailableBody}</p>
        </div>
      ) : (
        <ol className="flex-1 overflow-y-auto p-2">
          {lines.map((line, index) => (
            <li key={`${line.start}-${index}`} className="group relative">
              <button
                type="button"
                onClick={() => onSeek(line.start)}
                className={`flex min-h-11 w-full gap-3 rounded-input px-3 py-2 text-start transition-[background-color,transform] duration-[var(--duration-fast)] ease-[var(--ease-out-custom)] active:scale-[0.98] ${index === activeIndex ? "bg-primary-soft text-primary-hover dark:text-primary" : "text-slate hover:bg-mist"}`}
              >
                <span className="shrink-0 pt-0.5 font-mono text-[11px] text-faint">{timestamp(line.start)}</span>
                <span className="text-[13px] leading-relaxed">{line.text}</span>
              </button>
              <button
                type="button"
                onClick={() => onHighlight(line)}
                className="absolute end-2 top-1.5 flex h-9 w-9 items-center justify-center rounded-pill bg-surface text-primary opacity-0 shadow-card transition-[opacity,transform] duration-[var(--duration-fast)] ease-[var(--ease-out-custom)] hover:bg-primary-soft focus-visible:opacity-100 group-hover:opacity-100 active:scale-[0.98]"
                aria-label={`${labels.highlight}: ${line.text}`}
                title={labels.highlight}
              >
                <Highlighter className="h-4 w-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
