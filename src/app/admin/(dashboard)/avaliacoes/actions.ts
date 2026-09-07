"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function refresh() {
  revalidatePath("/admin/avaliacoes");
  revalidatePath("/");
}

export async function createTestimonial(formData: FormData) {
  const authorName = String(formData.get("authorName") ?? "").trim();
  const text = String(formData.get("text") ?? "").trim();
  const rating = Number(formData.get("rating") ?? 5);
  const order = Number(formData.get("order") ?? 0);

  if (!authorName || !text) {
    redirect("/admin/avaliacoes?error=Nome+e+texto+sao+obrigatorios");
  }

  await prisma.testimonial.create({
    data: { authorName, text, rating, order, active: true },
  });

  refresh();
  redirect("/admin/avaliacoes?success=Avaliacao+adicionada");
}

export async function toggleTestimonialActive(id: string, active: boolean) {
  await prisma.testimonial.update({ where: { id }, data: { active } });
  refresh();
  redirect("/admin/avaliacoes?success=Atualizado");
}

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({ where: { id } });
  refresh();
  redirect("/admin/avaliacoes?success=Avaliacao+removida");
}
