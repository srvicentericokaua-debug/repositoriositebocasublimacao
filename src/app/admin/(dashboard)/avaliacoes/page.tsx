import { prisma } from "@/lib/prisma";
import { createTestimonial, toggleTestimonialActive, deleteTestimonial } from "./actions";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";

export default async function AdminAvaliacoesPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const { success, error } = await searchParams;
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
        Avaliações do Google
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-[var(--color-ink-soft)]">
        Cole aqui o texto de avaliações reais do seu perfil do Google (nome do cliente, nota e
        comentário exatamente como aparecem lá). Elas aparecem automaticamente no carrossel da
        Home assim que forem cadastradas.
      </p>

      {success && (
        <p className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">{success.replace(/\+/g, " ")}</p>
      )}
      {error && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error.replace(/\+/g, " ")}</p>
      )}

      <form
        action={createTestimonial}
        className="mt-6 grid gap-3 rounded-2xl border border-[var(--color-line)] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        <div>
          <label className="mb-1 block text-xs font-semibold text-[var(--color-ink)]">Nome do cliente</label>
          <input name="authorName" required className="w-full rounded-xl border border-[var(--color-line)] px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-[var(--color-ink)]">Nota (1 a 5)</label>
          <select name="rating" defaultValue="5" className="w-full rounded-xl border border-[var(--color-line)] px-3 py-2 text-sm">
            <option value="5">5 estrelas</option>
            <option value="4">4 estrelas</option>
            <option value="3">3 estrelas</option>
            <option value="2">2 estrelas</option>
            <option value="1">1 estrela</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-[var(--color-ink)]">Ordem</label>
          <input name="order" type="number" defaultValue={testimonials.length} className="w-full rounded-xl border border-[var(--color-line)] px-3 py-2 text-sm" />
        </div>
        <div className="flex items-end">
          <button type="submit" className="w-full rounded-full bg-[var(--color-coral)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-coral-dark)]">
            + Adicionar avaliação
          </button>
        </div>
        <div className="sm:col-span-2 lg:col-span-4">
          <label className="mb-1 block text-xs font-semibold text-[var(--color-ink)]">Texto da avaliação (copie exatamente do Google)</label>
          <textarea name="text" required rows={3} className="w-full rounded-xl border border-[var(--color-line)] px-3 py-2 text-sm" />
        </div>
      </form>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => {
          const toggle = toggleTestimonialActive.bind(null, t.id, !t.active);
          const del = deleteTestimonial.bind(null, t.id);
          return (
            <div key={t.id} className="rounded-2xl border border-[var(--color-line)] bg-white p-5">
              <div className="text-sm text-[var(--color-coral)]">{"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}</div>
              <p className="mt-2 text-sm text-[var(--color-ink-soft)]">&ldquo;{t.text}&rdquo;</p>
              <p className="mt-3 text-sm font-semibold text-[var(--color-ink)]">{t.authorName}</p>
              <div className="mt-4 flex items-center justify-between">
                <form action={toggle}>
                  <button type="submit" className="rounded-full border border-[var(--color-line)] px-3 py-1.5 text-xs font-semibold text-[var(--color-ink)]">
                    {t.active ? "Desativar" : "Ativar"}
                  </button>
                </form>
                <form action={del}>
                  <ConfirmSubmitButton className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50">
                    Excluir
                  </ConfirmSubmitButton>
                </form>
              </div>
            </div>
          );
        })}
        {testimonials.length === 0 && (
          <p className="text-sm text-[var(--color-ink-soft)]">Nenhuma avaliação cadastrada ainda.</p>
        )}
      </div>
    </div>
  );
}
