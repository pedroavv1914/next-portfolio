"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { EASE, VIEWPORT } from "@/lib/motion";
import SectionHeader from "@/components/system/SectionHeader";
import GhostHeadline from "@/components/system/GhostHeadline";
import GlassCard from "@/components/system/GlassCard";
import PhoneFrame from "@/components/system/PhoneFrame";
import FloatingOrb from "@/components/system/FloatingOrb";
import ScrollLine, { ScrollNode } from "@/components/system/ScrollLine";

/**
 * TRAJETÓRIA — a timeline linear vira uma coluna de módulos flutuantes.
 *
 * O que muda em relação ao layout antigo: cada marco é um objeto
 * phone-frame com indentação própria (nunca dois na mesma margem), a
 * linha que os liga se desenha conforme o scroll, e o título da seção
 * ocupa o fundo inteiro como marca d'água.
 *
 * O retrato deixou de ser um card lateral: virou o avatar do módulo de
 * bio, no formato de um perfil de app — mesmo conteúdo (foto, nome,
 * cidade, texto de apresentação), gramática nova.
 */

const MARCOS = [
  {
    when: "Em curso · 5º semestre",
    title: "Ciência da Computação — UniAnchieta",
    text: "Foi onde programar deixou de ser curiosidade e virou direção. A base teórica me deu vocabulário para as decisões que eu tomava no improviso: estrutura de dados, banco relacional, redes.",
    indent: "lg:ml-0",
  },
  {
    when: "Até julho de 2026",
    title: "Analista de Implantação — Fagron Tech",
    text: "Implantar software para farmácias de manipulação me ensinou o que nenhum tutorial ensina: o que acontece quando o sistema encontra o usuário de verdade. Migração de dados, treinamento, suporte — vi de perto onde produto bom vira produto usado. Saí para apostar de vez no desenvolvimento.",
    indent: "lg:ml-14",
  },
  {
    when: "Atual",
    title: "Cofundador — Aithos Tech",
    text: "Na Aithos, criamos soluções digitais para pequenos e médios negócios do Brasil. Aqui eu não só escrevo código: converso com cliente, levanto requisito, estimo prazo e respondo pelo resultado.",
    indent: "lg:ml-6",
  },
  {
    when: "Próxima parada",
    title: "Irlanda",
    text: "O plano de longo prazo é ganhar mais estrada como dev e me mudar para a Irlanda em alguns anos. Cada projeto desta página é um passo nessa direção.",
    indent: "lg:ml-20",
  },
];

export default function Trajetoria() {
  const trilho = useRef<HTMLDivElement>(null);

  return (
    <section id="sobre" className="relative isolate overflow-hidden py-28 lg:py-36">
      <FloatingOrb size={420} blur={80} opacity={0.4} duration={28} className="-right-40 top-20 -z-20" />
      <FloatingOrb size={260} blur={60} opacity={0.35} duration={24} delay={-8} className="-left-32 bottom-40 -z-20" />

      <GhostHeadline
        variant="ghost"
        parallax={90}
        className="absolute inset-x-0 top-16 -z-10"
      >
        Trajetória
      </GhostHeadline>

      <div className="relative mx-auto w-[min(1160px,calc(100%-48px))]">
        <SectionHeader label="Trajetória" index="02" />

        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-10 max-w-[18ch] font-display text-[clamp(2rem,5vw,3.6rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-ink"
        >
          Como eu cheguei <span className="sys-gradient-text-bright">até aqui</span>
        </motion.h2>

        <div className="mt-16 grid gap-14 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-16">
          {/* ---------- módulo de bio, no formato de perfil ---------- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, ease: EASE }}
            className="mx-auto w-full max-w-[340px] lg:sticky lg:top-24 lg:mx-0 lg:self-start"
          >
            <PhoneFrame screenClassName="min-h-[600px] lg:min-h-[660px]">
              <div className="flex flex-1 flex-col px-7 pb-4 pt-12">
                {/* retrato grande, como foto de perfil do aparelho */}
                <div className="flex flex-col items-center text-center">
                  <span className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/foto-prof.jpeg"
                      alt="Pedro Ribeiro"
                      width={176}
                      height={176}
                      loading="lazy"
                      className="h-24 w-24 rounded-full object-cover object-top ring-2 ring-neon-500/30"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full shadow-[0_0_36px_-4px_color-mix(in_srgb,var(--color-neon-400)_55%,transparent)]"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-void bg-neon-400"
                    />
                  </span>

                  <strong className="mt-5 block font-display text-2xl font-bold tracking-tight text-ink">
                    Pedro Ribeiro
                  </strong>
                  <span className="mt-1.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-fog">
                    Jundiaí · SP
                  </span>
                </div>

                <div aria-hidden="true" className="my-7 h-px bg-ink/10" />

                <p className="text-[0.99rem] leading-[1.72] text-mist">
                  Sou desenvolvedor full stack júnior e gosto de contar essa história sem
                  atalho: comecei pela faculdade, passei por uma empresa de software do
                  setor farmacêutico e hoje divido meu tempo entre{" "}
                  <strong className="font-semibold text-neon-300">projetos próprios</strong>{" "}
                  e a <strong className="font-semibold text-neon-300">Aithos Tech</strong>,
                  a startup que cofundei.
                </p>
              </div>
            </PhoneFrame>
          </motion.div>

          {/* ---------- coluna dos marcos ---------- */}
          <div ref={trilho} className="relative pl-10 lg:pl-14">
            <ScrollLine targetRef={trilho} className="left-[7px] top-2 bottom-2 lg:left-[11px]" />

            <FloatingOrb
              size={96}
              opacity={0.8}
              duration={17}
              delay={-4}
              className="-left-6 top-[38%] -z-10 hidden lg:block"
            />
            <FloatingOrb
              size={70}
              opacity={0.7}
              duration={14}
              delay={-9}
              className="right-6 top-[72%] -z-10 hidden lg:block"
            />

            <div className="flex flex-col gap-7">
              {MARCOS.map((m, i) => (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, y: 34 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.7, delay: i * 0.06, ease: EASE }}
                  className={`relative ${m.indent}`}
                >
                  <ScrollNode className="-left-10 top-7 lg:-left-14" />

                  <GlassCard className="px-7 py-7">
                    <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-neon-400">
                      {m.when}
                    </span>
                    <h3 className="mt-2.5 font-display text-xl font-bold leading-tight tracking-tight text-ink sm:text-[1.4rem]">
                      {m.title}
                    </h3>
                    <p className="mt-3 max-w-[58ch] text-[0.96rem] leading-relaxed text-mist">
                      {m.text}
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
