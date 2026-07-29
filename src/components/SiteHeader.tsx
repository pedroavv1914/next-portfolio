"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { EASE } from "@/lib/motion";
import Monogram from "@/components/system/Monogram";

const LINKS = [
  { href: "#sobre", label: "Trajetória" },
  { href: "#skills", label: "O que faço" },
  { href: "#projetos", label: "Projetos" },
  { href: "#processo", label: "Processo" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      className={[
        "fixed inset-x-0 top-0 z-60 transition-[background,box-shadow,backdrop-filter] duration-500",
        scrolled
          ? "bg-void/72 shadow-[0_1px_0_color-mix(in_srgb,var(--color-ink)_10%,transparent)] backdrop-blur-xl"
          : "bg-transparent",
      ].join(" ")}
    >
      <div
        className={[
          "mx-auto flex w-[min(1160px,calc(100%-48px))] items-center gap-7 transition-[padding] duration-500",
          scrolled ? "py-3" : "py-5",
        ].join(" ")}
      >
        <a
          href="#topo"
          className="group flex items-center gap-2.5 font-mono text-sm font-medium tracking-tight text-ink"
        >
          <Monogram
            size={22}
            className="text-neon-500 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-[-8deg] group-hover:scale-110"
          />
          Pedro Ribeiro
        </a>

        <nav aria-label="Seções" className="ml-auto hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative font-mono text-[0.72rem] uppercase tracking-[0.16em] text-mist transition-colors duration-300 hover:text-ink"
            >
              {l.label}
              <span
                aria-hidden="true"
                className="absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-neon-500 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        <a
          href="#contato"
          className="ml-auto rounded-full border border-neon-500/40 bg-neon-500/10 px-5 py-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-neon-300 transition-[background,box-shadow,color,transform] duration-300 hover:-translate-y-px hover:bg-neon-500 hover:text-void hover:shadow-[0_0_24px_-4px_var(--color-neon-500)] md:ml-0"
        >
          Falar comigo
        </a>
      </div>
    </motion.header>
  );
}
