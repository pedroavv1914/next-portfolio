"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { EASE } from "@/lib/motion";
import BigType from "@/components/BigType";

/**
 * HERO — capa de diário de bordo: índice, carimbo de hora, o nome em
 * tipografia colossal e um terminal digitando por cima.
 *
 * O nome são DOIS SVGs empilhados, não um: o terminal precisa entrar
 * ENTRE as camadas (acima de PEDRO, abaixo do contorno de RIBEIRO), e
 * só com elementos separados existe z-index para isso. A largura de
 * PEDRO é 5/7 da de RIBEIRO — a fração exata das contagens de letras,
 * o que deixa as duas linhas com o mesmo corpo sem medir fonte nenhuma.
 */

const TICKER =
  "React ✳ Next.js ✳ TypeScript ✳ Node ✳ PostgreSQL ✳ Prisma ✳ Supabase ✳ Docker ✳ AWS ✳ Tailwind ✳ ";

const TERMINAL = [
  "$ whoami\n",
  "pedro ribeiro — full stack, jundiaí/sp\n",
  "$ stack\n",
  "typescript · node · postgres · docker\n",
  "$ status → aberto a vaga júnior",
].join("");

/** Digitação em loop: escreve, respira no fim, recomeça. */
function useTyper(texto: string) {
  const [corte, setCorte] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCorte(texto.length);
      return;
    }
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const passo = () => {
      i += 1;
      setCorte(i);
      if (i >= texto.length) {
        // Pausa com o texto completo antes de limpar — sem ela o loop
        // parece um bug, não uma animação.
        timer = setTimeout(() => {
          i = 0;
          setCorte(0);
          timer = setTimeout(passo, 400);
        }, 3200);
        return;
      }
      timer = setTimeout(passo, 34);
    };
    timer = setTimeout(passo, 600);
    return () => clearTimeout(timer);
  }, [texto]);

  return texto.slice(0, corte);
}

function useRelogio() {
  const [hora, setHora] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setHora(
        `${String(d.getHours()).padStart(2, "0")}:${String(
          d.getMinutes()
        ).padStart(2, "0")}`
      );
    };
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, []);
  return hora;
}

const entrada = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Subida de dentro da máscara — usada nas duas linhas do nome. */
const subida = {
  hidden: { y: "62%" },
  show: { y: "0%", transition: { duration: 0.95, ease: EASE } },
};

export default function Hero() {
  const digitado = useTyper(TERMINAL);
  const hora = useRelogio();

  return (
    <header
      id="topo"
      className="relative flex min-h-[calc(100svh-63px)] flex-col justify-center overflow-hidden"
    >
      {/* fundo: scanlines + colunas fantasma + um sopro de lima */}
      <div aria-hidden className="fx-scanlines absolute inset-0" />
      <div aria-hidden className="fx-columns absolute inset-0" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(90%_70%_at_30%_40%,rgba(195,255,62,0.06),transparent_70%)]"
      />

      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        className="relative mx-auto w-full max-w-[1440px] px-6 pt-12 pb-24 md:px-12 md:pb-32 xl:px-16"
      >
        {/* linha de status */}
        <motion.div
          variants={entrada}
          className="mb-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-2"
        >
          <span className="type-label text-dim">
            01 / Índice — diário de bordo
          </span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="type-label text-dim" suppressHydrationWarning>
              Jundiaí · SP — UTC−3 {hora}
            </span>
            <span className="type-label flex items-center gap-2 text-lime">
              <span aria-hidden className="fx-blink-slow size-[7px] bg-lime" />
              Disponível
            </span>
          </div>
        </motion.div>

        {/* o nome + o terminal entre as camadas */}
        <div className="relative">
          <h1 className="sr-only">Pedro Ribeiro — desenvolvedor full stack</h1>

          {/* As larguras dos dois quadros seguem a razão das larguras
              NATURAIS das palavras (5×0.45 / 7×0.39 ≈ 0.82): é isso
              que deixa as duas linhas com a mesma altura de glifo. Os
              avanços ficam ~5% ABAIXO do medido de propósito — sobra
              vira compressão, nunca fresta entre letras. Cada linha
              nasce de dentro de uma máscara, como os títulos de seção. */}
          <motion.div
            variants={entrada}
            className="relative z-[2] w-[82%] overflow-hidden lg:w-[59%]"
          >
            <motion.div variants={subida}>
              <BigType linhas={[{ texto: "PEDRO" }]} avanco={0.45} />
            </motion.div>
          </motion.div>

          <motion.div
            variants={entrada}
            className="relative z-[4] mt-[0.8vw] w-full overflow-hidden lg:w-[72%]"
          >
            <motion.div variants={subida}>
              <BigType
                linhas={[{ texto: "RIBEIRO", outline: true }]}
                avanco={0.39}
              />
            </motion.div>
          </motion.div>

          <motion.div
            variants={entrada}
            className="z-[3] mt-10 flex w-full max-w-[600px] rotate-0 flex-col gap-3.5 lg:absolute lg:-top-4 lg:right-0 lg:mt-0 lg:w-[min(600px,46vw)] lg:-rotate-[1.2deg]"
          >
            <div className="flex flex-wrap gap-2.5 lg:justify-end">
              <span className="type-label border border-line-2 bg-coal px-3 py-[7px] text-[10px] text-muted [letter-spacing:0.14em]">
                6 projetos
              </span>
              <span className="type-label border border-line-2 bg-coal px-3 py-[7px] text-[10px] text-muted [letter-spacing:0.14em]">
                5º semestre CC
              </span>
              <span className="type-label border border-lime bg-coal px-3 py-[7px] text-[10px] text-lime [letter-spacing:0.14em]">
                Aberto a vagas
              </span>
            </div>

            <div
              role="img"
              aria-label="Terminal digitando: whoami — pedro ribeiro, full stack em Jundiaí; stack — typescript, node, postgres, docker; status — aberto a vaga júnior"
              className="border border-line-2 bg-panel shadow-[22px_22px_0_rgba(0,0,0,0.55)]"
            >
              <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <span className="type-label text-[10px] text-dim [letter-spacing:0.18em]">
                  ~/pedro — zsh
                </span>
                <div aria-hidden className="flex gap-1.5">
                  <span className="size-2 bg-line-2" />
                  <span className="size-2 bg-line-2" />
                  <span className="size-2 bg-lime" />
                </div>
              </div>
              <div
                aria-hidden
                className="h-44 overflow-hidden p-5 text-sm leading-[1.9] whitespace-pre-wrap text-muted"
              >
                {digitado}
                <span className="fx-blink -mb-0.5 inline-block h-[15px] w-[9px] bg-lime align-[-2px]" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* rodapé do palco: metadados + ações */}
        <motion.div
          variants={entrada}
          className="mt-14 flex flex-wrap items-end justify-between gap-x-10 gap-y-8 border-t border-line pt-6"
        >
          <dl className="flex flex-wrap gap-x-12 gap-y-5">
            {[
              ["Base", "Jundiaí · SP"],
              ["Foco", "Full stack · TypeScript"],
              ["Hoje", "Cofundador · Aithos Tech"],
            ].map(([rotulo, valor]) => (
              <div key={rotulo} className="flex flex-col gap-1.5">
                <dt className="type-label text-[10px] text-dim">{rotulo}</dt>
                <dd className="text-sm text-ink">{valor}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap gap-3">
            <a
              href="#projetos"
              className="type-label bg-lime px-7 py-4 text-xs font-bold text-coal transition-colors duration-200 [letter-spacing:0.14em] hover:bg-ink"
            >
              Ver os projetos ↓
            </a>
            <a
              href="https://github.com/pedroavv1914"
              target="_blank"
              rel="noreferrer"
              className="type-label border border-edge px-7 py-4 text-xs font-bold text-ink transition-colors duration-200 [letter-spacing:0.14em] hover:border-lime hover:text-lime"
            >
              GitHub ↗
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* fita de tecnologias */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 flex h-12 items-center overflow-hidden border-t border-line bg-coal"
      >
        <div className="fx-ticker flex gap-11 pl-6 whitespace-nowrap md:pl-16">
          <span className="type-label text-dim">{TICKER.repeat(2)}</span>
          <span className="type-label text-dim">{TICKER.repeat(2)}</span>
        </div>
      </div>
    </header>
  );
}
