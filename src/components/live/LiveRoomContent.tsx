"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Heart, Share2, ShoppingCart, Send, Users, Radio,
  Instagram, Facebook, MessageCircle, Link as LinkIcon,
  X, ChevronDown, Star
} from "lucide-react";
import ArcLightBackground from "@/components/ui/ArcLightBackground";

const chatMessages = [
  { user: "小明", text: "這個產品好用嗎？", color: "text-blue-400" },
  { user: "美妞Amy", text: "超級好用的！推薦給大家！", color: "text-atv-red", isHost: true },
  { user: "大哥", text: "已下單3件！", color: "text-green-400" },
  { user: "花花", text: "紅包呢？", color: "text-pink-400" },
  { user: "阿傑", text: "主播好漂亮！", color: "text-yellow-400" },
  { user: "美妞Amy", text: "感謝大家支持！紅包馬上來！", color: "text-atv-red", isHost: true },
  { user: "小雪", text: "價格真的很划算", color: "text-purple-400" },
  { user: "健身男", text: "進來就看到好東西", color: "text-cyan-400" },
  { user: "小美", text: "還有嗎？想買", color: "text-orange-400" },
  { user: "美妞Amy", text: "還有最後100件！趕快！", color: "text-atv-red", isHost: true },
];

const products = [
  { id: 1, name: "SK-II 神仙水 230ml", price: 1299, sold: 1200 },
  { id: 2, name: "iPhone 16 Pro Max 256GB", price: 8999, sold: 850 },
  { id: 3, name: "Dyson 吸塵機 V15", price: 3999, sold: 560 },
  { id: 4, name: "韓國燒酒三件套", price: 299, sold: 2300 },
];

export default function LiveRoomPage() {
  const [chatInput, setChatInput] = useState("");
  const [liked, setLiked] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [cart, setCart] = useState<number[]>([]);

  const addToCart = (id: number) => {
    setCart((prev) => [...prev, id]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-atv-dark">
      <Header />
      <main className="flex-1 pt-0">
        <div className="mx-auto max-w-[1280px] px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Left: Video Player */}
            <div className="flex-1">
              <div className="relative aspect-video bg-atv-dark rounded-2xl overflow-hidden mb-3">
                {/* Arc Light Background */}
                <ArcLightBackground />

                {/* Center placeholder content */}
                <div className="absolute inset-0 flex items-center justify-center z-[2]">
                  <div className="text-center text-white">
                    <Radio className="w-12 h-12 mx-auto mb-2 text-atv-red animate-pulse" />
                    <p className="text-lg font-bold">直播中</p>
                    <p className="text-sm text-gray-400">直播間畫面</p>
                  </div>
                </div>
                {/* Overlay info */}
                <div className="absolute top-3 left-3 flex items-center gap-2 z-[3]">
                  <span className="flex items-center gap-1 px-2 py-1 bg-red-600 rounded text-xs font-bold">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />LIVE
                  </span>
                  <span className="flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-xs text-white">
                    <Users className="w-3 h-3" /> 2.3萬
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-2 z-[3]">
                  <button onClick={() => setLiked(!liked)} className="p-2 bg-black/60 backdrop-blur-sm rounded-full hover:bg-atv-red transition-colors">
                    <Heart className={`w-5 h-5 ${liked ? "fill-atv-red text-atv-red" : "text-white"}`} />
                  </button>
                  <button onClick={() => setShareOpen(!shareOpen)} className="p-2 bg-black/60 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors">
                    <Share2 className="w-5 h-5 text-white" />
                  </button>
                </div>
                {/* Host info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent z-[3]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-atv-red rounded-full flex items-center justify-center text-xs font-bold">美</div>
                    <div>
                      <p className="text-sm font-bold text-white">美妞Amy 的直播間</p>
                      <p className="text-xs text-gray-300">韓國保養品限時特賣</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Share panel */}
              {shareOpen && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-3 p-3 bg-white rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold">分享到</span>
                    <button onClick={() => setShareOpen(false)}><X className="w-4 h-4 text-gray-400" /></button>
                  </div>
                  <div className="flex gap-3">
                    <a href="#" className="flex flex-col items-center gap-1"><div className="w-10 h-10 bg-gradient-to-tr from-yellow-400 to-pink-500 rounded-xl flex items-center justify-center"><Instagram className="w-5 h-5 text-white" /></div><span className="text-[10px] text-gray-500">INS</span></a>
                    <a href="#" className="flex flex-col items-center gap-1"><div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center"><Facebook className="w-5 h-5 text-white" /></div><span className="text-[10px] text-gray-500">FB</span></a>
                    <a href="#" className="flex flex-col items-center gap-1"><div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center"><MessageCircle className="w-5 h-5 text-white" /></div><span className="text-[10px] text-gray-500">WA</span></a>
                    <a href="#" className="flex flex-col items-center gap-1"><div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center"><MessageCircle className="w-5 h-5 text-white" /></div><span className="text-[10px] text-gray-500">LINE</span></a>
                    <a href="#" className="flex flex-col items-center gap-1"><div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center"><LinkIcon className="w-5 h-5 text-white" /></div><span className="text-[10px] text-gray-500">複製連結</span></a>
                  </div>
                </motion.div>
              )}

              {/* Stream description */}
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <h1 className="text-lg font-black text-atv-dark mb-1">韓國保養品限時特賣 — 今晚限量折扣</h1>
                <p className="text-sm text-gray-500 mb-3">主播親自探店，只推薦好用的產品。限時折扣最低到 5 折！</p>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> 2.3萬觀眾</span>
                  <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> 1.2萬讚好</span>
                  <span className="flex items-center gap-1"><ShoppingCart className="w-3.5 h-3.5" /> {cart.length} 件在購物車</span>
                </div>
              </div>
            </div>

            {/* Right: Chat + Products */}
            <div className="w-full lg:w-80 flex flex-col gap-3">
              {/* Chat */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col" style={{ height: 400 }}>
                <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
                  <span className="text-sm font-bold">直播聊天</span>
                  <span className="text-[10px] text-gray-400">1,200 人在線</span>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className="text-sm">
                      <span className={`font-bold text-xs ${msg.isHost ? "text-atv-red" : msg.color}`}>
                        {msg.isHost && <span className="px-1 py-0.5 bg-atv-red text-white text-[9px] rounded mr-1">主播</span>}
                        {msg.user}：
                      </span>
                      <span className="text-atv-dark">{msg.text}</span>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t border-gray-100 flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="發送訊息..."
                    className="flex-1 text-sm px-3 py-2 bg-atv-gray rounded-lg outline-none focus:ring-2 focus:ring-atv-red/20"
                  />
                  <button className="p-2 bg-atv-red hover:bg-red-700 text-white rounded-lg transition-colors">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Product recommendations */}
              <div className="bg-white rounded-2xl border border-gray-200 p-3">
                <h3 className="text-sm font-bold mb-2 flex items-center gap-1">
                  <ShoppingCart className="w-4 h-4 text-atv-red" />直播推薦
                </h3>
                <div className="space-y-2">
                  {products.map((p) => (
                    <div key={p.id} className="flex gap-2 p-2 bg-atv-gray rounded-lg">
                      <div className="w-14 h-14 bg-gray-300 rounded-lg flex-shrink-0 flex items-center justify-center">
                        <span className="text-[9px] text-gray-500">圖</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-atv-dark truncate">{p.name}</p>
                        <p className="text-sm font-black text-atv-red">${p.price}</p>
                        <p className="text-[10px] text-gray-400">已售{p.sold}</p>
                      </div>
                      <button
                        onClick={() => addToCart(p.id)}
                        className="px-2 py-1 bg-atv-red hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors self-center"
                      >
                        買
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
