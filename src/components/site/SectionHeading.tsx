import { RevealText } from "./RevealText";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <span className="mb-3 inline-block text-xs font-semibold tracking-[0.2em] text-[var(--color-coral-dark)] uppercase">
          {eyebrow}
        </span>
      )}
      <RevealText
        as="h2"
        text={title}
        className="font-[var(--font-display)] text-3xl leading-tight font-semibold text-[var(--color-ink)] md:text-4xl"
      />
      {description && (
        <p className="mt-4 text-base leading-relaxed text-[var(--color-ink-soft)] md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
