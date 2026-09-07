import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Informe o nome do produto"),
  slug: z.string().min(2, "Informe o slug"),
  categoryId: z.string().min(1, "Selecione uma categoria"),
  shortDescription: z.string().min(2, "Informe uma descrição curta"),
  description: z.string().min(2, "Informe a descrição completa"),
  price: z.coerce.number().optional().nullable(),
  promotionalPrice: z.coerce.number().optional().nullable(),
  showPrice: z.boolean().default(false),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
  order: z.coerce.number().default(0),
  tags: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export type ProductInput = z.infer<typeof productSchema>;

export const categorySchema = z.object({
  name: z.string().min(2, "Informe o nome da categoria"),
  slug: z.string().min(2, "Informe o slug"),
  order: z.coerce.number().default(0),
  active: z.boolean().default(true),
});

export type CategoryInput = z.infer<typeof categorySchema>;

export const portfolioSchema = z.object({
  title: z.string().min(2, "Informe o título"),
  description: z.string().optional().nullable(),
  categoryTag: z.enum(["Canecas", "Squeezes", "Camisetas", "Eventos", "Outros"]),
  imageUrl: z.string().min(1, "Envie uma imagem"),
  order: z.coerce.number().default(0),
  active: z.boolean().default(true),
});

export type PortfolioInput = z.infer<typeof portfolioSchema>;

export const settingsSchema = z.object({
  companyName: z.string().min(1),
  slogan: z.string().min(1),
  whatsapp: z.string().min(8),
  email: z.string().email(),
  instagram: z.string().min(1),
  cnpj: z.string().min(1),
  city: z.string().min(1),
  quemSomosText: z.string().min(1),
  logoStoryText: z.string().min(1),
  missaoText: z.string().min(1),
  visaoText: z.string().min(1),
  prazosText: z.string().min(1),
});

export type SettingsInput = z.infer<typeof settingsSchema>;

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
