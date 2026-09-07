import Image from "next/image";
import Link from "next/link";
import { buildWhatsAppLink, whatsappMessages } from "@/lib/whatsapp";

export type ProductCardData = {
  slug: string;
  name: string;
  shortDescription: string;
  price: number | null;
  promotionalPrice: number | null;
  showPrice: boolean;
  category: { name: string };
  images: { url: string; alt: string }[];
};

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function ProductCard({ product }: { product: ProductCardData }) {
  const cover = product.images[0];

  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] shadow-[0_10px_30px_-18px_rgba(36,26,23,0.25)] transition-shadow hover:shadow-[0_16px_40px_-16px_rgba(36,26,23,0.3)]">
      <Link href={`/produtos/${product.slug}`} className="relative block aspect-square overflow-hidden bg-[var(--color-pink-light)]">
        {cover ? (
          <Image
            src={cover.url}
            alt={cover.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-[var(--color-ink-soft)]">
            Sem foto ainda
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="text-xs font-semibold tracking-[0.12em] text-[var(--color-coral-dark)] uppercase">
          {product.category.name}
        </span>
        <h3 className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-ink)]">
          {product.name}
        </h3>
        <p className="line-clamp-2 flex-1 text-sm text-[var(--color-ink-soft)]">
          {product.shortDescription}
        </p>

        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-[var(--color-ink)]">
            {product.showPrice && product.price ? formatPrice(product.promotionalPrice ?? product.price) : "Consulte o valor"}
          </span>
        </div>

        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <Link
            href={`/produtos/${product.slug}`}
            className="flex-1 rounded-full border border-[var(--color-line)] px-4 py-2.5 text-center text-sm font-semibold text-[var(--color-ink)] transition-colors hover:border-[var(--color-coral)] hover:text-[var(--color-coral-dark)]"
          >
            Ver detalhes
          </Link>
          <a
            href={buildWhatsAppLink(whatsappMessages.produto(product.name))}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-full bg-[var(--color-coral)] px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[var(--color-coral-dark)]"
          >
            Solicitar orçamento
          </a>
        </div>
      </div>
    </div>
  );
}
