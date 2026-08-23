"use client";

import { useEffect, useRef, useState } from "react";
import { Captions, Gauge, Maximize, Pause, Play, Settings2 } from "lucide-react";

export type YouTubePlayer = {
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => number;
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getPlaybackRate: () => number;
  setPlaybackRate: (rate: number) => void;
  getAvailablePlaybackRates: () => number[];
  getPlaybackQuality: () => string;
  setPlaybackQuality: (quality: string) => void;
  getAvailableQualityLevels: () => string[];
  loadModule: (module: string) => void;
  unloadModule: (module: string) => void;
  setOption: (module: string, option: string, value: unknown) => void;
};

type VideoLabels = {
  play: string;
  pause: string;
  speed: string;
  quality: string;
  automatic: string;
  captions: string;
  captionsOn: string;
  captionsOff: string;
  fullscreen: string;
  shortcuts: string;
};

const SPEEDS = [0.75, 1, 1.25, 1.5, 2];
const QUALITY_LABELS: Record<string, string> = {
  highres: "4K",
  hd2160: "2160p",
  hd1440: "1440p",
  hd1080: "1080p",
  hd720: "720p",
  large: "480p",
  medium: "360p",
  small: "240p",
  tiny: "144p",
};

export function VideoControls({
  player,
  iframe,
  labels,
}: {
  player: YouTubePlayer | null;
  iframe: HTMLIFrameElement | null;
  labels: VideoLabels;
}) {
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [quality, setQuality] = useState("auto");
  const [qualities, setQualities] = useState<string[]>([]);
  const [captionsOn, setCaptionsOn] = useState(false);
  const [menu, setMenu] = useState<"speed" | "quality" | null>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!player) return;
    const timer = window.setInterval(() => {
      setPlaying(player.getPlayerState() === 1);
      setSpeed(player.getPlaybackRate() || 1);
      setQuality(player.getPlaybackQuality() || "auto");
      setQualities(player.getAvailableQualityLevels?.() ?? []);
    }, 500);
    return () => window.clearInterval(timer);
  }, [player]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!player || event.altKey || event.ctrlKey || event.metaKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
      const key = event.key.toLowerCase();
      if (![" ", "j", "l", "f"].includes(key)) return;
      event.preventDefault();
      if (key === " ") player.getPlayerState() === 1 ? player.pauseVideo() : player.playVideo();
      if (key === "j") player.seekTo(Math.max(0, player.getCurrentTime() - 10), true);
      if (key === "l") player.seekTo(Math.min(player.getDuration(), player.getCurrentTime() + 10), true);
      if (key === "f") iframe?.requestFullscreen?.();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [iframe, player]);

  const controlClass =
    "relative flex min-h-11 items-center gap-2 rounded-pill px-3 text-[13px] font-medium text-white transition-[background-color,transform] duration-[var(--duration-fast)] ease-[var(--ease-out-custom)] hover:bg-white/15 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

  return (
    <div ref={controlsRef} className="flex flex-wrap items-center gap-1 bg-ink px-2 py-1.5" aria-label={labels.shortcuts}>
      <button
        type="button"
        className={controlClass}
        title={playing ? labels.pause : labels.play}
        aria-label={playing ? labels.pause : labels.play}
        onClick={() => (playing ? player?.pauseVideo() : player?.playVideo())}
      >
        {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
      </button>

      <div className="relative">
        <button
          type="button"
          className={controlClass}
          title={labels.speed}
          aria-label={`${labels.speed}: ${speed}×`}
          aria-expanded={menu === "speed"}
          onClick={() => setMenu(menu === "speed" ? null : "speed")}
        >
          <Gauge className="h-4 w-4" aria-hidden="true" />
          {speed}×
        </button>
        {menu === "speed" && (
          <div className="menu-enter absolute bottom-full start-0 z-20 mb-1 min-w-28 origin-bottom rounded-input border border-border bg-surface p-1 shadow-lift">
            {SPEEDS.map((rate) => (
              <button
                type="button"
                key={rate}
                className={`block min-h-11 w-full rounded-chip px-3 text-start text-[13px] transition-[background-color,transform] duration-[var(--duration-fast)] active:scale-[0.98] ${rate === speed ? "bg-primary-soft font-semibold text-primary" : "text-slate hover:bg-mist"}`}
                onClick={() => {
                  player?.setPlaybackRate(rate);
                  setSpeed(rate);
                  setMenu(null);
                }}
              >
                {rate}×
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative">
        <button
          type="button"
          className={controlClass}
          title={labels.quality}
          aria-label={labels.quality}
          aria-expanded={menu === "quality"}
          onClick={() => setMenu(menu === "quality" ? null : "quality")}
        >
          <Settings2 className="h-4 w-4" aria-hidden="true" />
          {quality === "auto" ? labels.automatic : QUALITY_LABELS[quality] ?? quality}
        </button>
        {menu === "quality" && (
          <div className="menu-enter absolute bottom-full start-0 z-20 mb-1 min-w-32 origin-bottom rounded-input border border-border bg-surface p-1 shadow-lift">
            <button
              type="button"
              className="block min-h-11 w-full rounded-chip px-3 text-start text-[13px] text-slate transition-[background-color,transform] duration-[var(--duration-fast)] hover:bg-mist active:scale-[0.98]"
              onClick={() => {
                player?.setPlaybackQuality("default");
                setQuality("auto");
                setMenu(null);
              }}
            >
              {labels.automatic}
            </button>
            {qualities.map((level) => (
              <button
                type="button"
                key={level}
                className="block min-h-11 w-full rounded-chip px-3 text-start text-[13px] text-slate transition-[background-color,transform] duration-[var(--duration-fast)] hover:bg-mist active:scale-[0.98]"
                onClick={() => {
                  player?.setPlaybackQuality(level);
                  setQuality(level);
                  setMenu(null);
                }}
              >
                {QUALITY_LABELS[level] ?? level}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        type="button"
        className={controlClass}
        title={captionsOn ? labels.captionsOff : labels.captionsOn}
        aria-label={captionsOn ? labels.captionsOff : labels.captionsOn}
        aria-pressed={captionsOn}
        onClick={() => {
          if (!player) return;
          if (captionsOn) player.unloadModule("captions");
          else {
            player.loadModule("captions");
            player.setOption("captions", "fontSize", 0);
          }
          setCaptionsOn(!captionsOn);
        }}
      >
        <Captions className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">{labels.captions}</span>
      </button>

      <button
        type="button"
        className={`${controlClass} ms-auto`}
        title={labels.fullscreen}
        aria-label={labels.fullscreen}
        onClick={() => iframe?.requestFullscreen?.()}
      >
        <Maximize className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
