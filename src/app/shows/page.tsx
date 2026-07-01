"use client";

import { motion } from "framer-motion";
import { Play, Clock, Calendar, Star } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const shows = [
  // 打出未來
  { id: 1, title: "飛越擂台", type: "劇集", episodes: "25集全", schedule: "已完結", desc: "熱血格鬥劇集，挑戰極限的擂台故事。", category: "打出未來" },
  { id: 2, title: "神相李布衣", type: "劇集", episodes: "25集全", schedule: "已完結", desc: "武俠奇情，神相李布衣的江湖傳奇。", category: "打出未來" },
  { id: 3, title: "琴劍恩仇", type: "劇集", episodes: "30集全", schedule: "已完結", desc: "琴音劍影，一段跨越恩怨的武俠故事。", category: "打出未來" },
  { id: 4, title: "風塵三奇俠", type: "劇集", episodes: "19集全", schedule: "已完結", desc: "三位奇俠的江湖冒險，快意恩仇。", category: "打出未來" },
  // 節日推介
  { id: 5, title: "2024第35屆亞洲小姐競選全球大賽", type: "綜藝", episodes: "全場", schedule: "特別節目", desc: "亞洲電視年度盛事，選美舞台綻放光彩。", category: "節日推介" },
  // 經典再現
  { id: 6, title: "經典港劇回顧", type: "劇集", episodes: "全120集", schedule: "每日更新", desc: "重溫ATV經典時刻，回顧港劇黃金年代。", category: "經典再現" },
  // 其他節目
  { id: 7, title: "綜藝大聚會", type: "綜藝", episodes: "每週一期", schedule: "每週五 21:00", desc: "超級綜藝大師同台競技，笑淚交集。", category: "綜藝" },
  { id: 8, title: "新聞直播", type: "新聞", episodes: "每日", schedule: "每日 19:00", desc: "全方位新聞報導，緊貼時事脈動。", category: "新聞" },
];

const types = ["全部", "打出未來", "節日推介", "經典再現", "綜藝", "新聞"];

export default function ShowsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 py-6">
        <div className="mx-auto max-w-[1280px] px-4">
          <h1 className="text-2xl font-black text-atv-dark mb-4">📺 節目列表</h1>

          <div className="flex gap-2 mb-5 overflow-x-auto pb-2">
            {types.map((t) => (
              <button key={t} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${t === "全部" ? "bg-atv-red text-white" : "bg-atv-gray text-atv-dark hover:bg-gray-200"}`}>
                {t}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {shows.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="group cursor-pointer bg-atv-gray rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative aspect-video bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">節目封面</span>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                      <div className="w-12 h-12 bg-atv-red rounded-full flex items-center justify-center">
                        <Play className="w-6 h-6 text-white ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-atv-dark text-white text-[10px] font-bold rounded">{s.type}</div>
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-atv-red text-white text-[10px] font-bold rounded">{s.category}</div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-bold text-atv-dark mb-1 line-clamp-1">{s.title}</h3>
                    <p className="text-xs text-gray-500 mb-2">{s.desc}</p>
                    <div className="flex items-center gap-3 text-[11px] text-gray-400">
                      <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{s.episodes}</span>
                      <span className="flex items-center gap-0.5"><Calendar className="w-3 h-3" />{s.schedule}</span>
                    </div>
                  </div>
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
