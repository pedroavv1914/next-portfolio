"use client";

import { motion, useScroll, useSpring } from "motion/react";
import Monogram from "@/components/Monogram";

const LINKS = [
  { href: "#trajetoria", numero: "02", label: "Trajetória" },
  { href: "#pratica", numero: "03", label: "Prática" },
  { href: "#projetos", numero: "04", label: "Projetos" },
  { href: "#processo", numero: "05", label: "Processo" },
];

/**
 * Nav fixa + régua de leitura: a linha lima de 2px no topo cresce com o
 * scroll. scaleX em MotionValue — nada de setState por frame de scroll.
 */
export default function SiteHeader() {
  const { scrollYProgress } = useScroll();
  const progresso = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: progresso }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-lime"
      />

      <nav
        aria-label="Seções"
        className="sticky top-0 z-50 border-b border-line bg-coal/85 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-x-10 gap-y-3 px-6 py-4 md:px-12 xl:px-16">
          <a href="#topo" className="flex flex-none items-center gap-3.5">
            <Monogram size={30} />
            <span
              className="type-display text-base whitespace-nowrap text-ink [--wdth:76] [letter-spacing:0.04em]"
            >
              PEDRO RIBEIRO
            </span>
          </a>

          <div className="flex items-center gap-5 sm:gap-8">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="type-label hidden text-[11px] whitespace-nowrap text-muted transition-colors duration-200 [letter-spacing:0.18em] hover:text-lime md:inline"
              >
                <span className="text-dim">{link.numero} </span>
                {link.label}
              </a>
            ))}
            <a
              href="#contato"
              className="type-label bg-lime px-5 py-3 text-[11px] font-bold whitespace-nowrap text-coal transition-colors duration-200 [letter-spacing:0.14em] hover:bg-ink"
            >
              Falar comigo
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
