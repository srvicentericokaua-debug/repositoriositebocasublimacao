import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";
import { updateProduct, deleteProductImage } from "../../actions";

export default async function EditarProdutoPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id }, include: { images: { orderBy: { order: "asc" } } } }),
    prisma.category.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
  ]);

  if (!product) notFound();

  const updateWithId = updateProduct.bind(null, id);

  return (
    <div className="max-w-3xl">
      <h1 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
        Editar produto
      </h1>
      {error && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error.replace(/\+/g, " ")}</p>
      )}

      {product.images.length > 0 && (
        <div className="mt-6 rounded-2xl border border-[var(--color-line)] bg-white p-5">
          <p className="mb-3 text-xs font-semibold text-[var(--color-ink)]">Fotos atuais</p>
          <div className="flex flex-wrap gap-3">
            {product.images.map((img) => {
              const del = deleteProductImage.bind(null, img.id, product.id);
              return (
                <div key={img.id} className="relative">
                  <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-[var(--color-pink-light)]">
                    <Image src={img.url} alt={img.alt} fill className="object-cover" />
                  </div>
                  <form action={del} className="absolute -top-2 -right-2">
                    <ConfirmSubmitButton
                      message="Remover esta foto do produto?"
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs text-red-600 shadow"
                    >
                      ✕
                    </ConfirmSubmitButton>
                  </form>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-6">
        <ProductForm
          action={updateWithId}
          categories={categories}
          submitLabel="Salvar alterações"
          defaults={{
            name: product.name,
            categoryId: product.categoryId,
            shortDescription: product.shortDescription,
            description: product.description,
            price: product.price,
            promotionalPrice: product.promotionalPrice,
            showPrice: product.showPrice,
            featured: product.featured,
            active: product.active,
            order: product.order,
            tags: product.tags,
            notes: product.notes,
          }}
        />
      </div>
    </div>
  );
}
