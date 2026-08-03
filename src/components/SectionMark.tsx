"use client";

import { motion } from "motion/react";
import { EASE, VIEWPORT } from "@/lib/motion";

/**
 * Abertura de seção — o carimbo que se repete em todas: quadrado lima,
 * número da seção, nome, e uma régua que corre até a margem direita.
 * Ao entrar na tela o carimbo se monta: quadrado pica, rótulos surgem,
 * e a régua se DESENHA da esquerda para a direita — é ela que anuncia
 * "nova seção" antes do título subir.
 */
export default function SectionMark({
  numero,
  nome,
  extra,
}: {
  numero: string;
  nome: string;
  extra?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.09 } },
      }}
      className="mb-9 flex items-center gap-4"
    >
      <motion.span
        aria-hidden
        variants={{
          hidden: { scale: 0 },
          show: { scale: 1, transition: { duration: 0.35, ease: EASE } },
        }}
        className="size-[9px] bg-lime"
      />
      <motion.span
        variants={{
          hidden: { opacity: 0, x: -10 },
          show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
        }}
        className="type-label text-lime [letter-spacing:0.24em]"
      >
        {numero}
      </motion.span>
      <motion.span
        variants={{
          hidden: { opacity: 0, x: -10 },
          show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
        }}
        className="type-label text-muted [letter-spacing:0.24em]"
      >
        {nome}
      </motion.span>
      <motion.span
        aria-hidden
        variants={{
          hidden: { scaleX: 0 },
          show: { scaleX: 1, transition: { duration: 1, ease: EASE } },
        }}
        className="h-px flex-1 origin-left bg-line"
      />
      {extra ? (
        <motion.span
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { duration: 0.5, delay: 0.5 } },
          }}
          className="type-label hidden text-dim [letter-spacing:0.24em] sm:inline"
        >
          {extra}
        </motion.span>
      ) : null}
    </motion.div>
  );
}
