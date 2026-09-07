import Image from "next/image";

export function AmbientVideo({
  src,
  transparentSrc,
  poster,
  alt,
  className,
}: {
  src: string;
  transparentSrc?: string;
  poster: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <video
        className="ambient-video h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-hidden="true"
      >
        {transparentSrc && <source src={transparentSrc} type="video/webm" />}
        <source src={src} type="video/mp4" />
      </video>
      <div className="ambient-video-fallback relative hidden h-full w-full">
        <Image src={poster} alt={alt} fill sizes="100vw" className="object-cover" />
      </div>
    </div>
  );
}
