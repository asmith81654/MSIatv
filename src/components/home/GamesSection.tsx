"use client";

import { Trophy, Ticket, Gamepad2, Vote, Gift, Zap } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

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
    <section className="py-10 bg-white">
      <div className="mx-auto max-w-[1280px] px-4">
        <SectionHeading
          kicker="Play & Win"
          title="互動遊戲"
          action={
            <Link href="/games/" className="text-sm text-atv-red font-medium hover:underline">
              更多玩法 →
            </Link>
          }
        />

        <Reveal className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4" stagger={0.07} y={24}>
          {games.map((game) => (
            <Link key={game.title} href="/games/" className="block group">
              <div className="flex flex-col items-center text-center p-4 rounded-xl bg-atv-gray hover:bg-atv-light transition-colors border border-transparent hover:border-atv-red/20 hover:shadow-md hover:-translate-y-1 duration-300">
                <div className={`w-12 h-12 ${game.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <game.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-sm font-bold text-atv-dark mb-1">{game.title}</h3>
                <p className="text-[11px] text-gray-500">{game.desc}</p>
              </div>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
