"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Share2, Star, Truck, Shield, RotateCcw } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const relatedProducts = [
  { id: 2, name: "iPhone 16 Pro Max 256GB", price: 8999, tag: "熱賣" },
  { id: 3, name: "日本和牛禮盒套裝", price: 688, tag: "新品" },
  { id: 5, name: "韓國燒酒陣容四件組", price: 299, tag: "限量" },
  { id: 6, name: "Sony WH-1000XM5 耳機", price: 2299, tag: "熱賣" },
];

export default function ProductPage() {
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 py-6">
        <div className="mx-auto max-w-[1280px] px-4">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-400 mb-4">首頁 / 直播購物 / SK-II 神仙水</div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Product Image */}
            <div className="aspect-square bg-rose-50 rounded-2xl flex items-center justify-center">
              <span className="text-gray-400">商品圖片</span>
            </div>

            {/* Product Info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-atv-red text-white text-xs font-bold rounded">爆款</span>
                <span className="px-2 py-0.5 bg-atv-gold text-atv-dark text-xs font-bold rounded">下殺23%</span>
              </div>
              <h1 className="text-2xl font-black text-atv-dark mb-2">SK-II 神仙水 230ml</h1>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {[1,2,3,4,5].map((s) => <Star key={s} className="w-4 h-4 fill-atv-gold text-atv-gold" />)}
                </div>
                <span className="text-sm text-gray-500">4.9 (2,300 評價)</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                日本頂級護膚品牌，含有超過90%的PITERA™成分，能夠深層滋潤肌膚，改善肌膚質感，讓肌膚恢復光澤。
              </p>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-black text-atv-red">$1,299</span>
                <span className="text-lg text-gray-400 line-through">$1,680</span>
                <span className="px-2 py-0.5 bg-red-100 text-atv-red text-xs font-bold rounded">省$381</span>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-sm text-gray-500">數量</span>
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 text-sm hover:bg-gray-50">-</button>
                  <span className="px-3 py-2 text-sm font-bold w-10 text-center">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="px-3 py-2 text-sm hover:bg-gray-50">+</button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mb-6">
                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-atv-red hover:bg-red-700 text-white font-bold rounded-xl transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  加入購物車
                </button>
                <button onClick={() => setLiked(!liked)} className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  <Heart className={`w-5 h-5 ${liked ? "fill-atv-red text-atv-red" : "text-gray-400"}`} />
                </button>
                <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  <Share2 className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-3">
                <div className="flex items-center gap-2 p-3 bg-atv-gray rounded-lg">
                  <Truck className="w-4 h-4 text-atv-red" />
                  <span className="text-xs text-gray-600">免運費</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-atv-gray rounded-lg">
                  <Shield className="w-4 h-4 text-atv-red" />
                  <span className="text-xs text-gray-600">正品保證</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-atv-gray rounded-lg">
                  <RotateCcw className="w-4 h-4 text-atv-red" />
                  <span className="text-xs text-gray-600">7天退換</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related */}
          <div>
            <h2 className="text-lg font-black text-atv-dark mb-4">也許你也喜歡</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedProducts.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }}>
                  <div className="bg-atv-gray rounded-xl overflow-hidden">
                    <div className="aspect-square bg-gray-300 flex items-center justify-center">
                      <span className="text-xs text-gray-500">圖 {p.id}</span>
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-bold text-atv-dark line-clamp-1">{p.name}</h3>
                      <p className="text-sm font-black text-atv-red">${p.price}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
