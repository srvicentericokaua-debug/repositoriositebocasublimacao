"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images }: { images: { url: string; alt: string }[] }) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-3xl bg-[var(--color-pink-light)] text-sm text-[var(--color-ink-soft)]">
        Fotos em breve
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-[var(--color-pink-light)]">
        <Image src={images[active].url} alt={images[active].alt} fill className="object-cover" priority />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={img.url + i}
              onClick={() => setActive(i)}
              aria-label={`Ver imagem ${i + 1}`}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl ${
                i === active ? "ring-2 ring-[var(--color-coral)]" : "opacity-70"
              }`}
            >
              <Image src={img.url} alt={img.alt} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
