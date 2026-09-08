import { put } from "@vercel/blob";
import crypto from "crypto";
import path from "path";

export async function saveUploadedImage(file: File | null, folder: "products" | "portfolio") {
  if (!file || file.size === 0) return null;

  const ext = path.extname(file.name) || ".jpg";
  const filename = `${folder}/${crypto.randomUUID()}${ext}`;

  const blob = await put(filename, file, {
    access: "public",
    addRandomSuffix: false,
  });

  return blob.url;
}
