import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/settings";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { buildWhatsAppLink, whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Entrega e Retirada",
  description: "Informações sobre retirada em Sorocaba/SP e envio para outras cidades.",
};

export const revalidate = 0;

export default async function EntregaPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageHero eyebrow="Logística" title="Entrega e retirada" />

      <section className="mx-auto max-w-2xl px-5 py-16 md:px-8 md:py-20">
        <div className="flex flex-col gap-4">
          {settings.entrega.map((info, i) => (
            <Reveal key={info} delay={i * 0.06}>
              <div className="flex items-start gap-3 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-5">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--color-coral)]" />
                <p className="text-base leading-relaxed text-[var(--color-ink)]">{info}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal variant="scale-up">
          <div className="mt-10 text-center">
            <a
              href={buildWhatsAppLink(whatsappMessages.entrega)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta-3d inline-flex items-center justify-center rounded-full bg-[var(--color-coral)] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[var(--color-coral-dark)]"
            >
              Consultar entrega
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
