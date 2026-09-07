import { companyInfo, googleReviews, type GoogleReview } from "@/lib/content";
import { Reveal } from "./Reveal";

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M23.52 12.27c0-.82-.07-1.42-.22-2.05H12v3.72h6.6c-.13 1.09-.85 2.73-2.45 3.84l-.02.15 3.56 2.76.25.02c2.27-2.1 3.58-5.18 3.58-8.44Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.07 7.94-2.9l-3.78-2.93c-1.01.7-2.37 1.19-4.16 1.19-3.18 0-5.87-2.1-6.83-4.99l-.14.01-3.7 2.87-.05.13C3.26 21.3 7.31 24 12 24Z" />
      <path fill="#FBBC05" d="M5.17 14.37A7.35 7.35 0 0 1 4.8 12c0-.83.14-1.63.36-2.37l-.01-.16-3.75-2.9-.12.06A11.98 11.98 0 0 0 0 12c0 1.93.47 3.76 1.28 5.37l3.89-3Z" />
      <path fill="#EA4335" d="M12 4.75c2.26 0 3.78.97 4.65 1.79l3.39-3.3C17.94 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.28 6.63l3.88 3.01C6.13 6.85 8.82 4.75 12 4.75Z" />
    </svg>
  );
}

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5 text-[var(--color-coral)]" aria-label={`${rating} de 5 estrelas`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill={i < rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1">
          <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.8L10 1.5Z" strokeLinejoin="round" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  const initial = review.name.trim().charAt(0).toUpperCase() || "?";
  return (
    <a
      href={companyInfo.googleReviewsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-[78vw] shrink-0 flex-col gap-3 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-5 shadow-[0_10px_30px_-22px_rgba(36,26,23,0.35)] transition-shadow hover:shadow-[0_14px_34px_-18px_rgba(36,26,23,0.4)] sm:w-72 md:w-80"
    >
      <div className="flex items-center justify-between">
        <Stars rating={review.rating} />
        <GoogleG className="h-4 w-4 shrink-0" />
      </div>
      <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="mt-auto flex items-center gap-3 pt-1">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-pink-light)] text-sm font-semibold text-[var(--color-coral-dark)]">
          {initial}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[var(--color-ink)]">{review.name}</p>
          <p className="text-xs text-[var(--color-ink-soft)]">{review.date} · Google</p>
        </div>
      </div>
    </a>
  );
}

function MarqueeReviewRow({
  reviews,
  direction,
  duration,
}: {
  reviews: GoogleReview[];
  direction: "left" | "right";
  duration: number;
}) {
  const track = [...reviews, ...reviews];
  return (
    <div className="reviews-row overflow-hidden">
      <div
        className="reviews-track flex w-max gap-4"
        style={{ animation: `marquee-${direction} ${duration}s linear infinite` }}
      >
        {track.map((review, i) => (
          <ReviewCard key={`${review.name}-${i}`} review={review} />
        ))}
      </div>
    </div>
  );
}

export function GoogleReviewsSection() {
  return (
    <section className="border-t border-[var(--color-line)] bg-[var(--color-paper)] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-5 text-center md:px-8">
        <Reveal>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-2">
            <Stars rating={5} size={13} />
            <span className="text-sm font-semibold text-[var(--color-ink)]">5,0 no Google</span>
          </div>
          <h2 className="font-[var(--font-display)] text-3xl leading-tight font-semibold text-[var(--color-ink)] md:text-4xl">
            Quem compra, recomenda.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--color-ink-soft)]">
            Veja o que nossos clientes estão falando sobre a Boca Sublimação.
          </p>
          <p className="mt-1 text-xs text-[var(--color-ink-soft)]">Baseado em avaliações de clientes</p>
        </Reveal>
      </div>

      <Reveal variant="fade-up">
        <div className="reviews-fade-mask relative mt-10 flex flex-col gap-4">
          <MarqueeReviewRow reviews={googleReviews} direction="right" duration={42} />
          <MarqueeReviewRow reviews={googleReviews} direction="left" duration={48} />
        </div>
      </Reveal>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center px-5 text-center md:px-8">
        <a
          href={companyInfo.googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-ink)]/15 px-6 py-3 text-sm font-semibold text-[var(--color-ink)] transition-colors hover:border-[var(--color-coral)] hover:text-[var(--color-coral-dark)]"
        >
          <GoogleG className="h-4 w-4" />
          Ver todas as avaliações no Google
        </a>
      </div>
    </section>
  );
}
