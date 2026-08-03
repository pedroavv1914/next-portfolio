"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scroll da página.
 *
 * Já foi daqui o reveal por IntersectionObserver, o parallax em
 * [data-parallax] e o estado do header: com o sistema visual novo, o
 * primeiro virou `whileInView` nos componentes, o segundo virou
 * MotionValue no GhostHeadline e o terceiro mora no SiteHeader. Nenhum
 * deles tinha mais alvo no DOM.
 *
 * Quem pede menos movimento não recebe interpolação nenhuma — fica com
 * o scroll nativo do navegador.
 */
export default function Effects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // offset negativo: para o scroll 72px ANTES da âncora, senão o topo
    // da seção fica escondido atrás da nav sticky.
    const lenis = new Lenis({ lerp: 0.12, anchors: { offset: -72 } });
    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
