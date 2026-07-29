"use client";

import { motion } from "motion/react";
import { EASE, VIEWPORT } from "@/lib/motion";
import Monogram from "./Monogram";

/**
 * Selo de abertura de seção — o elemento que mais se repete no sistema.
 * Marca à esquerda · linha fina que se desenha · rótulo em caixa alta
 * à direita. Não é navbar: é uma faixa de identificação que abre cada
 * um dos seis blocos do site, como cabeçalho de página impressa.
 *
 * A linha cresce da esquerda para a direita quando a seção entra na
 * viewport — é o que dá a sensação de "abrindo o capítulo".
 */
export default function SectionHeader({
  label,
  index,
  className = "",
}: {
  /** Rótulo curto da seção, ex.: "TRAJETÓRIA". */
  label: string;
  /** Numeração opcional do capítulo, ex.: "02". */
  index?: string;
  className?: string;
}) {
  return (
    <motion.div
      className={`flex items-center gap-4 sm:gap-6 ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      <motion.span
        className="text-neon-500 shrink-0"
        variants={{
          hidden: { opacity: 0, rotate: -25, scale: 0.8 },
          show: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
        }}
      >
        <Monogram size={20} />
      </motion.span>

      {index ? (
        <motion.span
          className="font-mono text-[0.7rem] tracking-[0.2em] text-fog shrink-0"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { duration: 0.5, delay: 0.1 } },
          }}
        >
          {index}
        </motion.span>
      ) : null}

      <motion.span
        aria-hidden="true"
        className="h-px flex-1 origin-left bg-gradient-to-r from-neon-500/50 via-ink/15 to-transparent"
        variants={{
          hidden: { scaleX: 0 },
          show: { scaleX: 1, transition: { duration: 0.9, delay: 0.08, ease: EASE } },
        }}
      />

      <motion.span
        className="font-mono text-[0.7rem] sm:text-xs font-medium uppercase tracking-[0.24em] text-mist shrink-0"
        variants={{
          hidden: { opacity: 0, x: 12 },
          show: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.18, ease: EASE } },
        }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
}
