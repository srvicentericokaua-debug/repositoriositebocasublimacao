import Image from "next/image";

const LOGO_ASPECT = 1536 / 1024;

export function LogoBadge({ size = 56 }: { size?: number }) {
  const width = Math.round(size * LOGO_ASPECT);

  return (
    <span className="inline-flex shrink-0 items-center justify-center" style={{ width, height: size }}>
      <Image
        src="/images/logo/logo-boca.png"
        alt="Boca Sublimação"
        width={width}
        height={size}
        className="h-full w-full object-contain"
        priority
        unoptimized
      />
    </span>
  );
}
