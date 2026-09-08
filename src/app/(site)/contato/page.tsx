import type { Metadata } from "next";
import { companyInfo } from "@/lib/content";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { buildWhatsAppLink, whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a Boca Sublimação pelo WhatsApp, e-mail ou Instagram e peça seu orçamento.",
};

export default function ContatoPage() {
  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Vamos transformar sua ideia em algo especial?"
        description="Conte para a gente o que você imaginou. Vamos conversar e encontrar a melhor opção para o seu pedido."
      />

      <section className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-20">
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6">
              <span className="text-xs font-semibold tracking-[0.12em] text-[var(--color-coral-dark)] uppercase">
                WhatsApp
              </span>
              <p className="mt-2 text-base font-medium text-[var(--color-ink)]">
                {companyInfo.whatsappDisplay}
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6">
              <span className="text-xs font-semibold tracking-[0.12em] text-[var(--color-coral-dark)] uppercase">
                E-mail
              </span>
              <p className="mt-2 text-base font-medium text-[var(--color-ink)]">{companyInfo.email}</p>
            </div>
            <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6">
              <span className="text-xs font-semibold tracking-[0.12em] text-[var(--color-coral-dark)] uppercase">
                Instagram
              </span>
              <p className="mt-2 text-base font-medium text-[var(--color-ink)]">{companyInfo.instagram}</p>
            </div>
            <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6">
              <span className="text-xs font-semibold tracking-[0.12em] text-[var(--color-coral-dark)] uppercase">
                Cidade
              </span>
              <p className="mt-2 text-base font-medium text-[var(--color-ink)]">{companyInfo.city}</p>
            </div>
          </div>
        </Reveal>

        <Reveal variant="fade-up">
          <p className="mt-6 text-center text-xs text-[var(--color-ink-soft)]">
            CNPJ: {companyInfo.cnpj}
          </p>
        </Reveal>

        <Reveal variant="scale-up">
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={buildWhatsAppLink(whatsappMessages.contato)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta-3d inline-flex items-center justify-center rounded-full bg-[var(--color-coral)] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[var(--color-coral-dark)]"
            >
              Falar pelo WhatsApp
            </a>
            <a
              href={companyInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[var(--color-ink)]/15 px-7 py-3.5 text-sm font-semibold text-[var(--color-ink)] hover:border-[var(--color-coral)] hover:text-[var(--color-coral-dark)]"
            >
              Seguir no Instagram
            </a>
            <a
              href={companyInfo.whatsappCatalogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[var(--color-ink)]/15 px-7 py-3.5 text-sm font-semibold text-[var(--color-ink)] hover:border-[var(--color-coral)] hover:text-[var(--color-coral-dark)]"
            >
              Ver catálogo no WhatsApp
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
