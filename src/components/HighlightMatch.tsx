function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function HighlightMatch({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  if (!q) return <>{text}</>;

  const parts = text.split(new RegExp(`(${escapeRegExp(q)})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === q.toLowerCase() ? (
          <mark key={i} className="rounded-[2px] bg-primary-soft text-primary-hover dark:text-primary">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}
