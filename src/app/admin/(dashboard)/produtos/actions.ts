"use server";

import { prisma } from "@/lib/prisma";
import { saveUploadedImage, UploadValidationError } from "@/lib/upload";
import { slugify } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function saveImages(files: File[], productId: string, alt: string, startOrder: number) {
  let order = startOrder;
  for (const file of files) {
    try {
      const url = await saveUploadedImage(file, "products");
      if (url) {
        await prisma.productImage.create({ data: { productId, url, alt, order: order++ } });
      }
    } catch (err) {
      const message =
        err instanceof UploadValidationError ? err.message : "Não foi possível enviar uma das fotos.";
      return message;
    }
  }
  return null;
}

function refresh() {
  revalidatePath("/admin/produtos");
  revalidatePath("/produtos");
  revalidatePath("/");
}

async function uniqueSlug(base: string, ignoreId?: string) {
  let slug = slugify(base) || "produto";
  let suffix = 1;
  while (true) {
    const existing = await prisma.product.findUnique({ where: { slug } });
    if (!existing || existing.id === ignoreId) return slug;
    suffix += 1;
    slug = `${slugify(base)}-${suffix}`;
  }
}

function readCommon(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    categoryId: String(formData.get("categoryId") ?? ""),
    shortDescription: String(formData.get("shortDescription") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    price: formData.get("price") ? Number(formData.get("price")) : null,
    promotionalPrice: formData.get("promotionalPrice") ? Number(formData.get("promotionalPrice")) : null,
    showPrice: formData.get("showPrice") === "on",
    featured: formData.get("featured") === "on",
    active: formData.get("active") === "on",
    order: Number(formData.get("order") ?? 0),
    tags: String(formData.get("tags") ?? "").trim() || null,
    notes: String(formData.get("notes") ?? "").trim() || null,
  };
}

export async function createProduct(formData: FormData) {
  const data = readCommon(formData);

  if (!data.name || !data.categoryId || !data.shortDescription || !data.description) {
    redirect("/admin/produtos/novo?error=Preencha+os+campos+obrigatorios");
  }

  const slug = await uniqueSlug(data.name);
  const files = formData.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);

  const product = await prisma.product.create({
    data: { ...data, slug },
  });

  const uploadError = await saveImages(files, product.id, data.name, 0);

  refresh();
  if (uploadError) {
    redirect(
      `/admin/produtos/${product.id}/editar?error=${encodeURIComponent(`Produto criado, mas ${uploadError}`)}`
    );
  }
  redirect("/admin/produtos?success=Produto+criado+com+sucesso");
}

export async function updateProduct(id: string, formData: FormData) {
  const data = readCommon(formData);

  if (!data.name || !data.categoryId || !data.shortDescription || !data.description) {
    redirect(`/admin/produtos/${id}/editar?error=Preencha+os+campos+obrigatorios`);
  }

  const current = await prisma.product.findUnique({ where: { id } });
  if (!current) redirect("/admin/produtos?error=Produto+nao+encontrado");

  const slug = current.name === data.name ? current.slug : await uniqueSlug(data.name, id);
  const files = formData.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);

  await prisma.product.update({ where: { id }, data: { ...data, slug } });

  const existingCount = await prisma.productImage.count({ where: { productId: id } });
  const uploadError = await saveImages(files, id, data.name, existingCount);

  refresh();
  if (uploadError) {
    redirect(`/admin/produtos/${id}/editar?error=${encodeURIComponent(uploadError)}`);
  }
  redirect("/admin/produtos?success=Produto+atualizado");
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  refresh();
  redirect("/admin/produtos?success=Produto+excluido");
}

export async function duplicateProduct(id: string) {
  const original = await prisma.product.findUnique({ where: { id }, include: { images: true } });
  if (!original) redirect("/admin/produtos?error=Produto+nao+encontrado");

  const slug = await uniqueSlug(`${original.name} copia`);
  const copy = await prisma.product.create({
    data: {
      name: `${original.name} (cópia)`,
      slug,
      categoryId: original.categoryId,
      shortDescription: original.shortDescription,
      description: original.description,
      price: original.price,
      promotionalPrice: original.promotionalPrice,
      showPrice: original.showPrice,
      featured: false,
      active: false,
      order: original.order,
      tags: original.tags,
      notes: original.notes,
    },
  });

  for (const img of original.images) {
    await prisma.productImage.create({
      data: { productId: copy.id, url: img.url, alt: img.alt, order: img.order },
    });
  }

  refresh();
  redirect("/admin/produtos?success=Produto+duplicado");
}

export async function toggleProductActive(id: string, active: boolean) {
  await prisma.product.update({ where: { id }, data: { active } });
  refresh();
  redirect("/admin/produtos?success=Atualizado");
}

export async function deleteProductImage(imageId: string, productId: string) {
  await prisma.productImage.delete({ where: { id: imageId } });
  revalidatePath(`/admin/produtos/${productId}/editar`);
  revalidatePath("/produtos");
}
