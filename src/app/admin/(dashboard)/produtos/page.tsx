import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { deleteProduct, duplicateProduct, toggleProductActive } from "./actions";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";

export default async function AdminProdutosPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const { success, error } = await searchParams;
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true, images: { orderBy: { order: "asc" }, take: 1 } },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
          Produtos
        </h1>
        <Link
          href="/admin/produtos/novo"
          className="rounded-full bg-[var(--color-coral)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-coral-dark)]"
        >
          + Novo produto
        </Link>
      </div>

      {success && (
        <p className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">{success.replace(/\+/g, " ")}</p>
      )}
      {error && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error.replace(/\+/g, " ")}</p>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-[var(--color-line)] bg-white">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b border-[var(--color-line)] text-left text-xs text-[var(--color-ink-soft)] uppercase">
              <th className="px-4 py-3">Produto</th>
              <th className="px-4 py-3">Categoria</th>
              <th className="px-4 py-3">Destaque</th>
              <th className="px-4 py-3">Ativo</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const toggle = toggleProductActive.bind(null, p.id, !p.active);
              const duplicate = duplicateProduct.bind(null, p.id);
              const remove = deleteProduct.bind(null, p.id);
              return (
                <tr key={p.id} className="border-b border-[var(--color-line)] last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-[var(--color-pink-light)]">
                        {p.images[0] && (
                          <Image src={p.images[0].url} alt={p.images[0].alt} fill className="object-cover" />
                        )}
                      </div>
                      <span className="font-medium text-[var(--color-ink)]">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[var(--color-ink-soft)]">{p.category.name}</td>
                  <td className="px-4 py-3">{p.featured ? "Sim" : "Não"}</td>
                  <td className="px-4 py-3">{p.active ? "Ativo" : "Inativo"}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap justify-end gap-2">
                      <Link href={`/admin/produtos/${p.id}/editar`} className="rounded-full border border-[var(--color-line)] px-3 py-1.5 text-xs font-semibold text-[var(--color-ink)] hover:border-[var(--color-coral)]">
                        Editar
                      </Link>
                      <form action={duplicate}>
                        <button type="submit" className="rounded-full border border-[var(--color-line)] px-3 py-1.5 text-xs font-semibold text-[var(--color-ink)]">
                          Duplicar
                        </button>
                      </form>
                      <form action={toggle}>
                        <button type="submit" className="rounded-full border border-[var(--color-line)] px-3 py-1.5 text-xs font-semibold text-[var(--color-ink)]">
                          {p.active ? "Desativar" : "Ativar"}
                        </button>
                      </form>
                      <form action={remove}>
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
        {products.length === 0 && (
          <p className="p-6 text-center text-sm text-[var(--color-ink-soft)]">Nenhum produto cadastrado ainda.</p>
        )}
      </div>
    </div>
  );
}
