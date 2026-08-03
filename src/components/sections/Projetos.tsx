import Image from "next/image";
import Reveal, { RevealLines } from "@/components/Reveal";
import SectionMark from "@/components/SectionMark";
import Shutter from "@/components/Shutter";

/**
 * PROJETOS — arquivo de registros: um destaque de página inteira
 * (Babilon), quatro fichas em grid e um registro largo fechando.
 * Cada ficha conta a mesma história em três atos — problema (só no
 * destaque), decisão e o que ficou — porque o que interessa a quem lê
 * não é a tecnologia, é o critério.
 *
 * As capturas entram dessaturadas e acendem no hover: o site inteiro é
 * monocromático + lima, e as screenshots coloridas gritariam paradas.
 */

type Ato = { rotulo: string; texto: string };

type Ficha = {
  kicker: string;
  slug: string;
  nome: string;
  imagem: string;
  atos: Ato[];
  links: { rotulo: string; href: string }[];
};

const FICHAS: Ficha[] = [
  {
    kicker: "02 · E-commerce completo",
    slug: "shopSphere",
    nome: "SHOPSPHERE",
    imagem: "/api-shopsphere.png",
    atos: [
      {
        rotulo: "A decisão",
        texto:
          "Frontend e backend em serviços independentes — API Node/Express com Postgres, JWT e Docker. Regra de negócio mora no backend, não espalhada na interface.",
      },
      {
        rotulo: "O que ficou",
        texto:
          "A parte difícil de e-commerce não é a tela, é o estado: estoque, carrinho e pagamento precisam concordar o tempo todo.",
      },
    ],
    links: [
      {
        rotulo: "Frontend ↗",
        href: "https://github.com/pedroavv1914/frontend-api-shopSphere",
      },
      {
        rotulo: "Backend ↗",
        href: "https://github.com/pedroavv1914/backend-api-shopSphere",
      },
    ],
  },
  {
    kicker: "03 · Gestão de tarefas",
    slug: "task-manager",
    nome: "STRATIX",
    imagem: "/api-stratix.png",
    atos: [
      {
        rotulo: "A decisão",
        texto:
          "Prisma como camada de dados: schema declarativo, migrations versionadas e tipos gerados que atravessam o TypeScript de ponta a ponta.",
      },
      {
        rotulo: "O que ficou",
        texto:
          "O valor de tipagem compartilhada entre banco e código: mudança no schema quebra o build antes de quebrar em produção.",
      },
    ],
    links: [
      {
        rotulo: "Frontend ↗",
        href: "https://github.com/pedroavv1914/frontend-task-manager",
      },
      {
        rotulo: "Backend ↗",
        href: "https://github.com/pedroavv1914/backend-task-manager",
      },
    ],
  },
  {
    kicker: "04 · Painel administrativo",
    slug: "agencia-viagens",
    nome: "PALAZZO TRAVEL",
    imagem: "/palazzotravel.png",
    atos: [
      {
        rotulo: "A decisão",
        texto:
          "TypeORM no lugar do Prisma — de propósito, para comparar as duas abordagens de ORM na prática. JWT nos fluxos administrativos.",
      },
      {
        rotulo: "O que ficou",
        texto:
          "A comparar ferramentas com critério próprio. Hoje sei dizer quando cada uma vale a pena.",
      },
    ],
    links: [
      {
        rotulo: "Repositório ↗",
        href: "https://github.com/pedroavv1914/agencia-viagens",
      },
    ],
  },
  {
    kicker: "05 · Operação de serviço",
    slug: "agendamento-petshop",
    nome: "API PETSHOP",
    imagem: "/api-petshop.png",
    atos: [
      {
        rotulo: "A decisão",
        texto:
          "Responsabilidades claras: API Express com Prisma cuida do CRUD de pets, clientes e serviços; a interface React foca em consulta rápida no balcão.",
      },
      {
        rotulo: "O que ficou",
        texto:
          "Fundamento bem feito: rotas REST organizadas e uma API que outra pessoa consegue ler e evoluir.",
      },
    ],
    links: [
      {
        rotulo: "Frontend ↗",
        href: "https://github.com/pedroavv1914/frontend-agendamento-petshop",
      },
      {
        rotulo: "Backend ↗",
        href: "https://github.com/pedroavv1914/backend-agendamento-petshop",
      },
    ],
  },
];

function Atos({ atos }: { atos: Ato[] }) {
  return (
    <>
      {atos.map((ato) => (
        <div key={ato.rotulo} className="flex flex-col gap-1.5">
          <span className="type-label text-[10px] text-lime [letter-spacing:0.24em]">
            {ato.rotulo}
          </span>
          <p className="text-[13px] text-muted [text-wrap:pretty]">
            {ato.texto}
          </p>
        </div>
      ))}
    </>
  );
}

function Captura({
  src,
  alt,
  sizes,
}: {
  src: string;
  alt: string;
  sizes: string;
}) {
  return (
    <Shutter>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover object-top saturate-[0.55] transition-[filter,transform] duration-500 ease-out group-hover:scale-[1.02] group-hover:saturate-100"
      />
    </Shutter>
  );
}

function Etiqueta({ nome }: { nome: string }) {
  return (
    <span className="type-label bg-chip py-[9px] pr-[18px] pl-[13px] text-[10px] text-ink [clip-path:polygon(0_0,100%_0,100%_66%,88%_100%,0_100%)] [letter-spacing:0.14em]">
      {nome}
    </span>
  );
}

export default function Projetos() {
  return (
    <section id="projetos" className="border-t border-line">
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-32 xl:px-16">
        <SectionMark numero="04" nome="Projetos" extra="06 registros" />

        <div className="mb-16 flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <h2 className="type-display text-[clamp(40px,5vw,76px)] text-ink">
            <RevealLines
              linhas={[
                "CADA PROJETO É UMA",
                <span key="o" className="type-outline">
                  HISTÓRIA DE DECISÃO
                </span>,
              ]}
            />
          </h2>
          <Reveal delay={0.25}>
            <p className="max-w-[400px] text-[13px] text-muted [text-wrap:pretty]">
              Não é vitrine de tecnologia: cada um nasceu de um problema
              concreto, exigiu uma escolha técnica e me deixou uma lição.
            </p>
          </Reveal>
        </div>

        {/* ---- destaque: Babilon ---- */}
        <Reveal className="group mb-8 border border-line bg-coal-2">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-line px-6 py-4">
            <div className="flex flex-wrap items-center gap-3.5">
              <span className="type-label bg-lime px-2.5 py-[5px] text-[10px] font-bold text-coal [letter-spacing:0.16em]">
                Destaque 01
              </span>
              <span className="type-label text-[11px] text-dim [letter-spacing:0.16em]">
                Projeto autoral · em produção
              </span>
            </div>
            <span className="hidden text-[11px] text-dim sm:inline">
              babiloncontrole.vercel.app
            </span>
          </div>
          <div className="grid lg:grid-cols-[1.15fr_1fr]">
            <div className="relative min-h-[260px] overflow-hidden border-b border-line lg:min-h-[440px] lg:border-r lg:border-b-0">
              <Captura
                src="/projeto-babilon.png"
                alt="Tela do Babilon: painel de controle financeiro"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
            <div className="flex flex-col gap-6 p-8 lg:px-10 lg:py-11">
              <h3 className="type-display text-[clamp(44px,4.5vw,64px)] leading-[0.86] text-ink">
                BABILON
              </h3>
              <Atos
                atos={[
                  {
                    rotulo: "O problema",
                    texto:
                      "Planilha não cria hábito. A ideia veio do livro “O homem mais rico da Babilônia”: transformar a rotina de controlar dinheiro em algo visual e acompanhável.",
                  },
                  {
                    rotulo: "A decisão",
                    texto:
                      "Supabase em vez de Firebase de propósito: dado financeiro é relacional. Postgres com SQL de verdade para os relatórios, Row Level Security protegendo cada usuário no próprio banco.",
                  },
                  {
                    rotulo: "O que ficou",
                    texto:
                      "Pensar segurança desde o schema, não como camada colada no final.",
                  },
                ]}
              />
              <div className="mt-auto flex flex-wrap gap-2.5">
                <Etiqueta nome="TypeScript" />
                <Etiqueta nome="Supabase" />
                <Etiqueta nome="Postgres" />
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://babiloncontrole.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="type-label bg-lime px-5 py-3.5 text-[11px] font-bold text-coal transition-colors duration-200 [letter-spacing:0.14em] hover:bg-ink"
                >
                  Ver ao vivo ↗
                </a>
                <a
                  href="https://github.com/pedroavv1914/Babilon"
                  target="_blank"
                  rel="noreferrer"
                  className="type-label border border-edge px-5 py-3.5 text-[11px] font-bold text-ink transition-colors duration-200 [letter-spacing:0.14em] hover:border-lime hover:text-lime"
                >
                  Código ↗
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-2">
          {FICHAS.map((ficha, i) => (
            <Reveal
              key={ficha.slug}
              delay={(i % 2) * 0.08}
              className="group flex flex-col border border-line bg-coal-2"
            >
              <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5">
                <span className="type-label text-[11px] text-dim [letter-spacing:0.16em]">
                  {ficha.kicker}
                </span>
                <span className="hidden text-[11px] text-faint sm:inline">
                  {ficha.slug}
                </span>
              </div>
              <div className="relative h-[230px] overflow-hidden border-b border-line">
                <Captura
                  src={ficha.imagem}
                  alt={`Tela do projeto ${ficha.nome}`}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-1 flex-col gap-5 p-8">
                <h3 className="type-display text-[38px] leading-[0.9] text-ink [--wdth:74]">
                  {ficha.nome}
                </h3>
                <Atos atos={ficha.atos} />
                <div className="mt-auto flex gap-3 border-t border-line pt-4">
                  {ficha.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="type-label text-[11px] text-lime transition-colors duration-200 [letter-spacing:0.14em] hover:text-ink"
                    >
                      {link.rotulo}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}

          {/* ---- registro largo: GitHub Finder ---- */}
          <Reveal className="group flex flex-col border border-line bg-coal-2 lg:col-span-2">
            <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5">
              <span className="type-label text-[11px] text-dim [letter-spacing:0.16em]">
                06 · Frontend · consumo de API
              </span>
              <span className="hidden text-[11px] text-faint md:inline">
                github-finder-pearl-mu.vercel.app
              </span>
            </div>
            <div className="grid lg:grid-cols-[1fr_1.2fr]">
              <div className="relative min-h-[230px] overflow-hidden border-b border-line lg:min-h-[260px] lg:border-r lg:border-b-0">
                <Captura
                  src="/githubfinder.png"
                  alt="Tela do GitHub Finder: busca de perfis"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
              <div className="flex flex-col gap-5 p-8">
                <h3 className="type-display text-[38px] leading-[0.9] text-ink [--wdth:74]">
                  GITHUB FINDER
                </h3>
                <Atos
                  atos={[
                    {
                      rotulo: "A decisão",
                      texto:
                        "Sem backend de propósito — React com Vite consumindo a API pública do GitHub, com cada estado da interface desenhado explicitamente em vez de deixado ao acaso.",
                    },
                    {
                      rotulo: "O que ficou",
                      texto:
                        "Estado de interface é design, não detalhe: loading, erro e vazio são metade da experiência de qualquer busca.",
                    },
                  ]}
                />
                <div className="mt-auto flex gap-3 border-t border-line pt-4">
                  <a
                    href="https://github-finder-pearl-mu.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="type-label text-[11px] text-lime transition-colors duration-200 [letter-spacing:0.14em] hover:text-ink"
                  >
                    Ver ao vivo ↗
                  </a>
                  <a
                    href="https://github.com/pedroavv1914"
                    target="_blank"
                    rel="noreferrer"
                    className="type-label text-[11px] text-lime transition-colors duration-200 [letter-spacing:0.14em] hover:text-ink"
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
