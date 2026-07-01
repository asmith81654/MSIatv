"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ChevronRight, Radio, Eye, ShoppingBag } from "lucide-react";
import Link from "next/link";
import ArcLightBackground from "@/components/ui/ArcLightBackground";

const AUTOPLAY_MS = 6000;

const slides = [
  {
    id: 1,
    title: "今晚8點 — 明星帶貨節",
    subtitle: "限時狂歡、萬件好禮0元抽！",
    host: "陳耀聯 x 李志偉",
    viewers: "12.8萬",
    status: "live",
    cta: "立即進入直播間",
  },
  {
    id: 2,
    title: "經典港劇 — 流氓太子",
    subtitle: "ATV經典重溫，20集全集免費看",
    host: "全集免費看",
    viewers: "5.2萬",
    status: "vod",
    cta: "立即觀看",
  },
  {
    id: 3,
    title: "2024亞洲小姐競選 — 全球大賽",
    subtitle: "美麗舞台，光彩綻放，尊貴加冕",
    host: "特別節目",
    viewers: "8.6萬",
    status: "new",
    cta: "觀看精華",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const scope = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const t = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [next]);

  // GSAP: staggered entrance for slide content + autoplay progress bar, re-run on slide change
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-hero-item]");
        gsap.fromTo(
          items,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.08 }
        );
        if (barRef.current) {
          gsap.fromTo(
            barRef.current,
            { scaleX: 0 },
            { scaleX: 1, duration: AUTOPLAY_MS / 1000, ease: "none" }
          );
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-hero-item]", { opacity: 1, y: 0 });
        if (barRef.current) gsap.set(barRef.current, { scaleX: 1 });
      });

      return () => mm.revert();
    },
    { scope, dependencies: [current] }
  );

  const slide = slides[current];

  return (
    <div className="relative w-full overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-4 py-4">
        <div
          ref={scope}
          className="relative w-full aspect-[16/7] sm:aspect-[16/6] lg:aspect-[16/5] rounded-2xl overflow-hidden bg-atv-dark"
        >
          {/* ========== LAYER 0: Arc Light Background ========== */}
          <div className="absolute inset-0 z-0">
            <ArcLightBackground />
          </div>

          {/* ========== LAYER 1: Static gradient overlays ========== */}
          <div className="absolute inset-0 z-[1] pointer-events-none">
            <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-atv-red/15 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent" />
          </div>

          {/* ========== LAYER 2: Text content (GSAP staggered) ========== */}
          <div key={current} className="absolute inset-0 flex items-center z-10">
            <div className="px-6 sm:px-10 lg:px-16 max-w-2xl">
              <div data-hero-item className="flex items-center gap-2 mb-3">
                {slide.status === "live" && (
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-red-600 rounded-full text-xs font-bold">
                    <Radio className="w-3 h-3 animate-pulse" />
                    LIVE
                  </span>
                )}
                {slide.status === "new" && (
                  <span className="px-3 py-1 bg-atv-gold text-atv-dark rounded-full text-xs font-bold">
                    新片上架
                  </span>
                )}
                <span className="flex items-center gap-1 text-xs text-gray-300">
                  <Eye className="w-3.5 h-3.5" />
                  {slide.viewers}觀看
                </span>
              </div>
              <h1
                data-hero-item
                className="font-display text-2xl sm:text-4xl lg:text-5xl text-white mb-2 leading-tight drop-shadow-lg"
              >
                {slide.title}
              </h1>
              <p data-hero-item className="text-sm sm:text-base text-gray-300 mb-1 drop-shadow-md">
                {slide.subtitle}
              </p>
              <p data-hero-item className="text-xs text-gray-400 mb-5">
                {slide.host}
              </p>
              <div data-hero-item>
                <Link
                  href={slide.status === "live" ? "/live/demo/" : slide.status === "new" ? "/shows/" : "/shows/"}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-atv-red hover:bg-red-700 text-white font-bold rounded-xl transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>

          {/* ========== LAYER 3: Controls (arrows + dots + progress) ========== */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <button
              onClick={prev}
              className="pointer-events-auto absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="pointer-events-auto absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${i === current ? "w-6 bg-atv-red" : "w-2 bg-white/40"}`}
                />
              ))}
            </div>

            {/* Autoplay progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
              <div ref={barRef} className="h-full origin-left bg-atv-gold" style={{ transform: "scaleX(0)" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
