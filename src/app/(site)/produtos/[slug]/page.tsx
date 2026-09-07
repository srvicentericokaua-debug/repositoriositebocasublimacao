import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ProductGallery } from "@/components/site/ProductGallery";
import { Reveal } from "@/components/site/Reveal";
import { buildWhatsAppLink, whatsappMessages } from "@/lib/whatsapp";

async function getProduct(slug: string) {
  return prisma.product.findFirst({
    where: { slug, active: true },
    include: { category: true, images: { orderBy: { order: "asc" } } },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Produto não encontrado" };
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <section className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-16">
      <div className="grid gap-10 lg:grid-cols-2">
        <Reveal variant="slide-right">
          <ProductGallery images={product.images} />
        </Reveal>

        <Reveal variant="slide-left">
          <span className="text-xs font-semibold tracking-[0.15em] text-[var(--color-coral-dark)] uppercase">
            {product.category.name}
          </span>
          <h1 className="mt-2 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)] md:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-ink-soft)]">
            {product.shortDescription}
          </p>

          <div className="mt-6 text-2xl font-semibold text-[var(--color-ink)]">
            {product.showPrice && product.price
              ? formatPrice(product.promotionalPrice ?? product.price)
              : "Consulte o valor"}
          </div>

          <a
            href={buildWhatsAppLink(whatsappMessages.produto(product.name))}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[var(--color-coral)] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[var(--color-coral-dark)] sm:w-auto"
          >
            Solicitar orçamento
          </a>

          <div className="mt-10 flex flex-col gap-6 border-t border-[var(--color-line)] pt-8">
            <div>
              <h2 className="text-sm font-semibold tracking-[0.1em] text-[var(--color-ink)] uppercase">
                Descrição
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)] whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {product.tags && (
              <div>
                <h2 className="text-sm font-semibold tracking-[0.1em] text-[var(--color-ink)] uppercase">
                  Opções
                </h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.tags.split(",").map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[var(--color-pink-light)] px-3 py-1 text-xs font-medium text-[var(--color-coral-dark)]"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {product.notes && (
              <div>
                <h2 className="text-sm font-semibold tracking-[0.1em] text-[var(--color-ink)] uppercase">
                  Observações
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">
                  {product.notes}
                </p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
