"use client";

import { motion } from "framer-motion";
import { Play, Heart, MessageCircle, Share2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const shorts = [
  { id: 1, title: "香港街頭美食探店，這家酒樓太絕了！", author: "吃貨小姐", likes: "12.5萬", comments: "3,200", duration: "0:45" },
  { id: 2, title: "日本藥妝必買清單，主播親測有效！", author: "美妝達人", likes: "8.9萬", comments: "1,800", duration: "1:12" },
  { id: 3, title: "跟著明星學化妝，這個妝容太美了", author: "時尚精", likes: "6.7萬", comments: "950", duration: "0:58" },
  { id: 4, title: "運動達人教你居家鍛煉，每天5分鐘", author: "Fitness Ken", likes: "4.2萬", comments: "2,100", duration: "2:30" },
  { id: 5, title: "香港老字號隱藏菜單，老闆親自推薦", author: "老蔡美食", likes: "9.1萬", comments: "4,500", duration: "1:05" },
  { id: 6, title: "新手化妝必看，這些雷區千萬別踩！", author: "妝容小白", likes: "15.3萬", comments: "6,800", duration: "0:38" },
  { id: 7, title: "這款手機支架超好用，直播必備", author: "大哥軍", likes: "3.5萬", comments: "890", duration: "0:52" },
  { id: 8, title: "韓國街頭時尚，這樣穿搭太美了", author: "時尚Mia", likes: "7.8萬", comments: "2,400", duration: "1:20" },
  { id: 9, title: "一分鐘學會這個妝容技巧", author: "美妞Amy", likes: "22萬", comments: "8,900", duration: "0:55" },
  { id: 10, title: "香港最棒的冰室，夏天必去！", author: "吃貨小姐", likes: "5.6萬", comments: "1,200", duration: "1:30" },
  { id: 11, title: "健身新手入門，這些動作很重要", author: "Fitness Ken", likes: "3.9萬", comments: "1,500", duration: "2:15" },
  { id: 12, title: "日本藥妝必買TOP10", author: "美妝達人", likes: "11萬", comments: "4,100", duration: "3:00" },
];

export default function ShortsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-atv-dark">
      <Header />
      <main className="flex-1 py-6">
        <div className="mx-auto max-w-[1280px] px-4">
          <h1 className="text-2xl font-black text-white mb-5">🎬 短視頻</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {shorts.map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[9/16] bg-gray-700 rounded-xl overflow-hidden mb-2">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">短片 {video.id}</span>
                  </div>
                  <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/60 text-white text-[10px] rounded">{video.duration}</span>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                    <div className="w-12 h-12 bg-atv-red rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-white ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-xs font-bold text-white line-clamp-2">{video.title}</p>
                    <p className="text-[10px] text-gray-300">@{video.author}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-400">
                  <span className="flex items-center gap-0.5"><Heart className="w-3 h-3" />{video.likes}</span>
                  <span className="flex items-center gap-0.5"><MessageCircle className="w-3 h-3" />{video.comments}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
