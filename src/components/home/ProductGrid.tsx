"use client";

import { Flame } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const products = [
  { id: 1, name: "SK-II 神仙水 230ml", price: 1299, original: 1680, discount: "下殺23%", tag: "爆款", sold: "1.2萬件", image: "bg-rose-100" },
  { id: 2, name: "iPhone 16 Pro Max 256GB", price: 8999, original: 9999, discount: "限時特惠", tag: "熱賣", sold: "8,500件", image: "bg-blue-100" },
  { id: 3, name: "日本和牛禮盒套裝", price: 688, original: 988, discount: "VIP價", tag: "新品", sold: "3,200件", image: "bg-amber-100" },
  { id: 4, name: "Dyson 吸塵機 V15", price: 3999, original: 5299, discount: "跨店滿減", tag: "熱賣", sold: "5,600件", image: "bg-purple-100" },
  { id: 5, name: "韓國燒酒陣容四件組", price: 299, original: 499, discount: "買一送一", tag: "限量", sold: "9,800件", image: "bg-emerald-100" },
  { id: 6, name: "Sony WH-1000XM5 耳機", price: 2299, original: 2899, discount: "特價", tag: "熱賣", sold: "4,100件", image: "bg-gray-100" },
  { id: 7, name: "手機支架直播套裝", price: 199, original: 399, discount: "新手必買", tag: "新品", sold: "2,300件", image: "bg-orange-100" },
  { id: 8, name: "蒲公英小燈盂浴室櫃", price: 89, original: 159, discount: "多件折扣", tag: "爆款", sold: "5.6萬件", image: "bg-cyan-100" },
];

export default function ProductGrid() {
  return (
    <section className="py-10 bg-white">
      <div className="mx-auto max-w-[1280px] px-4">
        <SectionHeading
          kicker="Hot Deals"
          title={
            <span className="inline-flex items-center gap-2 align-middle">
              <Flame className="w-6 h-6 text-atv-red" />
              熱賣推薦
            </span>
          }
          action={
            <Link href="/product/demo/" className="text-sm text-atv-red font-medium hover:underline">
              更多好物 →
            </Link>
          }
        />

        <Reveal className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" stagger={0.06}>
          {products.map((product) => (
            <div key={product.id}>
              <Link href="/product/demo/" className="block group">
                <div className={`relative aspect-square ${product.image} rounded-xl overflow-hidden mb-2 flex items-center justify-center`}>
                  <span className="text-gray-400 text-sm">商品圖 {product.id}</span>
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-atv-red text-white text-[10px] font-bold rounded">
                    {product.tag}
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-0.5 bg-atv-gold text-atv-dark text-[10px] font-bold rounded">
                    {product.discount}
                  </div>
                </div>
                <h3 className="text-sm font-bold text-atv-dark line-clamp-2 mb-1 group-hover:text-atv-red transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-lg font-black text-atv-red">${product.price}</span>
                  <span className="text-xs text-gray-400 line-through">${product.original}</span>
                </div>
                <p className="text-[10px] text-gray-400">已售{product.sold}</p>
              </Link>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
