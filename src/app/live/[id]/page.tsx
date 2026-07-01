import LiveRoomContent from "@/components/live/LiveRoomContent";

export function generateStaticParams() {
  return [
    { id: "demo" },
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
  ];
}

export default function LiveRoomPage() {
  return <LiveRoomContent />;
}
