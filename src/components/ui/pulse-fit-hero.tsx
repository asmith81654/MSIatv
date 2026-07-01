"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavigationItem {
  label: string;
  hasDropdown?: boolean;
  onClick?: () => void;
}

interface ProgramCard {
  image: string;
  category: string;
  title: string;
  onClick?: () => void;
}

interface PulseFitHeroProps {
  logo?: string;
  navigation?: NavigationItem[];
  ctaButton?: {
    label: string;
    onClick: () => void;
  };
  title: string;
  subtitle: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  disclaimer?: string;
  socialProof?: {
    avatars: string[];
    text: string;
  };
  programs?: ProgramCard[];
  className?: string;
  children?: React.ReactNode;
  /** Show the built-in logo/nav header. Off when the page already has one. */
  showHeader?: boolean;
  /** Color theme. "light" is the original palette; "dark" suits dark sites. */
  variant?: "light" | "dark";
  /** Override min-height. Defaults to full screen for hero, auto for embedded. */
  fullScreen?: boolean;
}

const PALETTE = {
  light: {
    background: "linear-gradient(180deg, #E8F0FF 0%, #F5F9FF 50%, #FFFFFF 100%)",
    edge: "#FFFFFF",
    logo: "#1a1a1a",
    nav: "#4a5568",
    title: "#1a1a1a",
    subtitle: "#4a5568",
    disclaimer: "#718096",
    proof: "#4a5568",
    primaryBg: "#1a1a1a",
    primaryText: "#FFFFFF",
    secondaryBorder: "#cbd5e0",
    secondaryText: "#1a1a1a",
    ctaBg: "#FFFFFF",
    ctaBorder: "#e2e8f0",
    ctaText: "#1a1a1a",
  },
  dark: {
    background: "linear-gradient(180deg, #141414 0%, #1A1A1A 55%, #202020 100%)",
    edge: "#141414",
    logo: "#FFFFFF",
    nav: "#cbd5e0",
    title: "#FFFFFF",
    subtitle: "#9ca3af",
    disclaimer: "#6b7280",
    proof: "#cbd5e0",
    primaryBg: "#E60012",
    primaryText: "#FFFFFF",
    secondaryBorder: "rgba(255,255,255,0.25)",
    secondaryText: "#FFFFFF",
    ctaBg: "rgba(255,255,255,0.06)",
    ctaBorder: "rgba(255,255,255,0.2)",
    ctaText: "#FFFFFF",
  },
} as const;

export function PulseFitHero({
  logo = "PulseFit",
  navigation = [
    { label: "Features" },
    { label: "Programs", hasDropdown: true },
    { label: "Testimonials" },
    { label: "Pricing" },
    { label: "Contact" },
  ],
  ctaButton,
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  disclaimer,
  socialProof,
  programs = [],
  className,
  children,
  showHeader = true,
  variant = "light",
  fullScreen = true,
}: PulseFitHeroProps) {
  const c = PALETTE[variant];
  // Card pitch: 356px width + 24px gap.
  const CARD_PITCH = 380;

  return (
    <section
      className={cn(
        "relative w-full flex flex-col overflow-hidden",
        fullScreen && "min-h-screen",
        className
      )}
      style={{ background: c.background }}
      aria-label="節目巡禮"
    >
      {/* Header */}
      {showHeader && (
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-20 flex flex-row justify-between items-center px-8 lg:px-16"
          style={{ paddingTop: "32px", paddingBottom: "32px" }}
        >
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "24px",
              color: c.logo,
            }}
          >
            {logo}
          </div>

          <nav className="hidden lg:flex flex-row items-center gap-8" aria-label="Main navigation">
            {navigation.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="flex flex-row items-center gap-1 hover:opacity-70 transition-opacity"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: 400,
                  color: c.nav,
                }}
              >
                {item.label}
                {item.hasDropdown && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            ))}
          </nav>

          {ctaButton && (
            <button
              onClick={ctaButton.onClick}
              className="px-6 py-3 rounded-full transition-all hover:scale-105"
              style={{
                background: c.ctaBg,
                border: `1px solid ${c.ctaBorder}`,
                fontFamily: "Inter, sans-serif",
                fontSize: "16px",
                fontWeight: 500,
                color: c.ctaText,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
              }}
            >
              {ctaButton.label}
            </button>
          )}
        </motion.header>
      )}

      {/* Main Content */}
      {children ? (
        <div className="relative z-10 flex-1 flex items-center justify-center w-full">
          {children}
        </div>
      ) : (
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pt-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col items-center text-center max-w-4xl"
            style={{ gap: "28px" }}
          >
            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(32px, 6vw, 64px)",
                lineHeight: "1.1",
                color: c.title,
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </h2>

            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(15px, 2vw, 19px)",
                lineHeight: "1.6",
                color: c.subtitle,
                maxWidth: "600px",
              }}
            >
              {subtitle}
            </p>

            {(primaryAction || secondaryAction) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-4"
              >
                {primaryAction && (
                  <button
                    onClick={primaryAction.onClick}
                    className="flex flex-row items-center gap-2 px-8 py-4 rounded-full transition-all hover:scale-105"
                    style={{
                      background: c.primaryBg,
                      fontFamily: "Inter, sans-serif",
                      fontSize: "18px",
                      fontWeight: 500,
                      color: c.primaryText,
                      boxShadow: "0 4px 16px rgba(230, 0, 18, 0.25)",
                    }}
                  >
                    {primaryAction.label}
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M7 10H13M13 10L10 7M13 10L10 13"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}

                {secondaryAction && (
                  <button
                    onClick={secondaryAction.onClick}
                    className="px-8 py-4 rounded-full transition-all hover:scale-105"
                    style={{
                      background: "transparent",
                      border: `1px solid ${c.secondaryBorder}`,
                      fontFamily: "Inter, sans-serif",
                      fontSize: "18px",
                      fontWeight: 500,
                      color: c.secondaryText,
                    }}
                  >
                    {secondaryAction.label}
                  </button>
                )}
              </motion.div>
            )}

            {disclaimer && (
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  fontWeight: 400,
                  color: c.disclaimer,
                  fontStyle: "italic",
                }}
              >
                {disclaimer}
              </motion.p>
            )}

            {socialProof && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-row items-center gap-3"
              >
                <div className="flex flex-row -space-x-2">
                  {socialProof.avatars.map((avatar, index) => (
                    <img
                      key={index}
                      src={avatar}
                      alt={`觀眾 ${index + 1}`}
                      className="rounded-full border-2 border-white"
                      style={{ width: "40px", height: "40px", objectFit: "cover" }}
                    />
                  ))}
                </div>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: c.proof,
                  }}
                >
                  {socialProof.text}
                </span>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}

      {/* Program Cards Carousel */}
      {programs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative z-10 w-full overflow-hidden"
          style={{ paddingTop: "60px", paddingBottom: "60px" }}
        >
          {/* Gradient edge fades */}
          <div
            className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
            style={{
              width: "150px",
              background: `linear-gradient(90deg, ${c.edge} 0%, rgba(0,0,0,0) 100%)`,
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
            style={{
              width: "150px",
              background: `linear-gradient(270deg, ${c.edge} 0%, rgba(0,0,0,0) 100%)`,
            }}
          />

          {/* Scrolling Container — one full set width = programs.length * CARD_PITCH */}
          <motion.div
            className="flex items-center"
            animate={{ x: [0, -(programs.length * CARD_PITCH)] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: programs.length * 5,
                ease: "linear",
              },
            }}
            style={{ gap: "24px", paddingLeft: "24px" }}
          >
            {[...programs, ...programs].map((program, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.3 }}
                onClick={program.onClick}
                className="flex-shrink-0 cursor-pointer relative overflow-hidden"
                style={{
                  width: "356px",
                  height: "480px",
                  borderRadius: "24px",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.35)",
                }}
              >
                <img
                  src={program.image}
                  alt={program.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 100%)",
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-6"
                  style={{ display: "flex", flexDirection: "column", gap: "8px" }}
                >
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#D4A843",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {program.category}
                  </span>
                  <h3
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "24px",
                      fontWeight: 600,
                      color: "#FFFFFF",
                      lineHeight: "1.3",
                    }}
                  >
                    {program.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
