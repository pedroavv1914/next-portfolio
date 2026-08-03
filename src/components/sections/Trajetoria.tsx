import Image from "next/image";
import Reveal, { RevealLines } from "@/components/Reveal";
import SectionMark from "@/components/SectionMark";

/**
 * TRAJETÓRIA — coluna esquerda presa (sticky) com o título e a bio,
 * timeline descendo à direita. A linha vertical e os nós quadrados
 * escurecem no passado e acendem em lima no marco atual: a hierarquia
 * vem da COR do tempo, não do tamanho dos blocos.
 */

const MARCOS = [
  {
    quando: "Em curso · 5º semestre",
    titulo: "Ciência da Computação — UniAnchieta",
    texto:
      "Foi onde programar deixou de ser curiosidade e virou direção. A base teórica me deu vocabulário para as decisões que eu tomava no improviso: estrutura de dados, banco relacional, redes.",
    no: "bg-edge",
    linha: "border-line",
  },
  {
    quando: "Até julho de 2026",
    titulo: "Analista de Implantação — Fagron Tech",
    texto:
      "Implantar software para farmácias de manipulação me ensinou o que nenhum tutorial ensina: o que acontece quando o sistema encontra o usuário de verdade. Migração de dados, treinamento, suporte — vi de perto onde produto bom vira produto usado.",
    no: "bg-[#6B7A5E]",
    linha: "border-line",
  },
  {
    quando: "Atual",
    titulo: "Cofundador — Aithos Tech",
    texto:
      "Criamos soluções digitais para pequenos e médios negócios do Brasil. Aqui eu não só escrevo código: converso com cliente, levanto requisito, estimo prazo e respondo pelo resultado.",
    no: "bg-lime",
    linha: "border-lime",
    atual: true,
  },
];

export default function Trajetoria() {
  return (
    <section
      id="trajetoria"
      className="mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-32 xl:px-16"
    >
      <SectionMark numero="02" nome="Trajetória" />

      <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6 lg:sticky lg:top-28">
          <h2 className="type-display text-[clamp(44px,5vw,76px)] text-ink">
            <RevealLines
              linhas={[
                "COMO EU",
                "CHEGUEI",
                <span key="o" className="type-outline">
                  ATÉ AQUI
                </span>,
              ]}
            />
          </h2>
          <Reveal delay={0.2}>
            <p className="max-w-[420px] text-[13px] text-muted [text-wrap:pretty]">
              Sem atalho: comecei pela faculdade, passei por uma empresa de
              software do setor farmacêutico e hoje divido meu tempo entre{" "}
              <span className="text-ink">projetos próprios</span> e a{" "}
              <span className="text-ink">Aithos Tech</span>, a startup que
              cofundei.
            </p>
          </Reveal>
          <Reveal
            delay={0.3}
            className="flex max-w-[420px] items-center gap-3.5 border border-line bg-panel p-4"
          >
            <div className="relative size-11 flex-none overflow-hidden border border-line-2">
              <Image
                src="/foto-prof.jpeg"
                alt="Retrato de Pedro Ribeiro"
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-[3px]">
              <span className="text-xs text-ink">Pedro Ribeiro</span>
              <span className="type-label text-[10px] text-dim [letter-spacing:0.14em]">
                Full stack júnior
              </span>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col">
          {MARCOS.map((marco, i) => (
            <Reveal
              key={marco.titulo}
              delay={i * 0.08}
              className={`relative border-l ${marco.linha} ${
                i < MARCOS.length - 1 ? "pb-11" : ""
              } pl-8`}
            >
              <span
                aria-hidden
                className={`absolute top-1.5 ${
                  marco.atual
                    ? "-left-1.5 size-[11px]"
                    : "-left-[5px] size-[9px]"
                } ${marco.no}`}
              />
              <span
                className={`type-label text-[10px] ${
                  marco.atual ? "text-lime" : "text-dim"
                }`}
              >
                {marco.quando}
              </span>
              <h3 className="type-display mt-2.5 mb-3 text-[26px] leading-[1.1] text-ink [--wdth:82]">
                {marco.titulo}
              </h3>
              <p className="text-[13px] text-muted [text-wrap:pretty]">
                {marco.texto}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
