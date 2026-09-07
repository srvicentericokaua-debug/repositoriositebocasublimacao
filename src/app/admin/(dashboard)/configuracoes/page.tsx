import { getSiteSettings } from "@/lib/settings";
import { updateSettings } from "./actions";

export default async function ConfiguracoesPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const { success } = await searchParams;
  const settings = await getSiteSettings();
  const valoresText = settings.valores.map((v) => `${v.title}\n${v.text}`).join("\n\n");

  return (
    <div className="max-w-3xl">
      <h1 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
        Configurações da empresa
      </h1>
      {success && (
        <p className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">{success.replace(/\+/g, " ")}</p>
      )}

      <form action={updateSettings} className="mt-6 flex flex-col gap-6">
        <div className="grid gap-4 rounded-2xl border border-[var(--color-line)] bg-white p-5 sm:grid-cols-2">
          <Field label="Nome da empresa" name="companyName" defaultValue={settings.companyName} />
          <Field label="Slogan" name="slogan" defaultValue={settings.slogan} />
          <Field label="WhatsApp (só números, com DDI)" name="whatsapp" defaultValue={settings.whatsapp} />
          <Field label="E-mail" name="email" defaultValue={settings.email} />
          <Field label="Instagram" name="instagram" defaultValue={settings.instagram} />
          <Field label="CNPJ" name="cnpj" defaultValue={settings.cnpj} />
          <Field label="Cidade" name="city" defaultValue={settings.city} />
        </div>

        <TextAreaField label="Texto Quem Somos" name="quemSomosText" defaultValue={settings.quemSomosText} rows={10} />
        <TextAreaField label="História da logo" name="logoStoryText" defaultValue={settings.logoStoryText} rows={6} />
        <TextAreaField label="Missão" name="missaoText" defaultValue={settings.missaoText} rows={5} />
        <TextAreaField label="Visão" name="visaoText" defaultValue={settings.visaoText} rows={5} />
        <TextAreaField
          label="Valores (título na primeira linha de cada bloco, texto na linha seguinte, blocos separados por linha em branco)"
          name="valoresText"
          defaultValue={valoresText}
          rows={12}
        />
        <TextAreaField label="Prazo de produção" name="prazosText" defaultValue={settings.prazosText} rows={3} />
        <TextAreaField
          label="Formas de pagamento (uma por linha)"
          name="pagamentoText"
          defaultValue={settings.formasPagamento.join("\n")}
          rows={4}
        />
        <TextAreaField
          label="Entrega e retirada (uma informação por linha)"
          name="entregaText"
          defaultValue={settings.entrega.join("\n")}
          rows={4}
        />

        <button type="submit" className="self-start rounded-full bg-[var(--color-coral)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--color-coral-dark)]">
          Salvar configurações
        </button>
      </form>
    </div>
  );
}

function Field({ label, name, defaultValue }: { label: string; name: string; defaultValue: string }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-[var(--color-ink)]">{label}</label>
      <input name={name} defaultValue={defaultValue} className="w-full rounded-xl border border-[var(--color-line)] px-3 py-2.5 text-sm" />
    </div>
  );
}

function TextAreaField({
  label,
  name,
  defaultValue,
  rows,
}: {
  label: string;
  name: string;
  defaultValue: string;
  rows: number;
}) {
  return (
    <div className="rounded-2xl border border-[var(--color-line)] bg-white p-5">
      <label className="mb-1 block text-xs font-semibold text-[var(--color-ink)]">{label}</label>
      <textarea name={name} defaultValue={defaultValue} rows={rows} className="w-full rounded-xl border border-[var(--color-line)] px-3 py-2.5 text-sm" />
    </div>
  );
}
