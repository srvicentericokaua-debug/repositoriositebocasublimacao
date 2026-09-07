import { prisma } from "@/lib/prisma";

export type Valor = { title: string; text: string };

export function splitParagraphs(text: string) {
  return text.split(/\r?\n\r?\n/).filter(Boolean);
}

export async function getSiteSettings() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  if (!settings) {
    throw new Error("SiteSettings não encontrado. Rode `npx prisma db seed`.");
  }

  return {
    ...settings,
    valores: JSON.parse(settings.valoresJson) as Valor[],
    formasPagamento: JSON.parse(settings.pagamentoJson) as string[],
    entrega: JSON.parse(settings.entregaJson) as string[],
  };
}
