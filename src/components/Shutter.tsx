"use client";

import { motion } from "motion/react";
import { EASE, VIEWPORT } from "@/lib/motion";

/**
 * Cortina de revelação das capturas: um painel LIMA cobre a imagem e
 * desliza para fora quando ela entra na tela, enquanto a imagem assenta
 * de um leve zoom. É o "flash de fotocopiadora" dos tiles de
 * tecnologia, aplicado ao momento de revelar cada projeto.
 *
 * A cortina anima opacity JUNTO com o scaleX de propósito: com
 * prefers-reduced-motion o MotionConfig derruba a animação de
 * transform, e sem o fade o painel ficaria cobrindo a imagem para
 * sempre.
 *
 * Usar DENTRO de um container position:relative com overflow-hidden.
 */
export default function Shutter({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <>
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.2, ease: EASE, delay }}
      >
        {children}
      </motion.div>
      <motion.div
        aria-hidden
        className="absolute inset-0 z-10 origin-right bg-lime"
        initial={{ scaleX: 1, opacity: 1 }}
        whileInView={{ scaleX: 0, opacity: 0 }}
        viewport={VIEWPORT}
        transition={{
          scaleX: { duration: 0.65, ease: [0.83, 0, 0.17, 1], delay },
          opacity: { duration: 0.01, delay: delay + 0.62 },
        }}
      />
    </>
  );
}
