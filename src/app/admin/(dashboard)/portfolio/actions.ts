"use server";

import { prisma } from "@/lib/prisma";
import { saveUploadedImage, UploadValidationError } from "@/lib/upload";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function refresh() {
  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
  revalidatePath("/");
}

export async function createPortfolioItem(formData: FormData) {
  const title = String(formData.get("title") ?? "");
  const description = String(formData.get("description") ?? "") || null;
  const categoryTag = String(formData.get("categoryTag") ?? "Outros");
  const order = Number(formData.get("order") ?? 0);
  const file = formData.get("image") as File | null;

  if (!title || !file || file.size === 0) {
    redirect("/admin/portfolio?error=Titulo+e+imagem+sao+obrigatorios");
  }

  let imageUrl: string | null;
  try {
    imageUrl = await saveUploadedImage(file, "portfolio");
  } catch (err) {
    const message =
      err instanceof UploadValidationError ? err.message : "Não foi possível enviar a imagem.";
    redirect(`/admin/portfolio?error=${encodeURIComponent(message)}`);
  }
  if (!imageUrl) {
    redirect("/admin/portfolio?error=Falha+ao+enviar+imagem");
  }

  await prisma.portfolioItem.create({
    data: { title, description, categoryTag, order, imageUrl, active: true },
  });

  refresh();
  redirect("/admin/portfolio?success=Foto+adicionada+ao+portfolio");
}

export async function toggleActive(id: string, active: boolean) {
  await prisma.portfolioItem.update({ where: { id }, data: { active } });
  refresh();
  redirect("/admin/portfolio?success=Atualizado");
}

export async function deletePortfolioItem(id: string) {
  await prisma.portfolioItem.delete({ where: { id } });
  refresh();
  redirect("/admin/portfolio?success=Foto+removida");
}
