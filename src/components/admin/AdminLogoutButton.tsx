"use client";

import { signOut } from "next-auth/react";

export function AdminLogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="rounded-full border border-[var(--color-line)] px-4 py-2 text-xs font-semibold text-[var(--color-ink)] hover:border-[var(--color-coral)] hover:text-[var(--color-coral-dark)]"
    >
      Sair
    </button>
  );
}
