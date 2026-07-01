"use client";

import { Play, Heart, MessageCircle } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const shorts = [
  { id: 1, title: "香港街頭美食探店，這家酒樓太絕了！", author: "ATV吃貨團", likes: "12.5萬", comments: "3,200", duration: "0:45" },
  { id: 2, title: "經典港劇片段回顧，滿滿的回憶殺！", author: "ATV經典台", likes: "8.9萬", comments: "1,800", duration: "1:12" },
  { id: 3, title: "亞洲小姐候選佳麗片段", author: "ATV選美專區", likes: "6.7萬", comments: "950", duration: "0:58" },
  { id: 4, title: "老香港的一天，街頭巷尾都是戲", author: "HK記憶", likes: "4.2萬", comments: "2,100", duration: "2:30" },
  { id: 5, title: "港星日常曝光，原來他們這麼接地氣", author: "ATV娛樂速遞", likes: "9.1萬", comments: "4,500", duration: "1:05" },
  { id: 6, title: "穿越回到九十年代的香港，太熱血了", author: "歲月ATV", likes: "15.3萬", comments: "6,800", duration: "0:38" },
];

export default function ShortVideoSection() {
  return (
    <section className="py-10 bg-atv-gray">
      <div className="mx-auto max-w-[1280px] px-4">
        <SectionHeading
          kicker="Shorts"
          title="短視頻精選"
          action={
            <a href="/shorts/" className="text-sm text-atv-red font-medium hover:underline">
              更多短片 →
            </a>
          }
        />

        <Reveal className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3" stagger={0.06} y={22}>
          {shorts.map((video) => (
            <div key={video.id} className="group cursor-pointer">
              <div className="relative aspect-[9/16] bg-gray-300 rounded-xl overflow-hidden mb-2">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 flex flex-col justify-end p-2">
                  <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/60 text-white text-[10px] rounded">{video.duration}</span>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 bg-atv-red/90 rounded-full flex items-center justify-center">
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xs font-bold text-atv-dark line-clamp-2 mb-1">{video.title}</h3>
              <p className="text-[10px] text-gray-500">@{video.author}</p>
              <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400">
                <span className="flex items-center gap-0.5"><Heart className="w-3 h-3" />{video.likes}</span>
                <span className="flex items-center gap-0.5"><MessageCircle className="w-3 h-3" />{video.comments}</span>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
