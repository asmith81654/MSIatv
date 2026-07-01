"use client";

import Link from "next/link";
import { WebGLShader } from "@/components/ui/web-gl-shader";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

/**
 * Dark, full-bleed brand CTA band shown near the bottom of the home page.
 * The WebGL shader is confined to this section (relative container), not
 * the whole viewport, so it does not overlay the rest of the white-themed site.
 */
export default function BrandCTASection() {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* Animated shader — sized to this section only */}
      <WebGLShader />

      {/* Darkening overlay for text legibility */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-black/10 to-black/60" />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center justify-center px-6 py-24">
        <div className="my-4 flex items-center justify-center gap-1.5">
          <span className="relative flex h-3 w-3 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
          </span>
          <p className="text-xs font-medium text-red-400">直播進行中 · 24 小時不打烊</p>
        </div>

        <h2 className="mb-3 text-center text-5xl font-black tracking-tighter text-white md:text-7xl">
          亞洲電視 MSI GROUP
        </h2>
        <p className="mb-8 px-4 text-center text-sm text-white/60 md:text-lg">
          直播購物、短視頻、短劇、互動遊戲 —— 亞洲最大型直播電商平台，好戲好物盡在指尖。
        </p>

        <Link href="/live/demo/">
          <LiquidButton className="rounded-full border border-white/30 text-white" size="xl">
            立即進入直播間
          </LiquidButton>
        </Link>
      </div>
    </section>
  );
}
