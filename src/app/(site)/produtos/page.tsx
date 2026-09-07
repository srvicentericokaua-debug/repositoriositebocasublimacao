import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/site/PageHero";
import { ProductFilters } from "@/components/site/ProductFilters";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { buildWhatsAppLink, whatsappMessages } from "@/lib/whatsapp";
import { companyInfo } from "@/lib/content";
import type { Prisma } from "@prisma/client";

export const metadata: Metadata = {
  title: "Produtos Personalizados",
  description: "Canecas, squeezes, camisetas, bodies infantis e muito mais, todos personalizáveis.",
};

const PAGE_SIZE = 12;

function buildOrderBy(sort: string | undefined): Prisma.ProductOrderByWithRelationInput {
  switch (sort) {
    case "az":
      return { name: "asc" };
    case "za":
      return { name: "desc" };
    case "menor-preco":
      return { price: "asc" };
    case "maior-preco":
      return { price: "desc" };
    default:
      return { createdAt: "desc" };
  }
}

export default async function ProdutosPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; categoria?: string; sort?: string; page?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  const where: Prisma.ProductWhereInput = {
    active: true,
    ...(params.q ? { name: { contains: params.q } } : {}),
    ...(params.categoria ? { category: { slug: params.categoria } } : {}),
  };

  const [products, total, categories] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true, images: { orderBy: { order: "asc" }, take: 1 } },
      orderBy: buildOrderBy(params.sort),
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.product.count({ where }),
    prisma.category.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function pageHref(target: number) {
    const p = new URLSearchParams();
    if (params.q) p.set("q", params.q);
    if (params.categoria) p.set("categoria", params.categoria);
    if (params.sort) p.set("sort", params.sort);
    if (target > 1) p.set("page", String(target));
    const qs = p.toString();
    return qs ? `/produtos?${qs}` : "/produtos";
  }

  return (
    <>
      <PageHero
        eyebrow="Catálogo"
        title="Produtos personalizados"
        description="Canecas, squeezes, camisetas, bodies infantis e muitas outras possibilidades para presentear com significado."
      />

      <section className="mx-auto max-w-6xl px-5 pt-8 md:px-8">
        <div className="mb-8 flex flex-col items-center justify-between gap-3 rounded-2xl bg-[var(--color-pink-light)] p-5 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-[var(--color-ink)]">
            Prefere navegar pelo WhatsApp? Veja também nosso catálogo por lá.
          </p>
          <a
            href={companyInfo.whatsappCatalogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
          >
            Ver catálogo no WhatsApp
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-4 md:px-8">
        <ProductFilters categories={categories} />

        {products.length > 0 ? (
          <>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, i) => (
                <Reveal key={product.id} delay={Math.min(i * 0.04, 0.24)}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={pageHref(p)}
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                      p === page
                        ? "bg-[var(--color-coral)] text-white"
                        : "border border-[var(--color-line)] text-[var(--color-ink)] hover:border-[var(--color-coral)]"
                    }`}
                  >
                    {p}
                  </Link>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="mt-10 rounded-3xl border border-dashed border-[var(--color-line)] bg-[var(--color-cream)] p-12 text-center">
            <p className="text-base text-[var(--color-ink-soft)]">
              {params.q || params.categoria
                ? "Não encontramos produtos com esse filtro. Fale com a gente, podemos ter o que você procura."
                : "Nosso catálogo está sendo montado. Fale com a gente para conhecer o que já temos disponível."}
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
        )}
      </section>
    </>
  );
}
