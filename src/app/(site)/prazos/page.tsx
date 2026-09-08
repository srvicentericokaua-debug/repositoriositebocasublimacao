import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/settings";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { buildWhatsAppLink, whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Prazo de Produção",
  description: "Saiba o prazo médio de produção dos produtos personalizados da Boca Sublimação.",
};

export const revalidate = 0;

export default async function PrazosPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageHero eyebrow="Organização" title="Prazo de produção" />

      <section className="mx-auto max-w-2xl px-5 py-16 text-center md:px-8 md:py-20">
        <Reveal>
          <p className="text-lg leading-relaxed text-[var(--color-ink)]">{settings.prazosText}</p>
        </Reveal>

        <Reveal variant="scale-up">
          <div className="mt-10 rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-8">
            <h2 className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-ink)]">
              Precisa com urgência?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-soft)]">
              Fale com a gente! Vamos verificar a melhor forma de atender sua necessidade.
            </p>
            <a
              href={buildWhatsAppLink(whatsappMessages.home)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta-3d mt-5 inline-flex items-center justify-center rounded-full bg-[var(--color-coral)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--color-coral-dark)]"
            >
              Falar no WhatsApp
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
