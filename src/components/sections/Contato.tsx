import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import SectionMark from "@/components/SectionMark";
import BigType from "@/components/BigType";

/**
 * CONTATO — o chamado final na mesma tipografia colossal do hero
 * (mesmo componente SVG, mesma regra: nunca estoura a lateral),
 * e os canais no grid de frestas, sem formulário.
 */

const CANAIS = [
  {
    rotulo: "Email",
    valor: "pedroribeiro.contato1914@gmail.com",
    href: "mailto:pedroribeiro.contato1914@gmail.com",
    externo: false,
  },
  {
    rotulo: "LinkedIn",
    valor: "pedro-ribeiro ↗",
    href: "https://www.linkedin.com/in/pedro-ribeiro-a71300230/",
    externo: true,
  },
  {
    rotulo: "GitHub",
    valor: "pedroavv1914 ↗",
    href: "https://github.com/pedroavv1914",
    externo: true,
  },
  {
    rotulo: "Instagram",
    valor: "_pedroavv ↗",
    href: "https://www.instagram.com/_pedroavv/",
    externo: true,
  },
];

export default function Contato() {
  return (
    <section id="contato" className="relative overflow-hidden border-t border-line">
      <div aria-hidden className="fx-scanlines absolute inset-0" />
      <div className="relative mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-32 xl:px-16">
        <SectionMark numero="06" nome="Contato" />

        <Reveal>
          <h2 className="sr-only">Bora construir alguma coisa?</h2>
          <BigType
            className="mb-7 max-w-[1100px]"
            avanco={0.41}
            linhas={[
              { texto: "BORA CONSTRUIR" },
              { texto: "ALGUMA COISA?", outline: true },
            ]}
          />
          <p className="mb-11 max-w-[560px] text-sm text-muted [text-wrap:pretty]">
            Vaga full stack júnior, projeto para a Aithos ou só uma conversa
            sobre uma ideia — me chama direto. Sem formulário: eu leio e
            respondo.
          </p>
          <div className="mb-16 flex flex-wrap gap-3">
            <a
              href="mailto:pedroribeiro.contato1914@gmail.com"
              className="type-label bg-lime px-8 py-[18px] text-xs font-bold text-coal transition-colors duration-200 [letter-spacing:0.14em] hover:bg-ink"
            >
              Mandar um email →
            </a>
            <a
              href="https://www.linkedin.com/in/pedro-ribeiro-a71300230/"
              target="_blank"
              rel="noreferrer"
              className="type-label border border-edge px-8 py-[18px] text-xs font-bold text-ink transition-colors duration-200 [letter-spacing:0.14em] hover:border-lime hover:text-lime"
            >
              Chamar no LinkedIn
            </a>
          </div>
        </Reveal>

        <RevealGroup
          stagger={0.06}
          className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 xl:grid-cols-4"
        >
          {CANAIS.map((canal) => (
            <RevealItem key={canal.rotulo}>
              <a
                href={canal.href}
                target={canal.externo ? "_blank" : undefined}
                rel={canal.externo ? "noreferrer" : undefined}
                className="group/canal flex h-full flex-col gap-2 bg-coal p-6 transition-colors duration-300 hover:bg-panel"
              >
                <span className="type-label text-[10px] text-dim transition-colors duration-300 group-hover/canal:text-lime">
                  {canal.rotulo}
                </span>
                <span className="text-xs break-all text-ink">{canal.valor}</span>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
