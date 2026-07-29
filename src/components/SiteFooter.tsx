"use client";

import { motion } from "motion/react";
import { EASE, VIEWPORT } from "@/lib/motion";
import Monogram from "@/components/system/Monogram";

/**
 * Fecha o site com a assinatura — a marca centralizada, pequena, sobre
 * uma régua que desvanece para os lados. É o contraponto do selo que
 * abre cada seção: o sistema abre com a marca à esquerda e fecha com a
 * mesma marca no centro.
 */
export default function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden pb-14 pt-8">
      <div className="mx-auto w-[min(1160px,calc(100%-48px))]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex w-full items-center gap-5">
            <span
              aria-hidden="true"
              className="h-px flex-1 bg-gradient-to-r from-transparent to-ink/12"
            />
            <Monogram size={22} className="shrink-0 text-neon-500" title="Pedro Ribeiro" />
            <span
              aria-hidden="true"
              className="h-px flex-1 bg-gradient-to-l from-transparent to-ink/12"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-center font-mono text-[0.7rem] uppercase tracking-[0.16em] text-fog">
            <span>© 2026 Pedro Ribeiro — feito por mim, em Jundiaí.</span>
            <span>Next.js · TypeScript · deploy na Vercel</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
