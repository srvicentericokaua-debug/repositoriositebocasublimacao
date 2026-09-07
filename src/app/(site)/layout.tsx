import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloatButton } from "@/components/site/WhatsAppFloatButton";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { PageTransition } from "@/components/site/PageTransition";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SmoothScroll />
      <Header />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <WhatsAppFloatButton />
    </div>
  );
}
