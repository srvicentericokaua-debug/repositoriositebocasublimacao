import Link from "next/link";
import { auth } from "@/lib/auth";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";
import { LogoBadge } from "@/components/site/LogoBadge";

const navLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/produtos", label: "Produtos" },
  { href: "/admin/categorias", label: "Categorias" },
  { href: "/admin/portfolio", label: "Portfólio" },
  { href: "/admin/avaliacoes", label: "Avaliações" },
  { href: "/admin/configuracoes", label: "Configurações" },
];

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="flex min-h-screen bg-[var(--color-cream)]">
      <aside className="hidden w-64 shrink-0 flex-col gap-6 border-r border-[var(--color-line)] bg-white p-6 lg:flex">
        <Link href="/admin" className="flex items-center gap-3">
          <LogoBadge size={40} />
          <span className="font-[var(--font-display)] text-sm font-semibold text-[var(--color-ink)]">
            Painel Admin
          </span>
        </Link>
        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--color-ink-soft)] hover:bg-[var(--color-pink-light)] hover:text-[var(--color-ink)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-3 border-t border-[var(--color-line)] pt-4">
          <span className="text-xs text-[var(--color-ink-soft)]">{session?.user?.email}</span>
          <AdminLogoutButton />
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-[var(--color-line)] bg-white px-5 py-4 lg:hidden">
          <Link href="/admin" className="flex items-center gap-2">
            <LogoBadge size={32} />
            <span className="text-sm font-semibold text-[var(--color-ink)]">Painel Admin</span>
          </Link>
          <AdminLogoutButton />
        </header>
        <nav className="flex gap-2 overflow-x-auto border-b border-[var(--color-line)] bg-white px-5 py-3 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 rounded-full border border-[var(--color-line)] px-3 py-1.5 text-xs font-medium text-[var(--color-ink)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <main className="p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
