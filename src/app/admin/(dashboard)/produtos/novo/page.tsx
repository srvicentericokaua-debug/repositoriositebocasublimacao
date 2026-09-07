import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";
import { createProduct } from "../actions";

export default async function NovoProdutoPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const categories = await prisma.category.findMany({ where: { active: true }, orderBy: { order: "asc" } });

  return (
    <div className="max-w-3xl">
      <h1 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
        Novo produto
      </h1>
      {error && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error.replace(/\+/g, " ")}</p>
      )}
      <div className="mt-6">
        <ProductForm action={createProduct} categories={categories} submitLabel="Criar produto" />
      </div>
    </div>
  );
}
