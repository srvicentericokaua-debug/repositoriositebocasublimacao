"use client";

import { useState } from "react";

export function ExpandableStory({ paragraphs }: { paragraphs: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const [first, ...rest] = paragraphs;

  return (
    <div className="flex flex-col gap-5">
      <p className="text-base leading-relaxed text-[var(--color-ink-soft)]">{first}</p>

      {expanded &&
        rest.map((p, i) => (
          <p key={i} className="text-base leading-relaxed text-[var(--color-ink-soft)]">
            {p}
          </p>
        ))}

      {rest.length > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[var(--color-coral-dark)] transition-colors hover:text-[var(--color-coral)]"
        >
          {expanded ? "Ver menos" : "Conhecer história completa →"}
        </button>
      )}
    </div>
  );
}
