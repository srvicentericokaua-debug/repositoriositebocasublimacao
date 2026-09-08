"use client";

import { useState } from "react";

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_SIZE_BYTES = 8 * 1024 * 1024;

export function ImageFileInput({
  name,
  multiple,
  required,
}: {
  name: string;
  multiple?: boolean;
  required?: boolean;
}) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    previews.forEach((url) => URL.revokeObjectURL(url));
    setPreviews([]);
    setError(null);

    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setError("Formato de imagem não permitido. Use JPG, PNG ou WEBP.");
        e.target.value = "";
        return;
      }
      if (file.size > MAX_SIZE_BYTES) {
        setError("A imagem deve ter no máximo 8MB.");
        e.target.value = "";
        return;
      }
    }

    setPreviews(files.map((file) => URL.createObjectURL(file)));
  }

  return (
    <div>
      <input
        name={name}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple={multiple}
        required={required}
        onChange={handleChange}
        className="w-full text-sm"
      />
      {error && <p className="mt-2 text-xs font-medium text-red-600">{error}</p>}
      {previews.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-3">
          {previews.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt="Pré-visualização"
              className="h-20 w-20 rounded-lg object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
}
