'use client'
import dynamic from "next/dynamic";
import { Title } from "@/components/index";

const MapSelector = dynamic(() => import("@/components/ui/MapSelector"), {
  ssr: false
});

export default function UpdateLocationPage() {
  return (
    <div>
      <MapSelector />
    </div>
  );
}
