"use client";

import { motion } from "framer-motion";
import { Trophy, Ticket, Gamepad2, Vote, Gift, Zap } from "lucide-react";
import Link from "next/link";

const games = [
  { icon: Vote, title: "每日投票", desc: "投票選出今日最佳主播，贏取積分", color: "bg-blue-500" },
  { icon: Gift, title: "幸運抽獎", desc: "每日登入抽獎，好禮送不停", color: "bg-atv-red" },
  { icon: Zap, title: "答題挑戰", desc: "知識問答，挑戰你的腦力極限", color: "bg-amber-500" },
  { icon: Ticket, title: "紅包雨", desc: "直播間不定時發放紅包", color: "bg-emerald-500" },
  { icon: Trophy, title: "排行榜", desc: "最活躍觀眾榜，積分換禮品", color: "bg-purple-500" },
  { icon: Gamepad2, title: "小遊戲", desc: "實時小遊戲，與主播同樂", color: "bg-cyan-500" },
];

export default function GamesSection() {
  return (
    <section className="py-8 bg-white">
      <div className="mx-auto max-w-[1280px] px-4">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-black">🎮 互動遊戲</h2>
          <Link href="/games/" className="text-sm text-atv-red font-medium hover:underline">更多玩法 →</Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {games.map((game, i) => (
            <motion.div
              key={game.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <Link href="/games/" className="block group">
                <div className="flex flex-col items-center text-center p-4 rounded-xl bg-atv-gray hover:bg-atv-light transition-colors border border-transparent hover:border-atv-red/20">
                  <div className={`w-12 h-12 ${game.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <game.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-atv-dark mb-1">{game.title}</h3>
                  <p className="text-[11px] text-gray-500">{game.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
