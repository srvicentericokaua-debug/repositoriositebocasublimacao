import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = "https://bocasublimacao.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Boca Sublimação | Produtos Personalizados em Sorocaba",
    template: "%s | Boca Sublimação",
  },
  description:
    "Produtos personalizados em Sorocaba/SP. Canecas, camisetas, squeezes, presentes, brindes e muito mais. Personalização com carinho, criatividade e significado.",
  openGraph: {
    title: "Boca Sublimação | Produtos Personalizados em Sorocaba",
    description:
      "Produtos personalizados em Sorocaba/SP. Canecas, camisetas, squeezes, presentes, brindes e muito mais.",
    url: siteUrl,
    siteName: "Boca Sublimação",
    locale: "pt_BR",
    type: "website",
  },
  icons: {
    icon: "/images/logo/logo-boca.png",
  },
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") {
      document.documentElement.setAttribute("data-theme", stored);
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-screen flex-col antialiased">{children}</body>
    </html>
  );
}
