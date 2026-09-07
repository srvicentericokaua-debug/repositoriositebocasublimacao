"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function linesToArray(value: string) {
  return value
    .split("\n")
    .map((v) => v.trim())
    .filter(Boolean);
}

export async function updateSettings(formData: FormData) {
  const valoresRaw = String(formData.get("valoresText") ?? "");
  const valores = valoresRaw
    .split("\n\n")
    .map((block) => {
      const [title, ...rest] = block.split("\n");
      return { title: (title ?? "").trim(), text: rest.join(" ").trim() };
    })
    .filter((v) => v.title && v.text);

  await prisma.siteSettings.update({
    where: { id: 1 },
    data: {
      companyName: String(formData.get("companyName") ?? ""),
      slogan: String(formData.get("slogan") ?? ""),
      whatsapp: String(formData.get("whatsapp") ?? ""),
      email: String(formData.get("email") ?? ""),
      instagram: String(formData.get("instagram") ?? ""),
      cnpj: String(formData.get("cnpj") ?? ""),
      city: String(formData.get("city") ?? ""),
      quemSomosText: String(formData.get("quemSomosText") ?? ""),
      logoStoryText: String(formData.get("logoStoryText") ?? ""),
      missaoText: String(formData.get("missaoText") ?? ""),
      visaoText: String(formData.get("visaoText") ?? ""),
      prazosText: String(formData.get("prazosText") ?? ""),
      valoresJson: JSON.stringify(valores),
      pagamentoJson: JSON.stringify(linesToArray(String(formData.get("pagamentoText") ?? ""))),
      entregaJson: JSON.stringify(linesToArray(String(formData.get("entregaText") ?? ""))),
    },
  });

  revalidatePath("/", "layout");
  redirect("/admin/configuracoes?success=Configuracoes+atualizadas");
}
