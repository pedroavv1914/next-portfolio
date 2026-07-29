"use client";

import { motion } from "motion/react";
import { EASE, VIEWPORT } from "@/lib/motion";
import SectionHeader from "@/components/system/SectionHeader";
import GhostHeadline from "@/components/system/GhostHeadline";
import GlassCard from "@/components/system/GlassCard";
import FloatingOrb from "@/components/system/FloatingOrb";
import { ChipRow } from "@/components/system/IconChip";

/**
 * O QUE FAÇO — três módulos glass com as ferramentas em selos de ícone,
 * no padrão do bloco "Softwares" da referência.
 *
 * O grid é de três colunas, mas cada módulo entra com um deslocamento
 * vertical próprio (0 / 56px / 24px). Três cards alinhados no topo
 * viram uma tabela; desencontrados, viram composição — e é isso que
 * mantém a seção falando a mesma língua da colagem do resto do site.
 *
 * Os selos vão COM rótulo aqui, ao contrário dos cards de projeto: esta
 * é a seção que alguém abre justamente para ler quais tecnologias eu
 * uso, e ícone sozinho vira adivinhação.
 */

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const BLOCOS = [
  {
    n: "01",
    titulo: "Interfaces",
    texto:
      "Telas responsivas e rápidas, com estados bem tratados e micro-interações que ajudam em vez de enfeitar. Do layout ao comportamento final.",
    stack: ["React", "Next.js", "TypeScript", "Tailwind", "Vite"],
    offset: "lg:mt-0",
    glyph: (
      <g {...S}>
        <rect x="2" y="4" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 18v3" />
      </g>
    ),
  },
  {
    n: "02",
    titulo: "APIs e dados",
    texto:
      "Backends com regras de negócio no lugar certo, autenticação e modelagem relacional pensada antes da primeira linha de código.",
    stack: ["Node.js", "Express", "PostgreSQL", "Prisma", "Supabase"],
    offset: "lg:mt-14",
    glyph: (
      <g {...S}>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 5v14c0 1.66-4 3-9 3s-9-1.34-9-3V5" />
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
      </g>
    ),
  },
  {
    n: "03",
    titulo: "Entrega e operação",
    texto:
      "Deploy que se repete sem susto: ambientes em contêiner, versionamento disciplinado e o projeto saudável depois da primeira entrega.",
    stack: ["Docker", "Vercel", "AWS", "Git / CI"],
    offset: "lg:mt-6",
    glyph: (
      <g {...S}>
        <path d="M12 2 2 7l10 5 10-5-10-5Z" />
        <path d="m2 17 10 5 10-5" />
        <path d="m2 12 10 5 10-5" />
      </g>
    ),
  },
];

export default function OQueFaco() {
  return (
    <section id="skills" className="relative isolate overflow-hidden py-28 lg:py-36">
      <FloatingOrb size={380} blur={78} opacity={0.4} duration={29} className="-left-36 top-24 -z-20" />
      <FloatingOrb size={300} blur={64} opacity={0.35} duration={25} delay={-9} className="-right-28 bottom-16 -z-20" />

      <GhostHeadline
        variant="ghost"
        parallax={90}
        className="absolute inset-x-0 top-20 -z-10"
      >
        Prática
      </GhostHeadline>

      <div className="relative mx-auto w-[min(1160px,calc(100%-48px))]">
        <SectionHeader label="O que faço" index="03" />

        <div className="mt-10 max-w-[62ch]">
          <motion.h2
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-display text-[clamp(2rem,5vw,3.6rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-ink"
          >
            O que eu entrego <span className="sys-gradient-text-bright">na prática</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            className="mt-5 text-[1.02rem] leading-relaxed text-mist"
          >
            Sem lista infinita de tecnologia: estas são as ferramentas com que eu trabalho
            de verdade, agrupadas pelo que elas resolvem.
          </motion.p>
        </div>

        <div className="relative mt-16 grid gap-6 lg:grid-cols-3 lg:gap-7">
          <FloatingOrb
            size={88}
            opacity={0.85}
            duration={16}
            delay={-5}
            className="left-[30%] top-[-3%] -z-10 hidden lg:block"
          />
          <FloatingOrb
            size={64}
            opacity={0.8}
            duration={13}
            delay={-2}
            className="right-[28%] bottom-[-4%] -z-10 hidden lg:block"
          />

          {BLOCOS.map((b, i) => (
            <motion.div
              key={b.titulo}
              initial={{ opacity: 0, y: 38 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              className={b.offset}
            >
              <GlassCard className="flex h-full flex-col p-7 lg:p-8">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[14px] border border-neon-500/25 bg-neon-500/10 text-neon-300 transition-[box-shadow,border-color] duration-500 group-hover/glass:border-neon-400/50 group-hover/glass:shadow-[0_0_22px_-6px_var(--color-neon-400)]">
                    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                      {b.glyph}
                    </svg>
                  </span>
                  <span className="font-mono text-[0.7rem] tracking-[0.2em] text-fog">{b.n}</span>
                </div>

                <h3 className="mt-6 font-display text-[1.35rem] font-bold tracking-tight text-ink">
                  {b.titulo}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-mist">{b.texto}</p>

                {/* mt-auto encosta os selos na base: os textos têm alturas
                    diferentes, e sem isso as fileiras de chips ficariam
                    em três alturas distintas dentro dos módulos. */}
                <div aria-hidden="true" className="mt-7 h-px bg-ink/8" />
                <div className="mt-5 flex flex-1 items-end">
                  <ChipRow items={b.stack} showLabel size="sm" className="gap-x-3 gap-y-2.5" />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
