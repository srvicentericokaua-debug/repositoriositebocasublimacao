import type { Metadata } from "next";
import { personalizacaoInfo } from "@/lib/content";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { AmbientVideo } from "@/components/site/AmbientVideo";

export const metadata: Metadata = {
  title: "Personalização",
  description: "Envie sua arte ou deixe que a gente crie para você. Saiba como personalizamos cada produto.",
};

export default function PersonalizacaoPage() {
  return (
    <>
      <PageHero eyebrow="Sua ideia, nosso cuidado" title={personalizacaoInfo.title} />

      <section className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <Reveal>
            <ul className="flex flex-col gap-4">
              {personalizacaoInfo.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-base leading-relaxed text-[var(--color-ink-soft)]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-coral)]" />
                  {bullet}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal variant="slide-left">
            <AmbientVideo
              className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-30px_rgba(36,26,23,0.35)]"
              src="/videos/moodboard-marca.mp4"
              poster="/images/brand/moodboard-marca.png"
              alt="Processo criativo de desenvolvimento de arte e identidade visual"
            />
          </Reveal>
        </div>

        <Reveal variant="slide-right">
          <div className="mt-12 rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-8">
            <h2 className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-ink)]">
              Formatos de arquivo aceitos
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {personalizacaoInfo.formats.map((format) => (
                <span
                  key={format}
                  className="rounded-full bg-[var(--color-pink-light)] px-4 py-1.5 text-xs font-semibold tracking-wide text-[var(--color-coral-dark)]"
                >
                  {format}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal variant="fade-up">
          <p className="mt-10 rounded-2xl bg-[var(--color-pink-light)] p-6 text-center text-base font-medium text-[var(--color-ink)]">
            {personalizacaoInfo.noArtNote}
          </p>
        </Reveal>
      </section>
    </>
  );
}
