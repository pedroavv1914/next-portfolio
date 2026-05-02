"use client";

import { useEffect } from "react";

export default function GlobalEffects() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>(".reveal, .reveal-child"));

    if (prefersReduced || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          target.classList.add("is-visible");

          const children = Array.from(target.querySelectorAll<HTMLElement>(".reveal-child"));
          children.forEach((child, index) => {
            child.style.setProperty("--reveal-delay", `${index * 80}ms`);
            child.classList.add("is-visible");
          });

          observer.unobserve(target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    revealItems.forEach((item) => {
      if (!item.classList.contains("reveal-child")) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const pointerFine = window.matchMedia("(pointer: fine)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!pointerFine || prefersReduced) return;

    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    document.body.appendChild(cursor);

    let x = -100;
    let y = -100;
    let raf = 0;

    const draw = () => {
      cursor.style.transform = `translate3d(${x - cursor.offsetWidth / 2}px, ${y - cursor.offsetHeight / 2}px, 0)`;
      raf = 0;
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!raf) raf = requestAnimationFrame(draw);
    };

    const onOver = (event: Event) => {
      const target = event.target as HTMLElement | null;
      cursor.classList.toggle("is-hovering", Boolean(target?.closest("a, button, input, textarea, select")));
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      if (raf) cancelAnimationFrame(raf);
      cursor.remove();
    };
  }, []);

  return null;
}
