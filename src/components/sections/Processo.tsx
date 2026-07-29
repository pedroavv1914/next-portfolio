"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { EASE, VIEWPORT } from "@/lib/motion";
import SectionHeader from "@/components/system/SectionHeader";
import GhostHeadline from "@/components/system/GhostHeadline";
import GlassCard from "@/components/system/GlassCard";
import FloatingOrb from "@/components/system/FloatingOrb";
import ScrollLine, { ScrollNode } from "@/components/system/ScrollLine";

/**
 * PROCESSO — quatro etapas em fileira, ligadas por uma linha que se
 * desenha da esquerda para a direita conforme o scroll.
 *
 * A conexão é HORIZONTAL de propósito. A Trajetória já usa a linha
 * vertical, e repetir o mesmo desenho apagaria a diferença entre as
 * duas: lá é uma história que desce no tempo, aqui é um método que
 * avança em etapas. A direção da linha carrega esse significado.
 *
 * O número de cada etapa aparece duas vezes: colossal e translúcido ao
 * fundo do módulo, servindo de textura, e pequeno em mono ao lado do
 * título, para leitura. É o mesmo recurso das marcas d'água das seções,
 * na escala do card.
 */

const ETAPAS = [
  {
    n: "01",
    titulo: "Entender o problema",
    texto:
      "Converso até conseguir explicar o problema com as minhas palavras. Só então escrevo escopo — curto, em linguagem que o cliente também entende.",
  },
  {
    n: "02",
    titulo: "Desenhar a solução",
    texto:
      "Modelagem de dados, fluxos e as decisões técnicas justificadas por escrito: o que entra agora, o que fica para depois e por quê.",
  },
  {
    n: "03",
    titulo: "Construir em ciclos curtos",
    texto:
      "Entregas pequenas e frequentes, com demo a cada ciclo. Quem acompanha vê o produto crescer, não só recebe no final.",
  },
  {
    n: "04",
    titulo: "Acompanhar depois",
    texto:
      "Documentação, monitoramento e estrutura para evoluir. Entregar é o começo da conversa, não o fim.",
  },
];

export default function Processo() {
  const trilho = useRef<HTMLDivElement>(null);

  return (
    <section id="processo" className="relative isolate overflow-hidden py-28 lg:py-36">
      <FloatingOrb size={400} blur={78} opacity={0.38} duration={28} className="-right-40 top-16 -z-20" />
      <FloatingOrb size={280} blur={62} opacity={0.32} duration={24} delay={-10} className="-left-28 bottom-10 -z-20" />

      <GhostHeadline variant="ghost" parallax={90} className="absolute inset-x-0 top-16 -z-10">
        Processo
      </GhostHeadline>

      <div className="relative mx-auto w-[min(1160px,calc(100%-48px))]">
        <SectionHeader label="Processo" index="05" />

        <div className="mt-10 max-w-[62ch]">
          <motion.h2
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-display text-[clamp(2rem,5vw,3.6rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-ink"
          >
            Como eu <span className="sys-gradient-text-bright">trabalho</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            className="mt-5 text-[1.02rem] leading-relaxed text-mist"
          >
            O mesmo caminho nos projetos próprios e nos da Aithos — pensado para quem
            contrata entender o andamento sem precisar ler código.
          </motion.p>
        </div>

        <div ref={trilho} className="relative mt-20">
          {/* trilho horizontal: nasce no centro do 1º nó e morre no do 4º,
              por isso a margem lateral de 1/8 da largura de cada coluna */}
          <ScrollLine
            targetRef={trilho}
            direction="horizontal"
            className="left-[12.5%] right-[12.5%] top-[7px] hidden lg:block"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {ETAPAS.map((e, i) => (
              <motion.div
                key={e.n}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                className="relative"
              >
                <ScrollNode className="left-1/2 top-0 hidden -translate-x-1/2 lg:block" />

                <GlassCard className="h-full overflow-hidden p-7 lg:mt-9">
                  {/* número colossal como textura de fundo do módulo */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-3 -top-6 select-none font-poster text-[7rem] font-extrabold leading-none text-ink/[0.045]"
                  >
                    {e.n}
                  </span>

                  <div className="relative flex items-center gap-3">
                    <span className="font-mono text-[0.7rem] tracking-[0.2em] text-neon-400">
                      {e.n}
                    </span>
                    <span aria-hidden="true" className="h-px flex-1 bg-ink/10" />
                  </div>

                  <h3 className="relative mt-5 font-display text-[1.18rem] font-bold leading-snug tracking-tight text-ink">
                    {e.titulo}
                  </h3>
                  <p className="relative mt-3 text-[0.93rem] leading-relaxed text-mist">
                    {e.texto}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
