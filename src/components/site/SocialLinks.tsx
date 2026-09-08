import { companyInfo } from "@/lib/content";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z" />
    </svg>
  );
}

const socials = [
  { name: "Instagram", url: companyInfo.instagramUrl, handle: companyInfo.instagram, Icon: InstagramIcon },
  { name: "TikTok", url: companyInfo.tiktokUrl, handle: companyInfo.tiktok, Icon: TiktokIcon },
];

export function SocialLinks({
  variant = "buttons",
  className = "",
}: {
  variant?: "buttons" | "ghost" | "icons";
  className?: string;
}) {
  if (variant === "icons") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {socials.map(({ name, url, Icon }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Seguir no ${name}`}
            title={`Seguir no ${name}`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-ink)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-coral)] hover:bg-[var(--color-pink-light)] hover:text-[var(--color-coral-dark)]"
          >
            <Icon className="h-[18px] w-[18px]" />
          </a>
        ))}
      </div>
    );
  }

  if (variant === "ghost") {
    return (
      <div className={`flex flex-wrap items-center gap-x-5 gap-y-2 ${className}`}>
        {socials.map(({ name, url, Icon }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-ink)] transition-colors duration-200 hover:text-[var(--color-coral-dark)]"
          >
            <Icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
            Seguir no {name}
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      {socials.map(({ name, url, Icon }) => (
        <a
          key={name}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-ink)]/15 px-6 py-3 text-sm font-semibold text-[var(--color-ink)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-coral)] hover:text-[var(--color-coral-dark)] hover:shadow-[0_10px_24px_-14px_rgba(226,54,79,0.5)] active:translate-y-0"
        >
          <Icon className="h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110" />
          Seguir no {name}
        </a>
      ))}
    </div>
  );
}
