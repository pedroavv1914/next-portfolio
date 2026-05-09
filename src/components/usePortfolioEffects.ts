"use client";

import { useEffect } from "react";

export function usePortfolioEffects() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealTargets = document.querySelectorAll(".reveal,.reveal-x,.reveal-r,.reveal-zoom,.stagger");
    if (prefersReducedMotion) {
      revealTargets.forEach((el) => el.classList.add("in"));
    }

    let io: IntersectionObserver | null = null;
    if (!prefersReducedMotion) {
      io = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              observer.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      revealTargets.forEach((el) => io?.observe(el));
    }

    document.querySelectorAll<HTMLElement>("[data-letters]").forEach((el) => {
      if (el.dataset.processed) return;
      el.dataset.processed = "1";
      const txt = el.textContent || "";
      el.textContent = "";
      [...txt].forEach((ch, i) => {
        const s = document.createElement("span");
        s.className = "letter";
        s.style.animationDelay = i * 40 + "ms";
        s.textContent = ch === " " ? "\u00a0" : ch;
        el.appendChild(s);
      });
    });

    const magnetic = document.querySelectorAll<HTMLElement>(
      ".btn-primary, .nav-cta, .case-btn.primary, .form .submit"
    );
    const onMove = (btn: HTMLElement) => (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.18}px,${y * 0.22}px)`;
    };
    const onLeave = (btn: HTMLElement) => () => {
      btn.style.transform = "";
    };
    const moveHandlers: Array<{ btn: HTMLElement; m: (e: MouseEvent) => void; l: () => void }> = [];
    if (!prefersReducedMotion) {
      magnetic.forEach((btn) => {
        const m = onMove(btn);
        const l = onLeave(btn);
        btn.addEventListener("mousemove", m);
        btn.addEventListener("mouseleave", l);
        moveHandlers.push({ btn, m, l });
      });
    }

    const cards = document.querySelectorAll<HTMLElement>(".delivery, .case");
    const tiltMove = (card: HTMLElement) => (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(1000px) rotateX(${-py * 3}deg) rotateY(${px * 4}deg) translateY(-4px)`;
    };
    const tiltLeave = (card: HTMLElement) => () => {
      card.style.transform = "";
    };
    const tiltHandlers: Array<{ card: HTMLElement; m: (e: MouseEvent) => void; l: () => void }> = [];
    if (!prefersReducedMotion) {
      cards.forEach((card) => {
        const m = tiltMove(card);
        const l = tiltLeave(card);
        card.addEventListener("mousemove", m);
        card.addEventListener("mouseleave", l);
        tiltHandlers.push({ card, m, l });
      });
    }

    const prog = document.getElementById("progress");
    const onScroll = () => {
      if (!prog) return;
      const h = document.documentElement;
      const p = h.scrollTop / Math.max(h.scrollHeight - h.clientHeight, 1);
      prog.style.width = p * 100 + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io?.disconnect();
      moveHandlers.forEach(({ btn, m, l }) => {
        btn.removeEventListener("mousemove", m);
        btn.removeEventListener("mouseleave", l);
      });
      tiltHandlers.forEach(({ card, m, l }) => {
        card.removeEventListener("mousemove", m);
        card.removeEventListener("mouseleave", l);
      });
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}
