"use client";

import { motion } from "framer-motion";
import { Play, Star, Clock, Flame } from "lucide-react";
import Link from "next/link";

const nowTrending = [
  { id: 101, title: "流氓太子", episode: "20集全", rating: "9.1", tag: "熱播", cover: "" },
  { id: 102, title: "蝴蝶血", episode: "30集全", rating: "8.8", tag: "熱播", cover: "" },
  { id: 103, title: "住家男人", episode: "全劇集", rating: "8.6", tag: "熱播", cover: "" },
  { id: 104, title: "飛越擂台", episode: "25集全", rating: "8.7", tag: "熱播", cover: "" },
];

const classicDramas = [
  { id: 1, title: "影城大亨", episode: "全劇集", rating: "9.0", tag: "經典", cover: "/images/dramas/movie-mogul.webp" },
  { id: 2, title: "爸爸兩邊走", episode: "全劇集", rating: "8.9", tag: "經典", cover: "/images/dramas/dad-on-both-sides.webp" },
  { id: 3, title: "皇家檔案（粵語版）", episode: "32集全", rating: "8.8", tag: "經典", cover: "" },
  { id: 4, title: "流氓太子", episode: "20集全", rating: "9.1", tag: "經典", cover: "" },
];

const bingeDramas = [
  { id: 5, title: "江少的契约夫人", episode: "82集全", rating: "9.0", tag: "熱播", cover: "" },
  { id: 6, title: "氪金娇妻又凶又甜", episode: "100集", rating: "8.9", tag: "連載", cover: "" },
  { id: 7, title: "民间异闻录", episode: "76集全", rating: "8.6", tag: "熱播", cover: "" },
  { id: 8, title: "妻子的复仇", episode: "101集全", rating: "9.2", tag: "熱播", cover: "" },
];

const urbanDramas = [
  { id: 9, title: "快活谷", episode: "60集全", rating: "8.4", tag: "都市", cover: "" },
  { id: 10, title: "老婆愈老愈可愛", episode: "20集全", rating: "8.7", tag: "都市", cover: "" },
  { id: 11, title: "天使危機", episode: "15集全", rating: "8.3", tag: "都市", cover: "" },
  { id: 12, title: "夏天的童話", episode: "15集全", rating: "8.5", tag: "都市", cover: "" },
];

function DramaRow({ title, dramas, icon: Icon }: { title: string; dramas: typeof classicDramas; icon: any }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-atv-red" />
          <h3 className="text-lg font-black">{title}</h3>
        </div>
        <button className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
          換一換 <span className="text-xs">↻</span>
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {dramas.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            viewport={{ once: true }}
          >
            <Link href="/drama/" className="block group">
              <div className="relative aspect-[3/4] bg-gray-700 rounded-xl overflow-hidden mb-2">
                {d.cover ? (
                  <img src={d.cover} alt={d.title} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">劇集封面</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-atv-red text-white text-[10px] font-bold rounded">
                  VIP
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <div className="flex items-center gap-1 text-[10px] text-atv-gold mb-1">
                    <Star className="w-3 h-3 fill-atv-gold" />{d.rating}
                    <span className="text-gray-400 ml-1 flex items-center gap-0.5"><Clock className="w-3 h-3" />{d.episode}</span>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                  <div className="w-12 h-12 bg-atv-red rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-white ml-0.5" />
                  </div>
                </div>
              </div>
              <h3 className="text-sm font-bold group-hover:text-atv-gold transition-colors line-clamp-1">{d.title}</h3>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function DramaSection() {
  return (
    <section className="py-8 bg-atv-dark text-white">
      <div className="mx-auto max-w-[1280px] px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black">🎬 精選劇集</h2>
          <Link href="/drama/" className="text-sm text-atv-gold font-medium hover:underline">更多劇集 →</Link>
        </div>

        <DramaRow title="正在熱播" dramas={nowTrending} icon={Flame} />
        <DramaRow title="經典再現" dramas={classicDramas} icon={Star} />
        <DramaRow title="追劇停不了" dramas={bingeDramas} icon={Flame} />
        <DramaRow title="都市小品" dramas={urbanDramas} icon={Clock} />
      </div>
    </section>
  );
}
