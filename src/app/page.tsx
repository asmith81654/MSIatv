"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroCarousel from "@/components/home/HeroCarousel";
import LiveStreamSection from "@/components/home/LiveStreamSection";
import ShortVideoSection from "@/components/home/ShortVideoSection";
import ProductGrid from "@/components/home/ProductGrid";
import DramaSection from "@/components/home/DramaSection";
import GamesSection from "@/components/home/GamesSection";
import HostSection from "@/components/home/HostSection";
import MarqueeBanner from "@/components/home/MarqueeBanner";
import BrandCTASection from "@/components/home/BrandCTASection";
import ProgramShowcase from "@/components/home/ProgramShowcase";
import StatStrip from "@/components/home/StatStrip";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <MarqueeBanner />
      <main className="flex-1">
        <HeroCarousel />
        <StatStrip />
        <LiveStreamSection />
        <ShortVideoSection />
        <ProductGrid />
        <DramaSection />
        <ProgramShowcase />
        <GamesSection />
        <HostSection />
      </main>
      <BrandCTASection />
      <Footer />
    </div>
  );
}
