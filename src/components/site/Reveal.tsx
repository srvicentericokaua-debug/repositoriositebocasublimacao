"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Variant = "fade-up" | "slide-left" | "slide-right" | "scale-up" | "clip-reveal";

const variants: Record<Variant, gsap.TweenVars> = {
  "fade-up": { y: 46, opacity: 0 },
  "slide-left": { x: -70, opacity: 0 },
  "slide-right": { x: 70, opacity: 0 },
  "scale-up": { scale: 0.9, opacity: 0 },
  "clip-reveal": { clipPath: "inset(100% 0 0 0)", opacity: 0 },
};

export function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      gsap.set(el, { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        variants[variant],
        {
          y: 0,
          x: 0,
          scale: 1,
          opacity: 1,
          clipPath: "inset(0% 0 0 0)",
          duration: 0.9,
          delay,
          ease: variant === "clip-reveal" ? "power4.inOut" : "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [variant, delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
