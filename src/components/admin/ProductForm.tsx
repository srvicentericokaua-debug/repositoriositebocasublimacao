type Category = { id: string; name: string };

export type ProductDefaults = {
  name: string;
  categoryId: string;
  shortDescription: string;
  description: string;
  price: number | null;
  promotionalPrice: number | null;
  showPrice: boolean;
  featured: boolean;
  active: boolean;
  order: number;
  tags: string | null;
  notes: string | null;
};

export function ProductForm({
  action,
  categories,
  defaults,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  categories: Category[];
  defaults?: ProductDefaults;
  submitLabel: string;
}) {
  return (
    <form action={action} className="flex flex-col gap-6">
      <div className="grid gap-4 rounded-2xl border border-[var(--color-line)] bg-white p-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-semibold text-[var(--color-ink)]">Nome do produto *</label>
          <input name="name" required defaultValue={defaults?.name} className="w-full rounded-xl border border-[var(--color-line)] px-3 py-2.5 text-sm" />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-[var(--color-ink)]">Categoria *</label>
          <select name="categoryId" required defaultValue={defaults?.categoryId} className="w-full rounded-xl border border-[var(--color-line)] px-3 py-2.5 text-sm">
            <option value="">Selecione...</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-[var(--color-ink)]">Ordem de exibição</label>
          <input name="order" type="number" defaultValue={defaults?.order ?? 0} className="w-full rounded-xl border border-[var(--color-line)] px-3 py-2.5 text-sm" />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-semibold text-[var(--color-ink)]">Descrição curta *</label>
          <input name="shortDescription" required defaultValue={defaults?.shortDescription} className="w-full rounded-xl border border-[var(--color-line)] px-3 py-2.5 text-sm" />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-semibold text-[var(--color-ink)]">Descrição completa *</label>
          <textarea name="description" required rows={5} defaultValue={defaults?.description} className="w-full rounded-xl border border-[var(--color-line)] px-3 py-2.5 text-sm" />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-[var(--color-ink)]">Preço (R$)</label>
          <input name="price" type="number" step="0.01" defaultValue={defaults?.price ?? ""} className="w-full rounded-xl border border-[var(--color-line)] px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-[var(--color-ink)]">Preço promocional (R$)</label>
          <input name="promotionalPrice" type="number" step="0.01" defaultValue={defaults?.promotionalPrice ?? ""} className="w-full rounded-xl border border-[var(--color-line)] px-3 py-2.5 text-sm" />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-semibold text-[var(--color-ink)]">Tags (separadas por vírgula)</label>
          <input name="tags" defaultValue={defaults?.tags ?? ""} placeholder="ex: 325ml, branca, com alça colorida" className="w-full rounded-xl border border-[var(--color-line)] px-3 py-2.5 text-sm" />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-semibold text-[var(--color-ink)]">Observações</label>
          <textarea name="notes" rows={3} defaultValue={defaults?.notes ?? ""} className="w-full rounded-xl border border-[var(--color-line)] px-3 py-2.5 text-sm" />
        </div>

        <div className="flex flex-wrap gap-6 sm:col-span-2">
          <label className="flex items-center gap-2 text-sm text-[var(--color-ink)]">
            <input type="checkbox" name="showPrice" defaultChecked={defaults?.showPrice} /> Mostrar preço
          </label>
          <label className="flex items-center gap-2 text-sm text-[var(--color-ink)]">
            <input type="checkbox" name="featured" defaultChecked={defaults?.featured} /> Produto em destaque
          </label>
          <label className="flex items-center gap-2 text-sm text-[var(--color-ink)]">
            <input type="checkbox" name="active" defaultChecked={defaults?.active ?? true} /> Ativo (visível no site)
          </label>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--color-line)] bg-white p-5">
        <label className="mb-1 block text-xs font-semibold text-[var(--color-ink)]">
          {defaults ? "Adicionar novas fotos" : "Fotos do produto"}
        </label>
        <input name="images" type="file" accept="image/*" multiple className="w-full text-sm" />
      </div>

      <button type="submit" className="self-start rounded-full bg-[var(--color-coral)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--color-coral-dark)]">
        {submitLabel}
      </button>
    </form>
  );
}
