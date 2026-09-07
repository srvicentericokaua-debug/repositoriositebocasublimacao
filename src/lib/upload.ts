import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

export async function saveUploadedImage(file: File | null, folder: "products" | "portfolio") {
  if (!file || file.size === 0) return null;

  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name) || ".jpg";
  const filename = `${crypto.randomUUID()}${ext}`;
  const dir = path.join(process.cwd(), "public", "images", folder);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), bytes);

  return `/images/${folder}/${filename}`;
}
