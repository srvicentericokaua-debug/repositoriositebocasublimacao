import { prisma } from "@/lib/prisma";
import { createCategory, updateCategory, deleteCategory } from "./actions";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";

export default async function AdminCategoriasPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const { success, error } = await searchParams;
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { products: true } } },
  });

  return (
    <div>
      <h1 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
        Categorias
      </h1>

      {success && (
        <p className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">{success.replace(/\+/g, " ")}</p>
      )}
      {error && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error.replace(/\+/g, " ")}</p>
      )}

      <form action={createCategory} className="mt-6 flex flex-wrap items-end gap-3 rounded-2xl border border-[var(--color-line)] bg-white p-5">
        <div className="flex-1 min-w-[180px]">
          <label className="mb-1 block text-xs font-semibold text-[var(--color-ink)]">Nome da categoria</label>
          <input name="name" required className="w-full rounded-xl border border-[var(--color-line)] px-3 py-2 text-sm" />
        </div>
        <div className="w-28">
          <label className="mb-1 block text-xs font-semibold text-[var(--color-ink)]">Ordem</label>
          <input name="order" type="number" defaultValue={categories.length} className="w-full rounded-xl border border-[var(--color-line)] px-3 py-2 text-sm" />
        </div>
        <label className="flex items-center gap-2 text-sm text-[var(--color-ink)]">
          <input type="checkbox" name="active" defaultChecked /> Ativa
        </label>
        <button type="submit" className="rounded-full bg-[var(--color-coral)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-coral-dark)]">
          + Nova categoria
        </button>
      </form>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-[var(--color-line)] bg-white">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-[var(--color-line)] text-left text-xs text-[var(--color-ink-soft)] uppercase">
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Produtos</th>
              <th className="px-4 py-3">Ordem</th>
              <th className="px-4 py-3">Ativa</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => {
              const updateWithId = updateCategory.bind(null, cat.id);
              const deleteWithId = deleteCategory.bind(null, cat.id);
              return (
                <tr key={cat.id} className="border-b border-[var(--color-line)] last:border-0">
                  <td className="px-4 py-3">
                    <form action={updateWithId} id={`cat-form-${cat.id}`} className="flex items-center gap-2">
                      <input
                        name="name"
                        defaultValue={cat.name}
                        className="w-full rounded-lg border border-[var(--color-line)] px-2 py-1.5 text-sm"
                      />
                    </form>
                  </td>
                  <td className="px-4 py-3 text-[var(--color-ink-soft)]">{cat._count.products}</td>
                  <td className="px-4 py-3">
                    <input
                      form={`cat-form-${cat.id}`}
                      name="order"
                      type="number"
                      defaultValue={cat.order}
                      className="w-16 rounded-lg border border-[var(--color-line)] px-2 py-1.5 text-sm"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input form={`cat-form-${cat.id}`} type="checkbox" name="active" defaultChecked={cat.active} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button form={`cat-form-${cat.id}`} type="submit" className="rounded-full border border-[var(--color-line)] px-3 py-1.5 text-xs font-semibold text-[var(--color-ink)] hover:border-[var(--color-coral)]">
                        Salvar
                      </button>
                      <form action={deleteWithId}>
                        <ConfirmSubmitButton className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50">
                          Excluir
                        </ConfirmSubmitButton>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
