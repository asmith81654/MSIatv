"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface StatItem {
  value: number;
  suffix?: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 500, suffix: "萬+", label: "月活觀眾" },
  { value: 1957, suffix: "", label: "始於年份" },
  { value: 3200, suffix: "+", label: "每日直播場次" },
  { value: 99, suffix: "%", label: "最高即時折扣" },
];

/**
 * Brand stat band with GSAP scroll-triggered count-up.
 * Numbers tick from 0 to their target the first time the band scrolls in.
 */
export default function StatStrip() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const nums = el.querySelectorAll<HTMLElement>("[data-num]");

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        nums.forEach((node) => {
          const target = Number(node.dataset.num || "0");
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 80%", once: true },
            onUpdate: () => {
              node.textContent = Math.round(obj.v).toLocaleString("en-US");
            },
          });
        });

        // Divider lines grow in.
        gsap.from(el.querySelectorAll("[data-divider]"), {
          scaleY: 0,
          transformOrigin: "center",
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        nums.forEach((node) => {
          const target = Number(node.dataset.num || "0");
          node.textContent = target.toLocaleString("en-US");
        });
      });
    },
    { scope: root }
  );

  return (
    <section className="relative bg-atv-dark text-white grain overflow-hidden">
      {/* soft gold glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 120% at 50% 0%, rgba(212,168,67,0.18) 0%, transparent 60%)",
        }}
      />
      <div
        ref={root}
        className="relative mx-auto max-w-[1280px] px-4 py-10 grid grid-cols-2 lg:grid-cols-4 gap-y-8"
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={cn(
              "relative flex flex-col items-center text-center px-4",
              i !== 0 && "lg:border-l lg:border-white/10"
            )}
          >
            {i !== 0 && (
              <span
                data-divider
                className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 h-12 w-px bg-white/10"
              />
            )}
            <div className="flex items-baseline font-display text-4xl sm:text-5xl leading-none">
              <span data-num={s.value} className="text-gold-gradient">
                0
              </span>
              <span className="text-gold-gradient">{s.suffix}</span>
            </div>
            <div className="mt-2 text-xs sm:text-sm tracking-wide text-gray-400">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
