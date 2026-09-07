import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const baseUrl = "https://bocasublimacao.com.br";

const staticRoutes = [
  "",
  "/quem-somos",
  "/produtos",
  "/portfolio",
  "/como-funciona",
  "/personalizacao",
  "/missao-visao-valores",
  "/prazos",
  "/pagamento",
  "/entrega-e-retirada",
  "/contato",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await prisma.product.findMany({ where: { active: true }, select: { slug: true, updatedAt: true } });

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })),
    ...products.map((p) => ({
      url: `${baseUrl}/produtos/${p.slug}`,
      lastModified: p.updatedAt,
    })),
  ];
}
