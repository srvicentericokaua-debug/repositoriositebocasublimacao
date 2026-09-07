import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  companyInfo,
  quemSomosText,
  logoStoryText,
  missaoText,
  visaoText,
  valores,
  prazosText,
  formasPagamento,
  entregaInfo,
  categoriasIniciais,
} from "../src/lib/content";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  for (const [index, name] of categoriasIniciais.entries()) {
    const slug = slugify(name);
    await prisma.category.upsert({
      where: { slug },
      update: { name, order: index },
      create: { name, slug, order: index, active: true },
    });
  }

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      companyName: companyInfo.name,
      slogan: companyInfo.slogan,
      whatsapp: companyInfo.whatsappNumber,
      email: companyInfo.email,
      instagram: companyInfo.instagram,
      cnpj: companyInfo.cnpj,
      city: companyInfo.city,
      quemSomosText,
      logoStoryText,
      missaoText,
      visaoText,
      valoresJson: JSON.stringify(valores),
      prazosText,
      pagamentoJson: JSON.stringify(formasPagamento),
      entregaJson: JSON.stringify(entregaInfo),
    },
  });

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  if (adminEmail && adminPasswordHash) {
    await prisma.user.upsert({
      where: { email: adminEmail },
      update: { passwordHash: adminPasswordHash },
      create: {
        email: adminEmail,
        passwordHash: adminPasswordHash,
        name: "Célia Flores",
      },
    });
    console.log(`Usuário admin pronto: ${adminEmail}`);
  } else {
    console.warn(
      "ADMIN_EMAIL/ADMIN_PASSWORD_HASH não definidos em .env — nenhum usuário admin foi criado."
    );
  }

  console.log("Seed concluído: categorias e configurações da empresa.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
