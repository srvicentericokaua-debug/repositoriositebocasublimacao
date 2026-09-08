import type { Metadata } from "next";
import { comoFunciona } from "@/lib/content";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { buildWhatsAppLink, whatsappMessages } from "@/lib/whatsapp";
import { AmbientVideo } from "@/components/site/AmbientVideo";

export const metadata: Metadata = {
  title: "Como Funciona",
  description: "Veja o passo a passo para pedir seu produto personalizado na Boca Sublimação.",
};

export default function ComoFuncionaPage() {
  return (
    <>
      <PageHero
        eyebrow="Passo a passo"
        title="Como funciona"
        description="Do primeiro contato até a entrega, cada etapa é pensada para o seu pedido sair exatamente como você imaginou."
      />

      <section className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-20">
        <Reveal variant="scale-up">
          <AmbientVideo
            className="relative mx-auto mb-14 aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-30px_rgba(36,26,23,0.35)]"
            src="/videos/atelie-cropped.mp4"
            poster="/images/brand/atelie-canecas.png"
            alt="Processo de produção com prensa térmica e impressão para sublimação"
          />
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {comoFunciona.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.06} variant={i % 2 === 0 ? "fade-up" : "slide-left"}>
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-7">
                <span className="font-[var(--font-display)] text-3xl font-semibold text-[var(--color-pink-mid)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-semibold text-[var(--color-ink)]">{step.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 rounded-3xl bg-[var(--color-pink-light)] p-8 text-center">
            <p className="text-base text-[var(--color-ink)]">
              Pronto para começar? Fale com a gente agora mesmo.
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
