"use client";

export type MarqueeCard = { title: string; text: string; icon?: string };

export function MarqueeRow({
  items,
  direction = "left",
  speed = 40,
}: {
  items: MarqueeCard[];
  direction?: "left" | "right";
  speed?: number;
}) {
  const track = [...items, ...items];

  return (
    <div className="group relative overflow-hidden">
      <div
        className="flex w-max gap-4"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        {track.map((item, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-5 py-3 whitespace-nowrap shadow-[0_10px_30px_-20px_rgba(36,26,23,0.3)]"
          >
            {item.icon && <span className="text-base">{item.icon}</span>}
            <span className="font-[var(--font-display)] text-sm font-semibold text-[var(--color-ink)]">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
