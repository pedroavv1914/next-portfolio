"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Comportamentos globais de página: smooth scroll (Lenis), reveal on scroll
// (IntersectionObserver em [data-reveal]), parallax sutil em [data-parallax]
// e estado do header ao rolar. Respeita prefers-reduced-motion.
export default function Effects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lenis: Lenis | null = null;
    let rafId = 0;
    if (!reduce) {
      lenis = new Lenis({ lerp: 0.12, anchors: true });
      const raf = (time: number) => {
        lenis!.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    const parallaxEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]")
    );
    const header = document.querySelector<HTMLElement>(".site-header");

    const onScroll = () => {
      const y = window.scrollY;
      if (header) header.classList.toggle("scrolled", y > 24);
      if (reduce) return;
      const vh = window.innerHeight;
      parallaxEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const progress = (r.top + r.height / 2 - vh / 2) / vh;
        const depth = parseFloat(el.dataset.parallax || "18");
        el.style.transform = `translateY(${(-progress * depth).toFixed(2)}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy();
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
