import ProductContent from "@/components/live/ProductContent";

export function generateStaticParams() {
  return [
    { id: "demo" },
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
  ];
}

export default function ProductPage() {
  return <ProductContent />;
}
