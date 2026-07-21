"use client";

import { useEffect, useRef } from "react";
import engine from "@/lib/scrub-engine";
import { worldConfig, WORLD_READY } from "@/lib/world-config";

// Monta o voo de câmera contínuo (scroll-world) no topo da página.
// Enquanto WORLD_READY for false, não renderiza nada — o hero estático assume.
export default function ScrollWorldIntro() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!WORLD_READY || !ref.current) return;
    engine.mountScrollWorld(ref.current, worldConfig);
  }, []);

  if (!WORLD_READY) return null;
  return <div ref={ref} id="mundo" className="world-intro" />;
}
