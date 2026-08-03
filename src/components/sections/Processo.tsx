import Reveal, {
  RevealGroup,
  RevealItem,
  RevealLines,
} from "@/components/Reveal";
import SectionMark from "@/components/SectionMark";

/**
 * PROCESSO — quatro etapas no mesmo grid de frestas do inventário.
 * Só o número da primeira é lima cheio; os demais ficam no contorno
 * apagado: o método começa aceso e o resto é consequência.
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
      "Modelagem de dados, fluxos e decisões técnicas justificadas por escrito: o que entra agora, o que fica para depois e por quê.",
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
  return (
    <section id="processo" className="border-t border-line bg-coal-2">
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-32 xl:px-16">
        <SectionMark numero="05" nome="Processo" />

        <div className="mb-14 flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <h2 className="type-display text-[clamp(44px,5vw,76px)] text-ink">
            <RevealLines linhas={["COMO EU TRABALHO"]} />
          </h2>
          <Reveal delay={0.25}>
            <p className="max-w-[400px] text-[13px] text-muted [text-wrap:pretty]">
              O mesmo caminho nos projetos próprios e nos da Aithos — pensado
              para quem contrata entender o andamento sem precisar ler código.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="grid gap-px border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
          {ETAPAS.map((etapa, i) => (
            <RevealItem
              key={etapa.n}
              className="flex flex-col gap-3.5 bg-coal px-7 py-9"
            >
              <span
                aria-hidden
                className={`type-display text-[44px] leading-[0.8] [--wdth:62] ${
                  i === 0
                    ? "text-lime"
                    : "text-transparent [-webkit-text-stroke:1.5px_var(--color-line-2)]"
                }`}
              >
                {etapa.n}
              </span>
              <h3 className="type-display text-xl text-ink [--wdth:84]">
                {etapa.titulo}
              </h3>
              <p className="text-xs leading-[1.9] text-muted [text-wrap:pretty]">
                {etapa.texto}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
