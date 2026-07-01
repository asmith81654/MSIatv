"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Ticket, Gamepad2, Vote, Gift, Zap, Star, RotateCcw, CheckCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const gameList = [
  {
    icon: Vote,
    title: "每日投票",
    desc: "投票選出今日最佳主播，贏取積分換禮品。每天可投票一次。",
    color: "bg-blue-500",
    active: true,
    players: "2.3萬人參與",
  },
  {
    icon: Gift,
    title: "幸運抽獎",
    desc: "每日登入抽獎，好禮送不停。有機會抽中 iPhone、現金紅包等大獎！",
    color: "bg-atv-red",
    active: true,
    players: "5.6萬人參與",
  },
  {
    icon: Zap,
    title: "答題挑戰",
    desc: "知識問答，挑戰你的腦力極限。答對贊分，衝擊排行榜！",
    color: "bg-amber-500",
    active: false,
    players: "8,900人參與",
  },
  {
    icon: Ticket,
    title: "紅包雨",
    desc: "直播間不定時發放紅包，手速快的有獎！",
    color: "bg-emerald-500",
    active: false,
    players: "直播間開放",
  },
  {
    icon: Trophy,
    title: "排行榜",
    desc: "最活躍觀眾榜，積分換禮品。每週更新排名。",
    color: "bg-purple-500",
    active: true,
    players: "1.2萬人參與",
  },
  {
    icon: Gamepad2,
    title: "小遊戲",
    desc: "實時小遊戲，與主播同樂。包括猜謎、抽獎、投票等多種玩法。",
    color: "bg-cyan-500",
    active: false,
    players: "即將上線",
  },
];

export default function GamesPage() {
  const [voted, setVoted] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-atv-gray">
      <Header />
      <main className="flex-1 py-6">
        <div className="mx-auto max-w-[1280px] px-4">
          <h1 className="text-2xl font-black text-atv-dark mb-5 flex items-center gap-2">
            <Gamepad2 className="w-7 h-7 text-atv-red" />
            互動遊戲
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gameList.map((game, i) => (
              <motion.div
                key={game.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-atv-red/30 transition-colors"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-12 h-12 ${game.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <game.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-atv-dark">{game.title}</h3>
                    <span className="text-[11px] text-gray-400">{game.players}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-4">{game.desc}</p>
                {game.title === "每日投票" ? (
                  <button
                    onClick={() => setVoted(true)}
                    disabled={voted}
                    className={`w-full py-2.5 rounded-lg text-sm font-bold transition-colors ${voted ? "bg-green-100 text-green-700" : "bg-atv-red hover:bg-red-700 text-white"}`}
                  >
                    {voted ? <span className="flex items-center justify-center gap-1"><CheckCircle className="w-4 h-4" />已投票</span> : "立即投票"}
                  </button>
                ) : game.active ? (
                  <button className="w-full py-2.5 bg-atv-red hover:bg-red-700 text-white text-sm font-bold rounded-lg transition-colors">
                    立即參與
                  </button>
                ) : (
                  <button className="w-full py-2.5 bg-atv-gray text-gray-400 text-sm font-bold rounded-lg cursor-not-allowed">
                    即將開放
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
