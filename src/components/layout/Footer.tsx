"use client";

import Link from "next/link";
import { Tv, Instagram, Facebook, Youtube, MessageCircle } from "lucide-react";

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/hk_atv/" },
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/asiatvnewssea" },
  { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/atvhongkong" },
  { icon: MessageCircle, label: "WhatsApp", href: "#" },
];

const footerLinks = [
  {
    title: "內容",
    links: [
      { label: "直播購物", href: "/live/demo/" },
      { label: "短視頻", href: "/shorts/" },
      { label: "短劇", href: "/drama/" },
      { label: "節目", href: "/shows/" },
      { label: "新聞", href: "/news/" },
    ],
  },
  {
    title: "互動",
    links: [
      { label: "主播陣容", href: "/hosts/" },
      { label: "遊戲互動", href: "/games/" },
      { label: "活動中心", href: "#" },
      { label: "會員中心", href: "#" },
    ],
  },
  {
    title: "關於",
    links: [
      { label: "關於亞視", href: "#" },
      { label: "聯絡我們", href: "#" },
      { label: "商家入駐", href: "#" },
      { label: "隱私政策", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-atv-dark text-white">
      <div className="mx-auto max-w-[1280px] px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-atv-red rounded-lg flex items-center justify-center">
                <Tv className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-lg font-black">亞洲電視</div>
                <div className="text-[10px] text-gray-400 tracking-widest">MSI GROUP</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4 max-w-sm">
              亞洲電視成立於1957年，是香港第一家電視台。現在ATV影視基地打造亞洲最大型直播電商平台，為您帶來精彩直播、短視頻、短劇及獨家購物體驗。
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-white/10 hover:bg-atv-red rounded-lg flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-bold mb-3">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">© 2026 Asia Television Limited. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-xs text-gray-500 hover:text-gray-300">服務條款</Link>
            <Link href="#" className="text-xs text-gray-500 hover:text-gray-300">隱私政策</Link>
            <Link href="#" className="text-xs text-gray-500 hover:text-gray-300">Cookie 設定</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
