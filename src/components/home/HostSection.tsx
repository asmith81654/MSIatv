"use client";

import { Radio, Heart } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const hostList = [
  { id: 1, name: "陳耀聯", fans: "128萬", status: "live", tag: "金牌主播" },
  { id: 2, name: "李志偉", fans: "86萬", status: "offline", tag: "歌手主播" },
  { id: 3, name: "小花仔", fans: "215萬", status: "live", tag: "生活教主" },
  { id: 4, name: "ATV美妝姐", fans: "54萬", status: "offline", tag: "美妝達人" },
  { id: 5, name: "老蔡美食", fans: "92萬", status: "live", tag: "美食探索" },
  { id: 6, name: "科技明哥", fans: "167萬", status: "offline", tag: "科技博主" },
  { id: 7, name: "音樂人Leo", fans: "73萬", status: "live", tag: "音樂創作" },
  { id: 8, name: "HK旅行家", fans: "45萬", status: "offline", tag: "旅遊達人" },
];

export default function HostSection() {
  return (
    <section className="py-10 bg-atv-gray">
      <div className="mx-auto max-w-[1280px] px-4">
        <SectionHeading
          kicker="Creators"
          title="主播陣容"
          action={
            <Link href="/hosts/" className="text-sm text-atv-red font-medium hover:underline">
              全部主播 →
            </Link>
          }
        />

        <Reveal className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4" stagger={0.05} y={16}>
          {hostList.map((host) => (
            <Link key={host.id} href="/hosts/" className="block group text-center">
              <div className="relative w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 overflow-hidden ring-2 ring-transparent group-hover:ring-atv-red/40 transition-all group-hover:scale-105 duration-300">
                {host.status === "live" && (
                  <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-atv-red rounded-full border-2 border-white flex items-center justify-center">
                    <Radio className="w-2 h-2 text-white" />
                  </div>
                )}
              </div>
              <h3 className="text-sm font-bold text-atv-dark group-hover:text-atv-red transition-colors">{host.name}</h3>
              <p className="text-[10px] text-gray-400 mt-0.5">{host.tag}</p>
              <div className="flex items-center justify-center gap-1 mt-1 text-[10px] text-gray-500">
                <Heart className="w-3 h-3" />{host.fans}
              </div>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
