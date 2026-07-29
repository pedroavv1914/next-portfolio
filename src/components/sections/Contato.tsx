"use client";

import { motion } from "motion/react";
import { EASE, VIEWPORT } from "@/lib/motion";
import SectionHeader from "@/components/system/SectionHeader";
import GhostHeadline from "@/components/system/GhostHeadline";
import PhoneFrame from "@/components/system/PhoneFrame";
import FloatingOrb from "@/components/system/FloatingOrb";

/**
 * CONTATO — o padrão "CONTACT ME" da referência: um aparelho com a lista
 * de canais, ao lado da chamada.
 *
 * O PhoneFrame reaparece aqui de propósito. Ele abriu a Trajetória com a
 * bio e fecha o site com os contatos: as duas pontas em que o assunto é
 * a pessoa, não o trabalho. Repetir o objeto nesses dois lugares é o que
 * o transforma em vocabulário do site em vez de efeito usado uma vez.
 */

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const CANAIS = [
  {
    label: "Email",
    valor: "pedroribeiro.contato1914@gmail.com",
    href: "mailto:pedroribeiro.contato1914@gmail.com",
    icone: (
      <g {...S}>
        <rect x="2.5" y="5" width="19" height="14" rx="2.4" />
        <path d="m3 7 9 6 9-6" />
      </g>
    ),
  },
  {
    label: "LinkedIn",
    valor: "pedro-ribeiro",
    href: "https://www.linkedin.com/in/pedro-ribeiro-a71300230/",
    icone: (
      <g {...S}>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M7.5 10.5V17M7.5 7.2v.01M11.6 17v-3.6a2.2 2.2 0 0 1 4.4 0V17" />
      </g>
    ),
  },
  {
    label: "GitHub",
    valor: "pedroavv1914",
    href: "https://github.com/pedroavv1914",
    icone: (
      <g {...S}>
        <path d="M9.2 20.4c-4.4 1.3-4.4-2.3-6.2-2.8m12.4 5.2v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.1-1.4 5.1-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.8 4.6 5.8 4.9 5.8 4.9a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.4 11.3c0 4.6 2.3 5.7 5.1 6-.6.6-.6 1.2-.5 2v3.5" />
      </g>
    ),
  },
  {
    label: "Instagram",
    valor: "_pedroavv",
    href: "https://www.instagram.com/_pedroavv/",
    icone: (
      <g {...S}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="3.8" />
        <path d="M17.2 6.8h.01" strokeWidth="2.2" />
      </g>
    ),
  },
];

export default function Contato() {
  return (
    <section id="contato" className="relative isolate overflow-hidden py-28 lg:py-36">
      <FloatingOrb size={430} blur={80} opacity={0.42} duration={29} className="-left-40 top-10 -z-20" />
      <FloatingOrb size={320} blur={66} opacity={0.36} duration={25} delay={-9} className="-right-28 bottom-0 -z-20" />

      <GhostHeadline variant="ghost" parallax={90} className="absolute inset-x-0 top-14 -z-10">
        Contato
      </GhostHeadline>

      <div className="relative mx-auto w-[min(1160px,calc(100%-48px))]">
        <SectionHeader label="Contato" index="06" />

        <div className="mt-14 grid items-center gap-14 lg:grid-cols-[1.15fr_minmax(0,340px)] lg:gap-16">
          {/* chamada */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.7, ease: EASE }}
              className="max-w-[16ch] font-display text-[clamp(2.2rem,5.4vw,4rem)] font-extrabold leading-[0.96] tracking-[-0.035em] text-ink"
            >
              Bora construir <span className="sys-gradient-text-bright">alguma coisa?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              className="mt-6 max-w-[52ch] text-[1.02rem] leading-relaxed text-mist"
            >
              Vaga full stack júnior, projeto para a Aithos ou só uma conversa sobre uma
              ideia — me chama direto. Sem formulário: eu leio e respondo.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-3.5"
            >
              <a
                href="mailto:pedroribeiro.contato1914@gmail.com"
                className="group inline-flex items-center gap-2.5 rounded-full bg-neon-500 px-7 py-3.5 font-mono text-[0.76rem] font-medium uppercase tracking-[0.1em] text-void transition-[transform,box-shadow,background] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-neon-400 hover:shadow-[0_0_32px_-6px_var(--color-neon-400)]"
              >
                Mandar um email
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a
                href="https://www.linkedin.com/in/pedro-ribeiro-a71300230/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-ink/15 px-7 py-3.5 font-mono text-[0.76rem] uppercase tracking-[0.1em] text-mist transition-[color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-neon-500/50 hover:text-ink"
              >
                Chamar no LinkedIn
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.7, delay: 0.24 }}
              className="mt-10 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-fog"
            >
              Jundiaí · SP · Brasil (UTC−3)
            </motion.p>
          </div>

          {/* o aparelho com os canais */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
            className="mx-auto w-full max-w-[340px] lg:mx-0"
          >
            <PhoneFrame screenClassName="min-h-[440px]">
              <div className="flex flex-1 flex-col px-5 pb-3 pt-9">
                <span className="px-2 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-fog">
                  Canais
                </span>

                <div className="mt-4 flex flex-col gap-1.5">
                  {CANAIS.map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noreferrer"
                      className="group/canal flex items-center gap-3.5 rounded-2xl px-3 py-3 transition-[background,box-shadow] duration-300 hover:bg-neon-500/8 hover:shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--color-neon-400)_28%,transparent)]"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[13px] border border-ink/10 bg-void/40 text-mist transition-[color,border-color,box-shadow] duration-300 group-hover/canal:border-neon-400/45 group-hover/canal:text-neon-300 group-hover/canal:shadow-[0_0_16px_-4px_var(--color-neon-400)]">
                        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                          {c.icone}
                        </svg>
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-fog">
                          {c.label}
                        </span>
                        <span className="block truncate text-[0.86rem] text-ink transition-colors duration-300 group-hover/canal:text-neon-200">
                          {c.valor}
                        </span>
                      </span>

                      <span
                        aria-hidden="true"
                        className="shrink-0 text-fog transition-[transform,color] duration-300 group-hover/canal:translate-x-0.5 group-hover/canal:text-neon-400"
                      >
                        ↗
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </PhoneFrame>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
