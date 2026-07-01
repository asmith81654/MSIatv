import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "亞洲電視 MSI GROUP | ATV",
  description: "亞洲電視 MSI GROUP — 亞洲最大型直播電商平台，集直播購物、短視頻、短劇、互動遊戲於一身。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-HK">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  );
}
