import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { getSiteSettings, splitParagraphs } from "@/lib/settings";
import { buildWhatsAppLink, whatsappMessages } from "@/lib/whatsapp";
import { destaques, comoFunciona } from "@/lib/content";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ProductCard } from "@/components/site/ProductCard";
import { destaqueIcons } from "@/components/site/icons";
import { AmbientVideo } from "@/components/site/AmbientVideo";
import { GoogleReviewsSection } from "@/components/site/GoogleReviewsSection";

export const revalidate = 0;

export default async function HomePage() {
  const [featuredProducts, categories, portfolioPreview, settings] = await Promise.all([
    prisma.product.findMany({
      where: { active: true, featured: true },
      include: { category: true, images: { orderBy: { order: "asc" }, take: 1 } },
      orderBy: { order: "asc" },
      take: 8,
    }),
    prisma.category.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
    prisma.portfolioItem.findMany({ where: { active: true }, orderBy: { order: "asc" }, take: 6 }),
    getSiteSettings(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: settings.companyName,
    description: settings.slogan,
    email: settings.email,
    telephone: `+${settings.whatsapp}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: settings.city,
      addressCountry: "BR",
    },
    sameAs: [`https://instagram.com/${settings.instagram.replace("@", "")}`],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* HERO */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden border-b border-[var(--color-line)] bg-[var(--color-cream)]">
        <AmbientVideo
          className="absolute inset-0 h-full w-full"
          src="/videos/hero-produtos.mp4"
          poster="/images/brand/hero-produtos.png"
          alt="Canecas, camisetas, squeezes e outros produtos personalizados da Boca Sublimação"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-cream)] via-[var(--color-cream)]/75 to-[var(--color-cream)]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-cream)]/40 via-transparent to-transparent" />

        <div className="relative mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <Reveal variant="fade-up" className="max-w-xl">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-[var(--color-pink-light)] px-4 py-1.5 text-xs font-semibold tracking-[0.12em] text-[var(--color-coral-dark)] uppercase">
              Sorocaba · SP
            </span>
            <h1 className="font-[var(--font-display)] text-4xl leading-[1.08] font-semibold text-[var(--color-ink)] sm:text-5xl lg:text-[3.4rem]">
              Sejam bem-vindos à Boca Sublimação!
            </h1>
            <p className="mt-3 font-[var(--font-display)] text-xl font-semibold text-[var(--color-coral-dark)] italic sm:text-2xl">
              Do coração para a caneca!
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-ink-soft)]">
              Transformamos ideias, sentimentos, marcas e momentos especiais em produtos
              personalizados feitos com carinho e significado.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={buildWhatsAppLink(whatsappMessages.home)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-coral)] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--color-coral-dark)]"
              >
                Quero fazer meu pedido
              </a>
              <Link
                href="/produtos"
                className="inline-flex items-center justify-center rounded-full border border-[var(--color-ink)]/15 px-7 py-3.5 text-sm font-semibold text-[var(--color-ink)] transition-colors hover:border-[var(--color-coral)] hover:text-[var(--color-coral-dark)]"
              >
                Ver produtos
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DESTAQUES */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destaques.map((item, i) => {
            const Icon = destaqueIcons[item.icon as keyof typeof destaqueIcons];
            return (
              <Reveal key={item.title} variant={i % 2 === 0 ? "fade-up" : "slide-right"} delay={i * 0.08}>
                <div className="flex h-full flex-col gap-4 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-pink-light)] text-[var(--color-coral-dark)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-[var(--font-display)] text-base font-semibold text-[var(--color-ink)]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* PRODUTOS EM DESTAQUE */}
      <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Catálogo"
              title="Produtos em destaque"
              description="Uma amostra do que fazemos com mais carinho — o catálogo completo cresce toda semana."
            />
          </Reveal>

          {featuredProducts.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product, i) => (
                <Reveal key={product.id} delay={i * 0.06}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="mt-10 rounded-3xl border border-dashed border-[var(--color-line)] bg-[var(--color-cream)] p-12 text-center">
                <p className="text-base text-[var(--color-ink-soft)]">
                  Em breve novos produtos por aqui! Fale com a gente no WhatsApp e conte o que você
                  está procurando.
                </p>
                <a
                  href={buildWhatsAppLink(whatsappMessages.home)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-[var(--color-coral)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--color-coral-dark)]"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </Reveal>
          )}

          <div className="mt-10 text-center">
            <Link
              href="/produtos"
              className="inline-flex items-center justify-center rounded-full border border-[var(--color-ink)]/15 px-6 py-3 text-sm font-semibold text-[var(--color-ink)] hover:border-[var(--color-coral)] hover:text-[var(--color-coral-dark)]"
            >
              Ver catálogo completo
            </Link>
          </div>
        </div>
      </section>

      {/* QUEM SOMOS PREVIEW */}
      <section className="bg-[var(--color-pink-light)] py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal variant="slide-right">
            <AmbientVideo
              className="relative mx-auto aspect-[3/4] max-w-sm overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-30px_rgba(36,26,23,0.35)]"
              src="/videos/celia-cropped.mp4"
              poster="/images/brand/celia-fundadora.jpg"
              alt="Célia Flores, fundadora da Boca Sublimação"
            />
          </Reveal>
          <Reveal variant="slide-left">
            <span className="mb-3 inline-block text-xs font-semibold tracking-[0.2em] text-[var(--color-coral-dark)] uppercase">
              Quem somos
            </span>
            <h2 className="font-[var(--font-display)] text-3xl leading-tight font-semibold text-[var(--color-ink)] md:text-4xl">
              Uma história que começou com um sonho e cresceu com o coração.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--color-ink-soft)]">
              {splitParagraphs(settings.quemSomosText)[0]}
            </p>
            <Link
              href="/quem-somos"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-coral-dark)] hover:text-[var(--color-coral)]"
            >
              Conhecer nossa história completa →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CATEGORIAS */}
      {categories.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <Reveal>
            <SectionHeading eyebrow="Explore" title="O que personalizamos" align="left" />
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((category, i) => (
              <Reveal key={category.id} delay={i * 0.04}>
                <Link
                  href={`/produtos?categoria=${category.slug}`}
                  className="flex h-24 items-center justify-center rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] px-4 text-center text-sm font-semibold text-[var(--color-ink)] transition-colors hover:border-[var(--color-coral)] hover:text-[var(--color-coral-dark)]"
                >
                  {category.name}
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* PORTFOLIO PREVIEW */}
      <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Portfólio"
              title="Trabalhos feitos com carinho"
              description="Uma vitrine dos pedidos que já saíram daqui."
            />
          </Reveal>

          {portfolioPreview.length > 0 ? (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {portfolioPreview.map((item, i) => (
                <Reveal key={item.id} delay={i * 0.06}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--color-pink-light)]">
                    <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="mt-10 rounded-3xl border border-dashed border-[var(--color-line)] p-12 text-center text-[var(--color-ink-soft)]">
                Nosso portfólio está sendo organizado — em breve, fotos reais dos nossos trabalhos.
              </div>
            </Reveal>
          )}

          <div className="mt-10 text-center">
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center rounded-full border border-[var(--color-ink)]/15 px-6 py-3 text-sm font-semibold text-[var(--color-ink)] hover:border-[var(--color-coral)] hover:text-[var(--color-coral-dark)]"
            >
              Ver portfólio completo
            </Link>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="bg-[var(--color-cream)] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal>
            <SectionHeading eyebrow="Passo a passo" title="Como funciona" />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {comoFunciona.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.05} variant={i % 2 === 0 ? "fade-up" : "slide-left"}>
                <div className="flex h-full flex-col gap-3 rounded-2xl bg-[var(--color-surface)] p-6">
                  <span className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-pink-mid)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base font-semibold text-[var(--color-ink)]">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <GoogleReviewsSection />

      {/* CTA FINAL */}
      <section className="bg-[var(--color-coral)] py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
          <Reveal variant="scale-up">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold text-white md:text-4xl">
              Vamos transformar sua ideia em algo especial?
            </h2>
            <p className="mt-4 text-base text-white/90 md:text-lg">
              Conte para a gente o que você imaginou e receba um orçamento sem compromisso.
            </p>
            <a
              href={buildWhatsAppLink(whatsappMessages.home)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[var(--color-surface)] px-8 py-3.5 text-sm font-semibold text-[var(--color-coral-dark)] shadow-sm transition-transform hover:scale-105"
            >
              Falar pelo WhatsApp
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
