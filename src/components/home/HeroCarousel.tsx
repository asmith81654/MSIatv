"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ChevronRight, Radio, Eye, ShoppingBag, Sparkles } from "lucide-react";
import Link from "next/link";
import ArcLightBackground from "@/components/ui/ArcLightBackground";

const AUTOPLAY_MS = 6000;

const slides = [
  {
    id: 1,
    kicker: "今晚 8:00 · 黃金檔直播",
    title: "明星帶貨節",
    subtitle: "限時狂歡、萬件好禮 0 元抽，全城矚目的購物盛典。",
    host: "陳耀聯 × 李志偉",
    viewers: "12.8萬",
    status: "live",
    cta: "立即進入直播間",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=2400&q=80",
  },
  {
    id: 2,
    kicker: "ATV 經典重溫",
    title: "流氓太子",
    subtitle: "港劇黃金年代，20 集全集免費放送，經典再現。",
    host: "全集免費看",
    viewers: "5.2萬",
    status: "vod",
    cta: "立即觀看",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=2400&q=80",
  },
  {
    id: 3,
    kicker: "2024 全球大賽 · 特別節目",
    title: "亞洲小姐競選",
    subtitle: "美麗舞台，光彩綻放，見證尊貴加冕的璀璨一刻。",
    host: "特別節目",
    viewers: "8.6萬",
    status: "new",
    cta: "觀看精華",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2400&q=80",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const scope = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

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
          { opacity: 0, y: 40, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.1,
          }
        );
        if (barRef.current) {
          gsap.fromTo(
            barRef.current,
            { scaleX: 0 },
            { scaleX: 1, duration: AUTOPLAY_MS / 1000, ease: "none" }
          );
        }
        // Ken Burns: slow zoom/pan on the background image
        if (imgRef.current) {
          gsap.fromTo(
            imgRef.current,
            { scale: 1.05, xPercent: 0, opacity: 0 },
            {
              scale: 1.16,
              xPercent: -2,
              opacity: 1,
              duration: AUTOPLAY_MS / 1000 + 1,
              ease: "none",
            }
          );
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-hero-item]", { opacity: 1, y: 0, filter: "blur(0px)" });
        if (barRef.current) gsap.set(barRef.current, { scaleX: 1 });
        if (imgRef.current) gsap.set(imgRef.current, { scale: 1.05, opacity: 1 });
      });

      return () => mm.revert();
    },
    { scope, dependencies: [current] }
  );

  const slide = slides[current];

  return (
    <section
      ref={scope}
      className="relative w-full min-h-[88vh] lg:h-screen lg:max-h-[960px] overflow-hidden bg-atv-dark grain"
    >
      {/* ========== LAYER 0: Arc Light Background (full bleed) ========== */}
      <div className="absolute inset-0 z-0">
        <ArcLightBackground />
      </div>

      {/* ========== LAYER 0.5: Slide background image (Ken Burns) ========== */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
        <div
          key={current}
          ref={imgRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.image})` }}
        />
        {/* darken image so text stays readable and shader glow blends */}
        <div className="absolute inset-0 bg-atv-dark/45 mix-blend-multiply" />
      </div>

      {/* ========== LAYER 1: Cinematic gradient overlays ========== */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-atv-dark via-atv-dark/40 to-atv-dark/70" />
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-atv-red/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
        <div className="absolute -top-1/4 left-1/4 h-[60vh] w-[60vh] rounded-full bg-atv-gold/10 blur-[120px]" />
      </div>

      {/* ========== LAYER 2: Text content (GSAP staggered) ========== */}
      <div className="relative z-10 mx-auto flex h-full min-h-[88vh] lg:min-h-0 max-w-[1400px] items-center px-6 sm:px-10 lg:px-16">
        <div key={current} className="max-w-3xl">
          {/* Status + kicker */}
          <div data-hero-item className="mb-6 flex flex-wrap items-center gap-3">
            {slide.status === "live" && (
              <span className="flex items-center gap-1.5 rounded-full bg-red-600 px-3.5 py-1.5 text-xs font-bold tracking-wide">
                <Radio className="h-3 w-3 animate-pulse" />
                LIVE
              </span>
            )}
            {slide.status === "new" && (
              <span className="flex items-center gap-1.5 rounded-full bg-atv-gold px-3.5 py-1.5 text-xs font-bold text-atv-dark">
                <Sparkles className="h-3 w-3" />
                新片上架
              </span>
            )}
            <span className="text-gold-gradient text-sm font-semibold uppercase tracking-[0.25em]">
              {slide.kicker}
            </span>
          </div>

          {/* Giant title */}
          <h1
            data-hero-item
            className="font-display text-5xl leading-[0.95] text-white drop-shadow-2xl sm:text-7xl lg:text-8xl xl:text-[7.5rem]"
          >
            {slide.title}
          </h1>

          {/* Gold rule */}
          <div data-hero-item className="my-6 h-[3px] w-24 rounded-full bg-gradient-to-r from-atv-gold to-transparent" />

          {/* Subtitle */}
          <p
            data-hero-item
            className="max-w-xl text-base leading-relaxed text-gray-300 drop-shadow-md sm:text-lg lg:text-xl"
          >
            {slide.subtitle}
          </p>

          {/* Meta row */}
          <div data-hero-item className="mt-5 flex items-center gap-5 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <Eye className="h-4 w-4 text-atv-gold" />
              <span className="font-semibold text-white">{slide.viewers}</span> 觀看中
            </span>
            <span className="h-4 w-px bg-white/20" />
            <span>{slide.host}</span>
          </div>

          {/* CTA */}
          <div data-hero-item className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href={slide.status === "live" ? "/live/demo/" : "/shows/"}
              className="group inline-flex items-center gap-2.5 rounded-xl bg-atv-red px-8 py-4 text-base font-bold text-white shadow-lg shadow-atv-red/30 transition-all hover:bg-red-700 hover:shadow-xl hover:shadow-atv-red/40 hover:-translate-y-0.5"
            >
              <ShoppingBag className="h-5 w-5 transition-transform group-hover:scale-110" />
              {slide.cta}
            </Link>
            <Link
              href="/shows/"
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-7 py-4 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:border-atv-gold hover:text-atv-gold"
            >
              探索全部節目
            </Link>
          </div>
        </div>
      </div>

      {/* ========== LAYER 3: Controls (arrows + dots + progress) ========== */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <button
          onClick={prev}
          aria-label="上一張"
          className="pointer-events-auto absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/70 sm:flex"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={next}
          aria-label="下一張"
          className="pointer-events-auto absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/70 sm:flex"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slide index dots + numbering */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`切換至第 ${i + 1} 張`}
              className={`h-2 rounded-full transition-all ${i === current ? "w-8 bg-atv-red" : "w-2 bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>

        {/* Autoplay progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
          <div ref={barRef} className="h-full origin-left bg-atv-gold" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </section>
  );
}
