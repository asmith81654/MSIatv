"use client";

import { motion } from "framer-motion";
import { Radio, Users, Heart, Video, Star } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const hostList = [
  { id: 1, name: "美妞Amy", fans: "128萬", status: "live", tag: "美妛天后", videos: 320, rating: "4.9" },
  { id: 2, name: "大哥軍", fans: "86萬", status: "offline", tag: "科技達人", videos: 180, rating: "4.8" },
  { id: 3, name: "小花仔", fans: "215萬", status: "live", tag: "生活教主", videos: 450, rating: "4.9" },
  { id: 4, name: "Fitness Ken", fans: "54萬", status: "offline", tag: "健身教練", videos: 120, rating: "4.7" },
  { id: 5, name: "老蔡美食", fans: "92萬", status: "live", tag: "美食探索", videos: 280, rating: "4.8" },
  { id: 6, name: "妝容小白", fans: "167萬", status: "offline", tag: "時尚博主", videos: 390, rating: "4.9" },
  { id: 7, name: "音樂人Leo", fans: "73萬", status: "live", tag: "音樂創作", videos: 150, rating: "4.8" },
  { id: 8, name: "旅行家Mia", fans: "45萬", status: "offline", tag: "旅遊達人", videos: 95, rating: "4.6" },
];

export default function HostsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-atv-gray">
      <Header />
      <main className="flex-1 py-6">
        <div className="mx-auto max-w-[1280px] px-4">
          <h1 className="text-2xl font-black text-atv-dark mb-5 flex items-center gap-2">
            <Users className="w-7 h-7 text-atv-red" />主播陣容
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {hostList.map((host, i) => (
              <motion.div
                key={host.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-4 border border-gray-100 hover:border-atv-red/30 transition-colors"
              >
                <div className="relative w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 overflow-hidden">
                  {host.status === "live" && (
                    <div className="absolute -top-0.5 -right-0.5 px-1.5 py-0.5 bg-atv-red rounded-full text-[9px] font-bold text-white flex items-center gap-0.5">
                      <Radio className="w-2 h-2" />LIVE
                    </div>
                  )}
                </div>
                <h3 className="text-base font-bold text-center text-atv-dark">{host.name}</h3>
                <p className="text-xs text-center text-gray-400 mb-2">{host.tag}</p>
                <div className="flex items-center justify-center gap-3 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-0.5"><Heart className="w-3 h-3" />{host.fans}</span>
                  <span className="flex items-center gap-0.5"><Video className="w-3 h-3" />{host.videos}</span>
                  <span className="flex items-center gap-0.5"><Star className="w-3 h-3 fill-atv-gold text-atv-gold" />{host.rating}</span>
                </div>
                <button className={`w-full py-2 rounded-lg text-sm font-bold transition-colors ${host.status === "live" ? "bg-atv-red hover:bg-red-700 text-white" : "bg-atv-gray hover:bg-gray-200 text-atv-dark"}`}>
                  {host.status === "live" ? "進入直播間" : "關注主播"}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
