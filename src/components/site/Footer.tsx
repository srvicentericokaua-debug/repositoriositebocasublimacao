import Link from "next/link";
import { LogoBadge } from "./LogoBadge";
import { companyInfo } from "@/lib/content";

const footerLinks = [
  { href: "/", label: "Início" },
  { href: "/quem-somos", label: "Quem Somos" },
  { href: "/produtos", label: "Produtos" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/como-funciona", label: "Como Funciona" },
  { href: "/contato", label: "Contato" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:px-8 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <LogoBadge size={44} />
            <span className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-ink)]">
              {companyInfo.name}
            </span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-[var(--color-ink-soft)]">
            {companyInfo.slogan}
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold tracking-[0.15em] text-[var(--color-ink-soft)] uppercase">
            Navegação
          </h3>
          <ul className="flex flex-col gap-2.5">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-[var(--color-ink)] transition-colors hover:text-[var(--color-coral)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold tracking-[0.15em] text-[var(--color-ink-soft)] uppercase">
            Contato
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm text-[var(--color-ink)]">
            <li>WhatsApp: {companyInfo.whatsappDisplay}</li>
            <li>{companyInfo.email}</li>
            <li>
              <a
                href={companyInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-coral)]"
              >
                {companyInfo.instagram}
              </a>
            </li>
            <li>{companyInfo.city}</li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-[var(--color-line)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-[var(--color-ink-soft)] md:flex-row md:items-center md:justify-between md:px-8">
          <span>© {new Date().getFullYear()} {companyInfo.name}. Todos os direitos reservados.</span>
          <span>CNPJ: {companyInfo.cnpj}</span>
        </div>
        <Link
          href="/admin"
          aria-label="Acesso administrativo"
          title="Acesso administrativo"
          className="absolute right-4 bottom-4 flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-ink-soft)]/40 transition-colors hover:bg-[var(--color-pink-light)] hover:text-[var(--color-coral-dark)] md:right-6"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="4" y="11" width="16" height="9" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" />
          </svg>
        </Link>
      </div>
    </footer>
  );
}
