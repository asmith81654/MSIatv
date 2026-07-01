"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface SectionHeadingProps {
  /** Small kicker above the title, e.g. "LIVE COMMERCE". */
  kicker?: string;
  title: ReactNode;
  /** Optional right-aligned action (e.g. a "view all" link). */
  action?: ReactNode;
  /** Dark section? Switches text colors. */
  dark?: boolean;
  className?: string;
}

/**
 * Editorial section heading with a serif display title, a gold kicker,
 * and a gold underline that sweeps in on scroll (GSAP ScrollTrigger).
 * Replaces the plain "text-xl font-black" headings across the home page.
 */
export default function SectionHeading({
  kicker,
  title,
  action,
  dark = false,
  className,
}: SectionHeadingProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const rule = el.querySelector<HTMLElement>("[data-rule]");
      const words = el.querySelectorAll<HTMLElement>("[data-heading] > *");

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
        if (words.length) {
          gsap.set(words, { yPercent: 120, opacity: 0 });
          tl.to(words, {
            yPercent: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
          });
        }
        if (rule) {
          gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
          tl.to(rule, { scaleX: 1, duration: 0.6, ease: "power2.out" }, "-=0.3");
        }
      });
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      className={cn("flex items-end justify-between gap-4 mb-6", className)}
    >
      <div>
        {kicker && (
          <div className="mb-1.5 text-[11px] font-bold tracking-[0.25em] uppercase text-gold-gradient">
            {kicker}
          </div>
        )}
        <h2
          data-heading
          className={cn(
            "font-display text-2xl sm:text-3xl leading-none overflow-hidden",
            dark ? "text-white" : "text-atv-dark"
          )}
        >
          {/* wrap in a span so the clip-reveal has something to translate */}
          <span className="inline-block">{title}</span>
        </h2>
        <div className="mt-3 h-[3px] w-16 rounded-full rule-gold" data-rule />
      </div>
      {action && <div className="shrink-0 pb-1">{action}</div>}
    </div>
  );
}
