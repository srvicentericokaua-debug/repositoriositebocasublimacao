import type { Metadata } from "next";
import { getSiteSettings, splitParagraphs } from "@/lib/settings";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { LogoBadge } from "@/components/site/LogoBadge";
import { ExpandableStory } from "@/components/site/ExpandableStory";
import { companyInfo } from "@/lib/content";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Quem Somos",
  description:
    "Conheça a história da Boca Sublimação, empresa familiar de Sorocaba/SP fundada por Célia Flores.",
};

export const revalidate = 0;

export default async function QuemSomosPage() {
  const settings = await getSiteSettings();
  const paragraphs = splitParagraphs(settings.quemSomosText);
  const logoParagraphs = splitParagraphs(settings.logoStoryText);

  return (
    <>
      <PageHero
        eyebrow="Nossa história"
        title="Uma história que começou com um sonho e cresceu com o coração."
      />

      <section className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-20">
        <Reveal>
          <ExpandableStory paragraphs={paragraphs} />
        </Reveal>
      </section>

      <section className="bg-[var(--color-pink-light)] py-16 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <Reveal variant="scale-up">
            <div className="flex justify-center">
              <LogoBadge size={200} />
            </div>
          </Reveal>
          <Reveal variant="slide-left">
            <h2 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)] md:text-3xl">
              Uma identidade que também faz parte da nossa história.
            </h2>
            <div className="mt-5 flex flex-col gap-4">
              {logoParagraphs.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-[var(--color-ink-soft)] md:text-base">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 text-center md:px-8">
        <Reveal variant="scale-up">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-30px_rgba(36,26,23,0.35)]">
            <Image
              src="/images/brand/celia-com-logo.jpg"
              alt={`${companyInfo.founder}, fundadora da ${companyInfo.name}, abraçando a logo da marca`}
              fill
              sizes="(min-width: 768px) 320px, 80vw"
              className="object-cover"
            />
          </div>
          <p className="mt-5 text-sm font-medium text-[var(--color-ink-soft)]">
            {companyInfo.founder} · Fundadora da {companyInfo.name}
          </p>
        </Reveal>
      </section>
    </>
  );
}
