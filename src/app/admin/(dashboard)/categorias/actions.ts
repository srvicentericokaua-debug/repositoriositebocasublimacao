"use server";

import { prisma } from "@/lib/prisma";
import { categorySchema, slugify } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function refresh() {
  revalidatePath("/admin/categorias");
  revalidatePath("/produtos");
  revalidatePath("/");
}

export async function createCategory(formData: FormData) {
  const name = String(formData.get("name") ?? "");
  const parsed = categorySchema.safeParse({
    name,
    slug: slugify(name),
    order: formData.get("order"),
    active: formData.get("active") === "on",
  });

  if (!parsed.success) {
    redirect("/admin/categorias?error=Preencha+o+nome+da+categoria");
  }

  await prisma.category.create({ data: parsed.data });
  refresh();
  redirect("/admin/categorias?success=Categoria+criada+com+sucesso");
}

export async function updateCategory(id: string, formData: FormData) {
  const name = String(formData.get("name") ?? "");
  const parsed = categorySchema.safeParse({
    name,
    slug: slugify(name),
    order: formData.get("order"),
    active: formData.get("active") === "on",
  });

  if (!parsed.success) {
    redirect("/admin/categorias?error=Dados+invalidos");
  }

  await prisma.category.update({ where: { id }, data: parsed.data });
  refresh();
  redirect("/admin/categorias?success=Categoria+atualizada");
}

export async function deleteCategory(id: string) {
  const inUse = await prisma.product.count({ where: { categoryId: id } });
  if (inUse > 0) {
    redirect("/admin/categorias?error=Categoria+possui+produtos+vinculados");
  }
  await prisma.category.delete({ where: { id } });
  refresh();
  redirect("/admin/categorias?success=Categoria+excluida");
}
