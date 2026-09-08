"use client";

import Image from "next/image";
import { useState } from "react";

export type PortfolioItemData = {
  id: string;
  title: string;
  description: string | null;
  categoryTag: string;
  imageUrl: string;
};

const filters = ["Todos", "Canecas", "Squeezes", "Camisetas", "Eventos", "Outros"];

export function PortfolioGrid({ items }: { items: PortfolioItemData[] }) {
  const [filter, setFilter] = useState("Todos");
  const [lightbox, setLightbox] = useState<PortfolioItemData | null>(null);

  const filtered = filter === "Todos" ? items : items.filter((i) => i.categoryTag === filter);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              filter === f
                ? "bg-[var(--color-coral)] text-white"
                : "border border-[var(--color-line)] text-[var(--color-ink)] hover:border-[var(--color-coral)]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => setLightbox(item)}
              className="group relative block w-full overflow-hidden rounded-2xl bg-[var(--color-pink-light)] text-left"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={600}
                height={600}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                {item.title}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-[var(--color-ink-soft)]">
          Nenhum trabalho nesta categoria ainda.
        </p>
      )}

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-6"
        >
          <button
            aria-label="Fechar"
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            ✕
          </button>
          <div className="max-h-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightbox.imageUrl}
              alt={lightbox.title}
              width={1000}
              height={1000}
              className="max-h-[80vh] w-auto rounded-xl object-contain"
            />
            <p className="mt-4 text-center text-sm text-white/80">{lightbox.title}</p>
          </div>
        </div>
      )}
    </div>
  );
}
