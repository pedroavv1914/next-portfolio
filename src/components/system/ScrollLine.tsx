"use client";

import { motion, useScroll } from "motion/react";

/**
 * Linha que liga os módulos e se desenha conforme o scroll.
 *
 * scaleY sobre um MotionValue em vez de pathLength em SVG: para uma
 * linha reta o resultado é idêntico e o custo é um transform composto
 * na GPU, sem recalcular geometria a cada frame. O trilho apagado fica
 * sempre visível para que a conexão entre os blocos se leia mesmo antes
 * de a linha chegar — e mesmo com reduced-motion, onde ela nasce cheia.
 */
export default function ScrollLine({
  targetRef,
  direction = "vertical",
  className = "",
}: {
  /** Container cujo scroll controla o desenho. */
  targetRef: React.RefObject<HTMLElement | null>;
  /** Vertical liga marcos empilhados; horizontal liga etapas em fileira. */
  direction?: "vertical" | "horizontal";
  className?: string;
}) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    // A horizontal fecha mais cedo: a fileira inteira aparece de uma vez
    // na viewport, então esperar o fim do container deixaria a linha
    // incompleta com tudo já visível na tela.
    offset: direction === "horizontal" ? ["start 80%", "end 85%"] : ["start 85%", "end 60%"],
  });

  const horizontal = direction === "horizontal";

  return (
    <div aria-hidden="true" className={`absolute ${horizontal ? "h-px" : "w-px"} ${className}`}>
      <div className="absolute inset-0 bg-ink/8" />
      <motion.div
        style={horizontal ? { scaleX: scrollYProgress } : { scaleY: scrollYProgress }}
        className={
          horizontal
            ? "absolute inset-0 origin-left bg-gradient-to-r from-neon-400 via-neon-500 to-neon-700"
            : "absolute inset-0 origin-top bg-gradient-to-b from-neon-400 via-neon-500 to-neon-700"
        }
      />
    </div>
  );
}

/** Nó da linha: acende quando o módulo correspondente entra. */
export function ScrollNode({ className = "" }: { className?: string }) {
  return (
    <motion.span
      aria-hidden="true"
      initial={{ scale: 0.4, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      className={`absolute z-10 grid h-3.5 w-3.5 place-items-center rounded-full bg-void ${className}`}
    >
      <span className="h-2 w-2 rounded-full bg-neon-400 shadow-[0_0_12px_2px_color-mix(in_srgb,var(--color-neon-400)_60%,transparent)]" />
    </motion.span>
  );
}
