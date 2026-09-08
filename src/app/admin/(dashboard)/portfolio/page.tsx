import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { createPortfolioItem, toggleActive, deletePortfolioItem } from "./actions";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";
import { ImageFileInput } from "@/components/admin/ImageFileInput";
import { SubmitButton } from "@/components/admin/SubmitButton";

const categoryOptions = ["Canecas", "Squeezes", "Camisetas", "Eventos", "Outros"];

export default async function AdminPortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const { success, error } = await searchParams;
  const items = await prisma.portfolioItem.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
        Portfólio
      </h1>

      {success && (
        <p className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">{success.replace(/\+/g, " ")}</p>
      )}
      {error && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error.replace(/\+/g, " ")}</p>
      )}

      <form
        action={createPortfolioItem}
        className="mt-6 grid gap-3 rounded-2xl border border-[var(--color-line)] bg-white p-5 sm:grid-cols-2 lg:grid-cols-5"
      >
        <div className="lg:col-span-2">
          <label className="mb-1 block text-xs font-semibold text-[var(--color-ink)]">Título</label>
          <input name="title" required className="w-full rounded-xl border border-[var(--color-line)] px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-[var(--color-ink)]">Categoria</label>
          <select name="categoryTag" className="w-full rounded-xl border border-[var(--color-line)] px-3 py-2 text-sm">
            {categoryOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-[var(--color-ink)]">Ordem</label>
          <input name="order" type="number" defaultValue={items.length} className="w-full rounded-xl border border-[var(--color-line)] px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-[var(--color-ink)]">Imagem</label>
          <ImageFileInput name="image" required />
        </div>
        <div className="sm:col-span-2 lg:col-span-5">
          <label className="mb-1 block text-xs font-semibold text-[var(--color-ink)]">Descrição (opcional)</label>
          <input name="description" className="w-full rounded-xl border border-[var(--color-line)] px-3 py-2 text-sm" />
        </div>
        <SubmitButton className="lg:col-span-5 rounded-full bg-[var(--color-coral)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-coral-dark)]">
          + Adicionar foto
        </SubmitButton>
      </form>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const toggle = toggleActive.bind(null, item.id, !item.active);
          const del = deletePortfolioItem.bind(null, item.id);
          return (
            <div key={item.id} className="overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white">
              <div className="relative aspect-square bg-[var(--color-pink-light)]">
                <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-[var(--color-ink)]">{item.title}</p>
                <p className="text-xs text-[var(--color-ink-soft)]">{item.categoryTag}</p>
                <div className="mt-3 flex items-center justify-between">
                  <form action={toggle}>
                    <button type="submit" className="rounded-full border border-[var(--color-line)] px-3 py-1.5 text-xs font-semibold text-[var(--color-ink)]">
                      {item.active ? "Desativar" : "Ativar"}
                    </button>
                  </form>
                  <form action={del}>
                    <ConfirmSubmitButton className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50">
                      Excluir
                    </ConfirmSubmitButton>
                  </form>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
