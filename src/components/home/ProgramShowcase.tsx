"use client";

import { useRouter } from "next/navigation";
import { PulseFitHero } from "@/components/ui/pulse-fit-hero";

export default function ProgramShowcase() {
  const router = useRouter();

  return (
    <PulseFitHero
      variant="dark"
      showHeader={false}
      fullScreen={false}
      title="好戲連場，隨時開演"
      subtitle="經典港劇、熱播短劇、綜藝盛事與亞洲小姐競選 —— 亞洲電視精選節目，24 小時任你追看。"
      primaryAction={{
        label: "立即追看",
        onClick: () => router.push("/shows/"),
      }}
      secondaryAction={{
        label: "瀏覽劇集",
        onClick: () => router.push("/drama/"),
      }}
      disclaimer="＊VIP 會員免費暢看全集"
      socialProof={{
        avatars: [
          "https://i.pravatar.cc/150?img=12",
          "https://i.pravatar.cc/150?img=32",
          "https://i.pravatar.cc/150?img=45",
          "https://i.pravatar.cc/150?img=5",
        ],
        text: "逾 500 萬觀眾正在收看",
      }}
      programs={[
        {
          image: "/images/dramas/movie-mogul.webp",
          category: "經典再現",
          title: "影城大亨",
          onClick: () => router.push("/drama/"),
        },
        {
          image: "/images/dramas/dad-on-both-sides.webp",
          category: "經典再現",
          title: "爸爸兩邊走",
          onClick: () => router.push("/drama/"),
        },
        {
          image:
            "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=500&fit=crop",
          category: "熱播劇集",
          title: "流氓太子",
          onClick: () => router.push("/drama/"),
        },
        {
          image:
            "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=400&h=500&fit=crop",
          category: "節日推介",
          title: "亞洲小姐競選",
          onClick: () => router.push("/shows/"),
        },
        {
          image:
            "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=500&fit=crop",
          category: "綜藝盛事",
          title: "綜藝大聚會",
          onClick: () => router.push("/shows/"),
        },
        {
          image:
            "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=500&fit=crop",
          category: "武俠傳奇",
          title: "神相李布衣",
          onClick: () => router.push("/drama/"),
        },
      ]}
    />
  );
}
