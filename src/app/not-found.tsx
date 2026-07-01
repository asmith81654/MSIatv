import Link from "next/link";
import { Tv } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-atv-dark text-white px-4">
      <div className="w-20 h-20 bg-atv-red rounded-2xl flex items-center justify-center mb-6">
        <Tv className="w-10 h-10" />
      </div>
      <h1 className="text-4xl font-black mb-2">404</h1>
      <p className="text-gray-400 mb-6">頁面找不到了</p>
      <Link href="/" className="px-6 py-3 bg-atv-red hover:bg-red-700 text-white font-bold rounded-xl transition-colors">
        返回首頁
      </Link>
    </div>
  );
}
