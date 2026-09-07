import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [totalProducts, activeProducts, totalCategories, featuredProducts, recentProducts] =
    await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { active: true } }),
      prisma.category.count({ where: { active: true } }),
      prisma.product.count({ where: { featured: true } }),
      prisma.product.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { category: true },
      }),
    ]);

  const cards = [
    { label: "Total de produtos", value: totalProducts },
    { label: "Produtos ativos", value: activeProducts },
    { label: "Categorias", value: totalCategories },
    { label: "Produtos em destaque", value: featuredProducts },
  ];

  return (
    <div>
      <h1 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
        Dashboard
      </h1>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-[var(--color-line)] bg-white p-5">
            <p className="text-xs font-semibold tracking-[0.1em] text-[var(--color-ink-soft)] uppercase">
              {card.label}
            </p>
            <p className="mt-2 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)]">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-[var(--color-line)] bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[var(--color-ink)]">Últimos produtos cadastrados</h2>
          <Link href="/admin/produtos/novo" className="text-xs font-semibold text-[var(--color-coral-dark)]">
            + Novo produto
          </Link>
        </div>

        {recentProducts.length > 0 ? (
          <ul className="mt-4 flex flex-col gap-3">
            {recentProducts.map((p) => (
              <li key={p.id} className="flex items-center justify-between border-b border-[var(--color-line)] pb-3 text-sm last:border-0">
                <div>
                  <span className="font-medium text-[var(--color-ink)]">{p.name}</span>
                  <span className="ml-2 text-xs text-[var(--color-ink-soft)]">{p.category.name}</span>
                </div>
                <Link href={`/admin/produtos/${p.id}/editar`} className="text-xs font-semibold text-[var(--color-coral-dark)]">
                  Editar
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-[var(--color-ink-soft)]">Nenhum produto cadastrado ainda.</p>
        )}
      </div>
    </div>
  );
}
