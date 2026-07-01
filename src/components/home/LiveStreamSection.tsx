"use client";

import { motion } from "framer-motion";
import { Radio, Eye, Heart } from "lucide-react";
import Link from "next/link";

const liveRooms = [
  { id: 1, host: "ATV美妝專區", title: "韓國保養品限時特賣", viewers: "2.3萬", likes: "1.2萬", tag: "美妝" },
  { id: 2, host: "科技達人明哥", title: "最新電子產品開箱", viewers: "1.8萬", likes: "8,500", tag: "科技" },
  { id: 3, host: "ATV生活館", title: "母親節禮品推薦場", viewers: "3.1萬", likes: "2.1萬", tag: "生活" },
  { id: 4, host: "港星直播屋", title: "港劇經典片段放送", viewers: "9,200", likes: "4,300", tag: "影視" },
];

export default function LiveStreamSection() {
  return (
    <section className="py-8 bg-white">
      <div className="mx-auto max-w-[1280px] px-4">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-atv-red" />
            <h2 className="text-xl font-black">正在直播</h2>
            <span className="px-2 py-0.5 bg-red-100 text-atv-red text-xs font-bold rounded-full">
              {liveRooms.length}個房間</span>
          </div>
          <Link href="/live/demo/" className="text-sm text-atv-red font-medium hover:underline">
            查看全部 →</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {liveRooms.map((room, i) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/live/demo/`} className="block group">
                <div className="relative aspect-video bg-atv-gray rounded-xl overflow-hidden mb-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">直播畫面 {room.id}</span>
                  </div>
                  <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 bg-red-600 rounded text-[10px] font-bold text-white">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    LIVE
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold rounded">
                    {room.tag}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="flex items-center gap-3 text-white text-xs">
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{room.viewers}</span>
                      <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{room.likes}</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-sm font-bold text-atv-dark group-hover:text-atv-red transition-colors line-clamp-2">
                  {room.title}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">主播：{room.host}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
