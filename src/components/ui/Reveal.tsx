"use client";

import { useRef, type ReactNode, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface RevealProps {
  children: ReactNode;
  /** Wrapper tag. Default div. */
  as?: ElementType;
  className?: string;
  /** Selector (scoped) for the elements to stagger in. Default: direct children. */
  stagger?: number;
  /** Starting Y offset in px. */
  y?: number;
  /** Delay before the batch starts. */
  delay?: number;
  /** Scroll start position. Default "top 85%". */
  start?: string;
}

/**
 * Scroll-triggered entrance. Reveals its children with a staggered
 * fade + rise the first time the block enters the viewport.
 * Honors prefers-reduced-motion (renders content statically).
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className,
  stagger = 0.09,
  y = 28,
  delay = 0,
  start = "top 85%",
}: RevealProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const targets = el.children.length ? Array.from(el.children) : [el];

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(targets, { opacity: 0, y });
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          delay,
          ease: "power3.out",
          stagger,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        });
      });

      // Reduced motion: ensure everything is simply visible.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(targets, { opacity: 1, y: 0 });
      });
    },
    { scope: root }
  );

  return (
    <Tag ref={root} className={className}>
      {children}
    </Tag>
  );
}
