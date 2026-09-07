import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/settings";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";

export const metadata: Metadata = {
  title: "Missão, Visão e Valores",
  description: "Os princípios que guiam a Boca Sublimação em cada produto personalizado.",
};

export default async function MissaoVisaoValoresPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageHero eyebrow="Nossos princípios" title="Missão, Visão e Valores" />

      <section className="mx-auto grid max-w-5xl gap-10 px-5 py-16 md:grid-cols-2 md:px-8 md:py-20">
        <Reveal variant="slide-right">
          <div className="h-full rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-8">
            <h2 className="font-[var(--font-display)] text-xl font-semibold text-[var(--color-ink)]">
              Nossa Missão
            </h2>
            <div className="mt-4 flex flex-col gap-4">
              {settings.missaoText.split("\n\n").map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-[var(--color-ink-soft)]">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal variant="slide-left">
          <div className="h-full rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-8">
            <h2 className="font-[var(--font-display)] text-xl font-semibold text-[var(--color-ink)]">
              Nossa Visão
            </h2>
            <div className="mt-4 flex flex-col gap-4">
              {settings.visaoText.split("\n\n").map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-[var(--color-ink-soft)]">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="bg-[var(--color-pink-light)] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal>
            <h2 className="text-center font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)] md:text-3xl">
              Nossos Valores
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {settings.valores.map((valor, i) => (
              <Reveal key={valor.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl bg-[var(--color-surface)] p-6">
                  <h3 className="font-[var(--font-display)] text-base font-semibold text-[var(--color-coral-dark)]">
                    {valor.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-soft)]">
                    {valor.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
