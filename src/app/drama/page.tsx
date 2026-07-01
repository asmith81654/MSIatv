"use client";

import { motion } from "framer-motion";
import { Play, Star, Clock } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const allDramas = [
  // 正在熱播
  { id: 101, title: "流氓太子", episode: "20集全", rating: "9.1", tag: "熱播", category: "正在熱播", cover: "" },
  { id: 102, title: "蝴蝶血", episode: "30集全", rating: "8.8", tag: "熱播", category: "正在熱播", cover: "" },
  { id: 103, title: "住家男人", episode: "全劇集", rating: "8.6", tag: "熱播", category: "正在熱播", cover: "" },
  { id: 104, title: "飛越擂台", episode: "25集全", rating: "8.7", tag: "熱播", category: "正在熱播", cover: "" },
  // 經典再現
  { id: 1, title: "影城大亨", episode: "全劇集", rating: "9.0", tag: "經典", category: "經典再現", cover: "/images/dramas/movie-mogul.webp" },
  { id: 2, title: "爸爸兩邊走", episode: "全劇集", rating: "8.9", tag: "經典", category: "經典再現", cover: "/images/dramas/dad-on-both-sides.webp" },
  { id: 3, title: "皇家檔案（粵語版）", episode: "32集全", rating: "8.8", tag: "經典", category: "經典再現", cover: "" },
  { id: 4, title: "流氓太子", episode: "20集全", rating: "9.1", tag: "經典", category: "經典再現", cover: "" },
  { id: 5, title: "飛越擂台", episode: "25集全", rating: "8.6", tag: "經典", category: "經典再現", cover: "" },
  { id: 6, title: "神相李布衣", episode: "25集全", rating: "8.9", tag: "經典", category: "經典再現", cover: "" },
  { id: 7, title: "琴劍恩仇", episode: "30集全", rating: "8.4", tag: "經典", category: "經典再現", cover: "" },
  { id: 8, title: "風塵三奇俠", episode: "19集全", rating: "8.7", tag: "經典", category: "經典再現", cover: "" },
  // 追劇停不了
  { id: 9, title: "江少的契约夫人", episode: "82集全", rating: "9.0", tag: "熱播", category: "追劇停不了", cover: "" },
  { id: 10, title: "氪金娇妻又凶又甜", episode: "100集", rating: "8.9", tag: "連載", category: "追劇停不了", cover: "" },
  { id: 11, title: "民间异闻录", episode: "76集全", rating: "8.6", tag: "熱播", category: "追劇停不了", cover: "" },
  { id: 12, title: "妻子的复仇", episode: "101集全", rating: "9.2", tag: "熱播", category: "追劇停不了", cover: "" },
  // 都市小品
  { id: 13, title: "快活谷", episode: "60集全", rating: "8.4", tag: "都市", category: "都市小品", cover: "" },
  { id: 14, title: "老婆愈老愈可愛", episode: "20集全", rating: "8.7", tag: "都市", category: "都市小品", cover: "" },
  { id: 15, title: "天使危機", episode: "15集全", rating: "8.3", tag: "都市", category: "都市小品", cover: "" },
  { id: 16, title: "夏天的童話", episode: "15集全", rating: "8.5", tag: "都市", category: "都市小品", cover: "" },
];

const categories = ["全部", "正在熱播", "經典再現", "追劇停不了", "都市小品"];

export default function DramaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-atv-dark">
      <Header />
      <main className="flex-1 py-6">
        <div className="mx-auto max-w-[1280px] px-4">
          <h1 className="text-2xl font-black text-white mb-4">🎬 精選劇集</h1>

          <div className="flex gap-2 mb-5 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button key={cat} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${cat === "全部" ? "bg-atv-red text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {allDramas.map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                viewport={{ once: true }}
              >
                <div className="group cursor-pointer">
                  <div className="relative aspect-[3/4] bg-gray-700 rounded-xl overflow-hidden mb-2">
                    {d.cover ? (
                      <img src={d.cover} alt={d.title} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">劇集封面</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-atv-red text-white text-[10px] font-bold rounded">VIP</div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="flex items-center gap-1 text-[10px] text-atv-gold mb-1">
                        <Star className="w-3 h-3 fill-atv-gold" />{d.rating}
                        <span className="text-gray-400 ml-1 flex items-center gap-0.5"><Clock className="w-3 h-3" />{d.episode}</span>
                      </div>
                      <p className="text-xs text-gray-400">{d.category}</p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                      <div className="w-14 h-14 bg-atv-red rounded-full flex items-center justify-center">
                        <Play className="w-7 h-7 text-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-atv-gold transition-colors line-clamp-1">{d.title}</h3>
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
