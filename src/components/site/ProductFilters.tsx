"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useTransition } from "react";

type Category = { slug: string; name: string };

export function ProductFilters({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  function updateParams(next: Record<string, string | undefined>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(next)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    params.delete("page");
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-5 md:flex-row md:items-center md:justify-between">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateParams({ q: query || undefined });
        }}
        className="flex flex-1 items-center gap-2"
      >
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar produto..."
          className="w-full rounded-full border border-[var(--color-line)] px-4 py-2.5 text-sm text-[var(--color-ink)] outline-none focus-visible:border-[var(--color-coral)]"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-[var(--color-coral)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-coral-dark)]"
        >
          Buscar
        </button>
      </form>

      <div className="flex gap-3">
        <select
          value={searchParams.get("categoria") ?? ""}
          onChange={(e) => updateParams({ categoria: e.target.value || undefined })}
          className="rounded-full border border-[var(--color-line)] px-4 py-2.5 text-sm text-[var(--color-ink)] outline-none"
        >
          <option value="">Todas as categorias</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          value={searchParams.get("sort") ?? "recentes"}
          onChange={(e) => updateParams({ sort: e.target.value })}
          className="rounded-full border border-[var(--color-line)] px-4 py-2.5 text-sm text-[var(--color-ink)] outline-none"
        >
          <option value="recentes">Mais recentes</option>
          <option value="az">Nome A-Z</option>
          <option value="za">Nome Z-A</option>
          <option value="menor-preco">Menor preço</option>
          <option value="maior-preco">Maior preço</option>
        </select>
      </div>
    </div>
  );
}
