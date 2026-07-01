"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingCart, User, Menu, X, Smartphone } from "lucide-react";

const navItems = [
  { label: "首頁", href: "/" },
  { label: "直播購物", href: "/live/demo/" },
  { label: "短視頻", href: "/shorts/" },
  { label: "短劇", href: "/drama/" },
  { label: "節目", href: "/shows/" },
  { label: "新聞", href: "/news/" },
  { label: "主播", href: "/hosts/" },
  { label: "遊戲", href: "/games/" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[1000] bg-atv-dark text-white">
      {/* Top bar */}
      <div className="bg-atv-red text-white text-center py-1.5 text-xs font-medium">
        🔴 直播中：今晚8點明星帶貨節 — 限時折扣高達99%！
      </div>

      <div className="mx-auto max-w-[1280px] px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/images/atv-logo-official.png"
              alt="亞洲電視"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link href="/product/demo/" className="p-2 hover:bg-white/10 rounded-lg transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-atv-red text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </Link>
            <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-atv-red hover:bg-red-700 rounded-lg text-sm font-medium transition-colors">
              <User className="w-4 h-4" />
              登入
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="pb-3">
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜尋直播、商品、節目、主播..."
                className="flex-1 bg-transparent text-sm text-white placeholder-gray-400 outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-atv-dark border-t border-white/10">
          <div className="mx-auto max-w-[1280px] px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
