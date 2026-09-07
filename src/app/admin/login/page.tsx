"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { LogoBadge } from "@/components/site/LogoBadge";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", { email, password, redirect: false });

    if (result?.error) {
      setError("E-mail ou senha inválidos.");
      setLoading(false);
      return;
    }

    router.push(searchParams.get("callbackUrl") || "/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-cream)] px-5">
      <div className="w-full max-w-sm rounded-3xl border border-[var(--color-line)] bg-white p-8 shadow-[0_20px_50px_-24px_rgba(36,26,23,0.3)]">
        <div className="flex justify-center">
          <LogoBadge size={72} />
        </div>
        <h1 className="mt-6 text-center font-[var(--font-display)] text-xl font-semibold text-[var(--color-ink)]">
          Painel Boca Sublimação
        </h1>
        <p className="mt-1 text-center text-sm text-[var(--color-ink-soft)]">
          Entre com seu e-mail e senha
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-xs font-semibold text-[var(--color-ink)]">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-[var(--color-line)] px-4 py-2.5 text-sm outline-none focus-visible:border-[var(--color-coral)]"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-xs font-semibold text-[var(--color-ink)]">
              Senha
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-[var(--color-line)] px-4 py-2.5 text-sm outline-none focus-visible:border-[var(--color-coral)]"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-[var(--color-coral)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--color-coral-dark)] disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
