"use client";

const announcements = [
  "⚡ 送30種美妝品！",
  "⚡ ATV影視基地直播，每日不間斷好物推薦！",
  "⚡ 短劇《重返香江》收視破紀錄，全集免費看！",
  "⚡ 加入會員積分，兌換限量商品與紅包！",
  "⚡ 週末閃購活動，整點秒殺低至1折起！",
  "⚡ 新用戶首購享9折優惠！限時",
];

export default function MarqueeBanner() {
  // Duplicate 3x for seamless infinite loop
  const items = [...announcements, ...announcements, ...announcements];

  return (
    <div className="bg-gradient-to-r from-atv-red via-red-700 to-atv-red text-white overflow-hidden py-2.5 relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-atv-red to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-atv-red to-transparent z-10 pointer-events-none" />

      <div className="flex whitespace-nowrap animate-marquee">
        {items.map((text, i) => (
          <span
            key={i}
            className="inline-block mx-8 text-sm font-medium tracking-wide"
          >
            {text}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
}
