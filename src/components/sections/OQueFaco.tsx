import Reveal, {
  RevealGroup,
  RevealItem,
  RevealLines,
} from "@/components/Reveal";
import SectionMark from "@/components/SectionMark";

/**
 * O QUE FAÇO — três pilares e, abaixo, o inventário de ferramentas em
 * células de 1px de fresta (o fundo do grid é a própria cor da linha).
 * No hover cada célula inverte para lima — o "flash" está no CSS
 * (.tech-tile em globals.css). A última célula, tracejada, é o que
 * estou aprendendo: inventário honesto tem lacuna visível.
 */

const PILARES = [
  {
    n: "01",
    titulo: "Interfaces",
    texto:
      "Telas responsivas e rápidas, com estados bem tratados e micro-interações que ajudam em vez de enfeitar.",
  },
  {
    n: "02",
    titulo: "APIs e dados",
    texto:
      "Backends com regra de negócio no lugar certo, autenticação e modelagem relacional pensada antes da primeira linha.",
  },
  {
    n: "03",
    titulo: "Entrega e operação",
    texto:
      "Deploy que se repete sem susto: ambientes em contêiner, versionamento disciplinado e projeto saudável depois da entrega.",
  },
];

const FERRAMENTAS = [
  { n: "01", nome: "TYPESCRIPT", papel: "ponta a ponta" },
  { n: "02", nome: "NEXT.JS", papel: "interface" },
  { n: "03", nome: "POSTGRES", papel: "dados" },
  { n: "04", nome: "PRISMA", papel: "modelagem" },
  { n: "05", nome: "DOCKER", papel: "ambiente" },
  { n: "06", nome: "NODE", papel: "servidor" },
  { n: "07", nome: "SUPABASE", papel: "auth · RLS" },
  { n: "08", nome: "TAILWIND", papel: "estilo" },
  { n: "09", nome: "AWS", papel: "infra" },
];

export default function OQueFaco() {
  return (
    <section id="pratica" className="border-t border-line bg-coal-2">
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-32 xl:px-16">
        <SectionMark numero="03" nome="O que faço" />

        <div className="mb-14 flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <h2 className="type-display text-[clamp(44px,5vw,76px)] text-ink">
            <RevealLines linhas={["O QUE EU ENTREGO", "NA PRÁTICA"]} />
          </h2>
          <Reveal delay={0.25}>
            <p className="max-w-[400px] text-[13px] text-muted [text-wrap:pretty]">
              Sem lista infinita de tecnologia: estas são as ferramentas com
              que eu trabalho de verdade, agrupadas pelo que elas resolvem.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mb-px grid gap-px border border-line bg-line md:grid-cols-3">
          {PILARES.map((pilar) => (
            <RevealItem
              key={pilar.n}
              className="flex flex-col gap-4 bg-coal px-8 py-10"
            >
              <span
                aria-hidden
                className="type-display text-[56px] leading-[0.8] [--wdth:62] [-webkit-text-stroke:1.5px_var(--color-line-2)] text-transparent"
              >
                {pilar.n}
              </span>
              <h3 className="type-display text-2xl text-ink [--wdth:82]">
                {pilar.titulo}
              </h3>
              <p className="text-[13px] text-muted [text-wrap:pretty]">
                {pilar.texto}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealGroup
          stagger={0.04}
          className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-5"
        >
          {FERRAMENTAS.map((f) => (
            <RevealItem
              key={f.n}
              className="tech-tile relative flex flex-col gap-3 bg-coal px-5 py-5"
            >
              <span aria-hidden className="absolute top-0 left-0 h-[3px] w-3 bg-lime" />
              <span className="text-[9px] tracking-[0.2em] text-faint">
                {f.n}
              </span>
              <span className="type-display text-xl leading-none text-ink [--wdth:78]">
                {f.nome}
              </span>
              <span className="type-label text-[9px] text-dim [letter-spacing:0.16em]">
                {f.papel}
              </span>
            </RevealItem>
          ))}
          <RevealItem className="relative flex flex-col gap-3 border border-dashed border-line-2 bg-coal px-5 py-5">
            <span className="text-[9px] tracking-[0.2em] text-faint">10</span>
            <span className="type-display text-xl leading-none text-faint [--wdth:78]">
              GO
            </span>
            <span className="type-label text-[9px] text-faint [letter-spacing:0.16em]">
              aprendendo
            </span>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
