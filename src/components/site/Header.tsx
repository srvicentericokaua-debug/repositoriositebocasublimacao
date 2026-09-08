"use client";

import Link from "next/link";
import { useState } from "react";
import { LogoBadge } from "./LogoBadge";
import { buildWhatsAppLink, whatsappMessages } from "@/lib/whatsapp";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/quem-somos", label: "Quem Somos" },
  { href: "/produtos", label: "Produtos" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/como-funciona", label: "Como Funciona" },
  { href: "/personalizacao", label: "Personalização" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line)] bg-[var(--color-cream)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <Link href="/" className="flex shrink-0 items-center" onClick={() => setOpen(false)}>
          <LogoBadge size={68} />
        </Link>

        <nav className="hidden items-center gap-5 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium whitespace-nowrap text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-coral)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <ThemeToggle className="hidden h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-coral)] hover:text-[var(--color-coral-dark)] sm:inline-flex" />
          <a
            href={buildWhatsAppLink(whatsappMessages.home)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta-3d hidden items-center justify-center rounded-full bg-[var(--color-coral)] px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-[var(--color-coral-dark)] sm:inline-flex"
          >
            Fale conosco
          </a>
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-ink)] xl:hidden"
          >
            <span className="sr-only">Menu</span>
            {open ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-[var(--color-line)] bg-[var(--color-cream)] px-5 py-4 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-base font-medium text-[var(--color-ink)] hover:bg-[var(--color-pink-light)]"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={buildWhatsAppLink(whatsappMessages.home)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta-3d mt-2 inline-flex items-center justify-center rounded-full bg-[var(--color-coral)] px-5 py-3 text-sm font-semibold text-white"
          >
            Fale conosco no WhatsApp
          </a>
          <div className="mt-2 flex items-center justify-between rounded-lg px-3 py-2">
            <span className="text-sm font-medium text-[var(--color-ink)]">Tema</span>
            <ThemeToggle />
          </div>
        </nav>
      )}
    </header>
  );
}
