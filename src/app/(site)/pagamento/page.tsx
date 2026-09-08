import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/settings";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { AmbientVideo } from "@/components/site/AmbientVideo";

export const metadata: Metadata = {
  title: "Formas de Pagamento",
  description: "Confira as formas de pagamento aceitas pela Boca Sublimação.",
};

export const revalidate = 0;

export default async function PagamentoPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageHero eyebrow="Praticidade" title="Formas de pagamento" />

      <section className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-20">
        <Reveal variant="scale-up">
          <AmbientVideo
            className="relative mx-auto mb-12 aspect-[4/3] max-w-md overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-30px_rgba(36,26,23,0.35)]"
            src="/videos/pagamento.mp4"
            poster="/images/brand/pagamento.png"
            alt="Pagamento facilitado via aproximação e cartão"
          />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2">
          {settings.formasPagamento.map((forma, i) => (
            <Reveal key={forma} delay={i * 0.05}>
              <div className="flex items-center gap-4 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-pink-light)] text-lg font-semibold text-[var(--color-coral-dark)]">
                  {forma.charAt(0)}
                </span>
                <span className="text-base font-medium text-[var(--color-ink)]">{forma}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
