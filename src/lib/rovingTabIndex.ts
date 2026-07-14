import { KeyboardEvent, RefObject } from "react";

/**
 * Arrow/Home/End keyboard navigation for a roving-tabindex composite widget
 * (tablist or radiogroup), works for both horizontal and vertical layouts.
 * Moves DOM focus to the target item and calls `activate` with its index —
 * callers decide what activation means (select a tab, check a radio). Inline
 * (Left/Right) arrows follow reading direction under RTL; Up/Down are direction-neutral.
 */
export function rovingTabIndexHandler(
  containerRef: RefObject<HTMLElement | null>,
  itemSelector: string,
  activate: (index: number) => void,
  dir: "ltr" | "rtl" = "ltr",
) {
  return function onKeyDown(e: KeyboardEvent) {
    const container = containerRef.current;
    if (!container) return;
    const items = Array.from(container.querySelectorAll<HTMLElement>(itemSelector));
    if (items.length === 0) return;
    const current = items.indexOf(document.activeElement as HTMLElement);
    if (current === -1) return;

    const prevKey = dir === "rtl" ? "ArrowRight" : "ArrowLeft";
    const nextKey = dir === "rtl" ? "ArrowLeft" : "ArrowRight";

    let next: number | null = null;
    if (e.key === prevKey || e.key === "ArrowUp") next = (current - 1 + items.length) % items.length;
    else if (e.key === nextKey || e.key === "ArrowDown") next = (current + 1) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;

    if (next === null) return;
    e.preventDefault();
    items[next].focus();
    activate(next);
  };
}
