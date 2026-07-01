"use client";

import { motion } from "framer-motion";
import { Clock, Eye, TrendingUp } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const news = [
  { id: 1, title: "ATV影視基地正式啟用，打造亞洲最大型直播電商平台", category: "公司新聞", time: "2小時前", views: "12.5萬", hot: true },
  { id: 2, title: "今晚明星帶貨節創下新高，單場銷售額突破12億", category: "直播", time: "4小時前", views: "8.9萬", hot: true },
  { id: 3, title: "短劇《重返香江》收視破紀錄，網友：太好看了！", category: "娛樂", time: "6小時前", views: "6.7萬", hot: false },
  { id: 4, title: "新一批主播加盟ATV，年輕人才加入直播行業", category: "行業", time: "8小時前", views: "4.2萬", hot: false },
  { id: 5, title: "ATV與多個國際品牌達成合作，擴展電商版圖", category: "商業", time: "12小時前", views: "3.1萬", hot: false },
  { id: 6, title: "直播電商行業報告：2026年市場規模預計突破10億", category: "行業", time: "1天前", views: "9.8萬", hot: true },
];

const categories = ["全部", "公司新聞", "直播", "娛樂", "商業", "行業"];

export default function NewsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 py-6">
        <div className="mx-auto max-w-[1280px] px-4">
          <h1 className="text-2xl font-black text-atv-dark mb-4">📰 新聞資訊</h1>

          <div className="flex gap-2 mb-5 overflow-x-auto pb-2">
            {categories.map((c) => (
              <button key={c} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${c === "全部" ? "bg-atv-red text-white" : "bg-atv-gray text-atv-dark hover:bg-gray-200"}`}>
                {c}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {news.map((n, i) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="flex gap-4 p-4 bg-atv-gray rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="w-24 h-24 bg-gray-300 rounded-lg flex-shrink-0 flex items-center justify-center">
                  <span className="text-gray-500 text-xs">圖 {n.id}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-atv-dark text-white text-[10px] font-bold rounded">{n.category}</span>
                    {n.hot && <span className="flex items-center gap-0.5 px-2 py-0.5 bg-atv-red text-white text-[10px] font-bold rounded"><TrendingUp className="w-3 h-3" />熱門</span>}
                  </div>
                  <h3 className="text-sm font-bold text-atv-dark line-clamp-2 mb-1">{n.title}</h3>
                  <div className="flex items-center gap-3 text-[11px] text-gray-400">
                    <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{n.time}</span>
                    <span className="flex items-center gap-0.5"><Eye className="w-3 h-3" />{n.views}</span>
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
