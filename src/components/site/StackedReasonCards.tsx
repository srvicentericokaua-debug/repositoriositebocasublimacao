"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { destaqueIcons } from "./icons";

gsap.registerPlugin(ScrollTrigger);

type ReasonCard = { icon: string; title: string; text: string };

export function StackedReasonCards({ items }: { items: ReasonCard[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const cards = cardRefs.current.filter((el): el is HTMLDivElement => el !== null);
    if (!container || cards.length === 0) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(cards, { clearProps: "all" });
        return;
      }

      const frontIndex = Math.floor(cards.length / 2);
      const frontRect = cards[frontIndex].getBoundingClientRect();

      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const dx = frontRect.left - rect.left;
        const dy = frontRect.top - rect.top;
        const side = i < frontIndex ? -1 : i > frontIndex ? 1 : 0;
        const depth = Math.abs(i - frontIndex);

        gsap.set(card, {
          x: dx,
          y: dy,
          z: -depth * 70,
          rotateY: side * 38,
          scale: 1 - depth * 0.1,
          opacity: depth === 0 ? 1 : 0.7,
          zIndex: 10 - depth,
        });

        gsap.to(card, {
          x: 0,
          y: 0,
          z: 0,
          rotateY: 0,
          scale: 1,
          opacity: 1,
          duration: 1.1,
          delay: depth * 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      });
    }, container);

    return () => ctx.revert();
  }, [items]);

  return (
    <div ref={containerRef} className="mx-auto max-w-6xl px-5 md:px-8" style={{ perspective: "1600px" }}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((item, i) => {
          const Icon = destaqueIcons[item.icon as keyof typeof destaqueIcons];
          return (
            <div
              key={item.title}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="flex flex-col gap-4 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 shadow-[0_20px_50px_-30px_rgba(36,26,23,0.35)]"
              style={{ willChange: "transform" }}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-pink-light)] text-[var(--color-coral-dark)]">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="font-[var(--font-display)] text-base font-semibold text-[var(--color-ink)]">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">{item.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
