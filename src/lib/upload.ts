import { put } from "@vercel/blob";
import crypto from "crypto";
import path from "path";

export class UploadValidationError extends Error {}

const ALLOWED_TYPES = new Set(["image/jpeg", "image/jpg", "image/png", "image/webp"]);
const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const MAX_SIZE_BYTES = 8 * 1024 * 1024;

export async function saveUploadedImage(file: File | null, folder: "products" | "portfolio") {
  if (!file || file.size === 0) return null;

  const ext = (path.extname(file.name) || "").toLowerCase();

  if (!ALLOWED_TYPES.has(file.type) || !ALLOWED_EXTENSIONS.has(ext)) {
    throw new UploadValidationError("Formato de imagem não permitido. Use JPG, PNG ou WEBP.");
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new UploadValidationError("A imagem deve ter no máximo 8MB.");
  }

  const filename = `${folder}/${crypto.randomUUID()}${ext}`;

  try {
    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: false,
    });
    return blob.url;
  } catch (err) {
    console.error("Falha ao enviar imagem para o storage:", err);
    throw new Error("Não foi possível enviar a imagem. Tente novamente em instantes.");
  }
}
