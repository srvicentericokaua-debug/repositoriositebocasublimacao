import { RevealText } from "./RevealText";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-[var(--color-line)] bg-[var(--color-pink-light)]">
      <div className="mx-auto max-w-4xl px-5 py-16 text-center md:px-8 md:py-20">
        {eyebrow && (
          <span className="mb-4 inline-block text-xs font-semibold tracking-[0.2em] text-[var(--color-coral-dark)] uppercase">
            {eyebrow}
          </span>
        )}
        <RevealText
          as="h1"
          text={title}
          className="font-[var(--font-display)] text-3xl leading-tight font-semibold text-[var(--color-ink)] md:text-5xl"
        />
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-ink-soft)] md:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
