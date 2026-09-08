import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/site/PageHero";
import { PortfolioGrid } from "@/components/site/PortfolioGrid";

export const metadata: Metadata = {
  title: "Portfólio",
  description: "Veja trabalhos reais feitos pela Boca Sublimação: canecas, camisetas, squeezes e mais.",
};

export const revalidate = 0;

export default async function PortfolioPage() {
  const items = await prisma.portfolioItem.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <PageHero
        eyebrow="Nossos trabalhos"
        title="Portfólio"
        description="Uma vitrine de pedidos reais, feitos com carinho para clientes de Sorocaba e região."
      />

      <section className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <PortfolioGrid items={items} />
      </section>
    </>
  );
}
