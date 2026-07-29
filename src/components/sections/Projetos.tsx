"use client";

import { motion } from "motion/react";
import { EASE, VIEWPORT } from "@/lib/motion";
import SectionHeader from "@/components/system/SectionHeader";
import GhostHeadline from "@/components/system/GhostHeadline";
import GlassCard from "@/components/system/GlassCard";
import BrowserFrame from "@/components/system/BrowserFrame";
import FloatingOrb from "@/components/system/FloatingOrb";
import { ChipRow } from "@/components/system/IconChip";

/**
 * PROJETOS — seis casos, cada um num módulo glass com a captura de tela
 * invadindo a borda do card.
 *
 * A captura NÃO é filha do GlassCard: ela é irmã, posicionada por cima.
 * O card precisa de overflow:hidden para o halo do cursor e o rim light
 * não vazarem pelas quinas, e esse mesmo overflow recortaria a imagem
 * exatamente onde ela deveria transbordar. Como irmã, ela sobrepõe a
 * borda de verdade — é o que quebra o retângulo e faz virar colagem.
 *
 * Os lados alternam a cada projeto, então a leitura ziguezagueia em vez
 * de descer em coluna.
 */

type Projeto = {
  id: string;
  n: string;
  kicker: string;
  name: string;
  image: string;
  url: string;
  problema: string;
  decisao: string;
  aprendi: string;
  stack: string[];
  links: { label: string; href: string; solid?: boolean }[];
};

const PROJETOS: Projeto[] = [
  {
    id: "babilon",
    n: "01",
    kicker: "Projeto autoral · em produção",
    name: "Babilon",
    image: "/projeto-babilon.png",
    url: "babiloncontrole.vercel.app",
    problema:
      "Eu queria criar disciplina financeira de verdade, e planilha não cria hábito. A ideia veio do livro \"O homem mais rico da Babilônia\": transformar a rotina de controlar dinheiro em algo visual e acompanhável.",
    decisao:
      "Escolhi Supabase em vez de Firebase de propósito: dados financeiros são relacionais (contas, categorias, lançamentos), e eu queria Postgres com SQL de verdade para os relatórios. Row Level Security protege os dados de cada usuário no próprio banco, e o Realtime veio de brinde.",
    aprendi:
      "A pensar segurança desde o schema, não como camada colada no final. RLS mudou como eu modelo qualquer app multiusuário.",
    stack: ["React", "TypeScript", "Vite", "Tailwind", "Supabase", "PostgreSQL", "Recharts"],
    links: [
      { label: "Ver ao vivo", href: "https://babiloncontrole.vercel.app/", solid: true },
      { label: "Código no GitHub", href: "https://github.com/pedroavv1914/Babilon" },
    ],
  },
  {
    id: "shopsphere",
    n: "02",
    kicker: "E-commerce completo",
    name: "ShopSphere",
    image: "/api-shopsphere.png",
    url: "github.com/pedroavv1914/shopSphere",
    problema:
      "CRUD todo mundo faz. Eu queria entender o que sustenta uma loja de verdade: catálogo com busca e filtros, carrinho que não perde estado e um fluxo de pagamento seguro.",
    decisao:
      "Separei frontend e backend em serviços independentes — API Node/Express com PostgreSQL, autenticação JWT e Docker para o ambiente subir igual em qualquer máquina. As regras de negócio moram no backend, não espalhadas na interface.",
    aprendi:
      "Que a parte difícil de e-commerce não é a tela, é o estado: estoque, carrinho e pagamento precisam concordar entre si o tempo todo.",
    stack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Docker", "JWT"],
    links: [
      { label: "Frontend", href: "https://github.com/pedroavv1914/frontend-api-shopSphere", solid: true },
      { label: "Backend", href: "https://github.com/pedroavv1914/backend-api-shopSphere" },
    ],
  },
  {
    id: "stratix",
    n: "03",
    kicker: "Gestão de tarefas",
    name: "Stratix",
    image: "/api-stratix.png",
    url: "github.com/pedroavv1914/task-manager",
    problema:
      "Eu queria passar pelo ciclo completo de um SaaS simples: usuários se cadastram, cada um enxerga só as próprias tarefas, e os dados sobrevivem a qualquer refresh.",
    decisao:
      "Prisma como camada de dados foi a escolha central — schema declarativo, migrations versionadas e tipos gerados que atravessam o TypeScript de ponta a ponta. Autenticação com JWT por usuário.",
    aprendi:
      "O valor de tipagem compartilhada entre banco e código: uma mudança no schema quebra o build antes de quebrar em produção.",
    stack: ["React", "TypeScript", "Vite", "Node.js", "Express", "Prisma", "JWT"],
    links: [
      { label: "Frontend", href: "https://github.com/pedroavv1914/frontend-task-manager", solid: true },
      { label: "Backend", href: "https://github.com/pedroavv1914/backend-task-manager" },
    ],
  },
  {
    id: "palazzo",
    n: "04",
    kicker: "Painel administrativo",
    name: "Palazzo Travel",
    image: "/palazzotravel.png",
    url: "github.com/pedroavv1914/agencia-viagens",
    problema:
      "Uma agência de viagens organizando pacotes e clientes em planilhas soltas — o tipo de operação que a Aithos encontra direto em negócio pequeno. Faltava um painel central.",
    decisao:
      "TypeScript de ponta a ponta e TypeORM no lugar do Prisma — de propósito, para comparar as duas abordagens de ORM na prática. JWT nos fluxos administrativos e dados modelados em PostgreSQL.",
    aprendi:
      "A comparar ferramentas com critério próprio: entities e decorators do TypeORM versus o schema declarativo do Prisma. Hoje sei dizer quando cada um vale a pena.",
    stack: ["React", "TypeScript", "Styled-Components", "Node.js", "TypeORM", "PostgreSQL"],
    links: [{ label: "Repositório", href: "https://github.com/pedroavv1914/agencia-viagens", solid: true }],
  },
  {
    id: "petshop",
    n: "05",
    kicker: "Operação de serviço",
    name: "API Petshop",
    image: "/api-petshop.png",
    url: "github.com/pedroavv1914/agendamento-petshop",
    problema:
      "Um petshop precisa de leitura rápida no balcão: quem é o cliente, qual pet, qual serviço, que horas. Cadastro e consulta não podem atrapalhar o atendimento.",
    decisao:
      "Frontend e backend separados com responsabilidades claras — a API Express com Prisma cuida do CRUD de pets, clientes e serviços; a interface React foca em consulta rápida.",
    aprendi:
      "Fundamentos bem feitos: rotas REST organizadas, validação no lugar certo e uma API que outra pessoa consegue ler e evoluir.",
    stack: ["React", "Node.js", "Express", "Prisma", "CSS"],
    links: [
      { label: "Frontend", href: "https://github.com/pedroavv1914/frontend-agendamento-petshop", solid: true },
      { label: "Backend", href: "https://github.com/pedroavv1914/backend-agendamento-petshop" },
    ],
  },
  {
    id: "githubfinder",
    n: "06",
    kicker: "Frontend · consumo de API",
    name: "GitHub Finder",
    image: "/githubfinder.png",
    url: "github-finder-pearl-mu.vercel.app",
    problema:
      "Busca de perfis do GitHub parece trivial até você tratar o que acontece entre o clique e a resposta: carregando, erro, usuário inexistente, lista vazia.",
    decisao:
      "Sem backend de propósito — React com Vite consumindo a API pública do GitHub, com cada estado da interface desenhado explicitamente em vez de deixado ao acaso.",
    aprendi:
      "Que estado de interface é design, não detalhe: loading, erro e vazio são metade da experiência de qualquer busca.",
    stack: ["React", "TypeScript", "Vite", "API do GitHub"],
    links: [
      { label: "Ver ao vivo", href: "https://github-finder-pearl-mu.vercel.app/", solid: true },
      { label: "GitHub", href: "https://github.com/pedroavv1914" },
    ],
  },
];

function Historia({ label, children }: { label: string; children: string }) {
  return (
    <div className="grid gap-1.5 sm:grid-cols-[104px_1fr] sm:gap-4">
      <span className="pt-0.5 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-neon-400">
        {label}
      </span>
      <p className="text-[0.94rem] leading-relaxed text-mist">{children}</p>
    </div>
  );
}

/** Versão em coluna, para o destaque: rótulo em cima, texto embaixo. */
function HistoriaColuna({ label, children }: { label: string; children: string }) {
  return (
    <div className="relative pl-5">
      <span
        aria-hidden="true"
        className="absolute left-0 top-1.5 h-[calc(100%-12px)] w-px bg-gradient-to-b from-neon-500/60 to-transparent"
      />
      <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-neon-400">
        {label}
      </span>
      <p className="mt-2.5 text-[0.93rem] leading-relaxed text-mist">{children}</p>
    </div>
  );
}

function BotaoLink({ label, href, solid }: { label: string; href: string; solid?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={
        solid
          ? "group inline-flex items-center gap-2 rounded-full bg-neon-500 px-5 py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-void transition-[transform,box-shadow,background] duration-300 hover:-translate-y-0.5 hover:bg-neon-400 hover:shadow-[0_0_26px_-6px_var(--color-neon-400)]"
          : "group inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-mist transition-[color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-neon-500/50 hover:text-ink"
      }
    >
      {label}
      <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        ↗
      </span>
    </a>
  );
}

/**
 * O projeto de destaque tem LAYOUT PRÓPRIO, não é o mesmo card ampliado.
 *
 * Ele ocupa a largura toda: identidade e ações na coluna esquerda, a
 * captura entrando por cima pela direita, e as três histórias abertas em
 * colunas no rodapé. Nos outros cinco a história é uma lista vertical ao
 * lado da imagem — aqui ela vira a base da peça. A diferença de
 * ESTRUTURA é o que comunica hierarquia; tamanho maior sozinho só
 * pareceria um card que cresceu.
 */
function ProjetoDestaque({ p }: { p: Projeto }) {
  return (
    <article id={p.id} className="relative lg:mb-14">
      <FloatingOrb
        size={170}
        opacity={0.85}
        duration={19}
        className="-left-16 -top-12 -z-10 hidden lg:block"
      />
      <FloatingOrb
        size={110}
        opacity={0.8}
        duration={15}
        delay={-6}
        className="-right-10 bottom-24 -z-10 hidden lg:block"
      />

      <motion.div
        initial={{ opacity: 0, y: 44 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.85, ease: EASE }}
      >
        <GlassCard className="p-7 ring-1 ring-neon-500/20 sm:p-10 lg:p-12 shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-neon-400)_24%,transparent),0_50px_120px_-45px_color-mix(in_srgb,var(--color-neon-600)_65%,transparent)]">
          <div className="flex items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-neon-500/30 bg-neon-500/10 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-neon-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-400 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neon-400" />
              </span>
              Destaque
            </span>
            <span className="font-mono text-[0.7rem] tracking-[0.2em] text-fog">{p.n}</span>
          </div>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-6">
            {/* identidade e ações */}
            <div className="relative z-20">
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-neon-400">
                {p.kicker}
              </span>
              <h3 className="mt-3 font-poster text-[clamp(2.6rem,6.5vw,4.6rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.045em] text-ink">
                {p.name}
              </h3>

              <div aria-hidden="true" className="mt-7 h-px w-24 bg-neon-500/45" />

              <ChipRow items={p.stack} size="sm" className="mt-7" />

              <div className="mt-8 flex flex-wrap gap-3">
                {p.links.map((l) => (
                  <BotaoLink key={l.href} {...l} />
                ))}
              </div>
            </div>

            {/* captura — sai para fora da borda direita do módulo */}
            <div className="relative z-10 lg:-mr-24">
              <BrowserFrame
                src={p.image}
                alt={`Interface do projeto ${p.name}`}
                label={p.url}
                aspect="16/10"
                eager
                className="shadow-[0_50px_120px_-40px_color-mix(in_srgb,var(--color-neon-700)_55%,rgba(0,0,0,0.95))]"
              />
            </div>
          </div>

          {/* as três histórias, abertas em colunas */}
          <div aria-hidden="true" className="mt-12 h-px bg-ink/10" />
          <div className="mt-9 grid gap-8 md:grid-cols-3 md:gap-7">
            <HistoriaColuna label="O problema">{p.problema}</HistoriaColuna>
            <HistoriaColuna label="A decisão">{p.decisao}</HistoriaColuna>
            <HistoriaColuna label="O que ficou">{p.aprendi}</HistoriaColuna>
          </div>
        </GlassCard>
      </motion.div>
    </article>
  );
}

export default function Projetos() {
  return (
    <section id="projetos" className="relative isolate overflow-hidden py-28 lg:py-36">
      <FloatingOrb size={440} blur={80} opacity={0.38} duration={30} className="-left-44 top-32 -z-20" />
      <FloatingOrb size={340} blur={70} opacity={0.34} duration={26} delay={-11} className="-right-32 top-[55%] -z-20" />

      <GhostHeadline
        variant="ghost"
        parallax={90}
        className="absolute inset-x-0 top-16 -z-10"
      >
        Projetos
      </GhostHeadline>

      <div className="relative mx-auto w-[min(1160px,calc(100%-48px))]">
        <SectionHeader label="Projetos" index="04" />

        <div className="mt-10 max-w-[62ch]">
          <motion.h2
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-display text-[clamp(2rem,5vw,3.6rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-ink"
          >
            Cada projeto é uma{" "}
            <span className="sys-gradient-text-bright">história de decisão</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            className="mt-5 text-[1.02rem] leading-relaxed text-mist"
          >
            Não é vitrine de tecnologia: cada um nasceu de um problema concreto, exigiu uma
            escolha técnica e me deixou uma lição. Conto as três coisas.
          </motion.p>
        </div>

        <div className="mt-20 flex flex-col gap-24 lg:gap-32">
          <ProjetoDestaque p={PROJETOS[0]} />

          {PROJETOS.slice(1).map((p, i) => {
            // slice(1) reinicia o índice, então a paridade inverte: o
            // projeto 02 precisa continuar sendo o primeiro espelhado.
            const invertido = i % 2 === 0;
            return (
              <article key={p.id} id={p.id} className="relative">
                <div
                  className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-0 ${
                    invertido ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* CAPTURA — irmã do card, sobrepõe a borda dele */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className={`relative z-20 ${invertido ? "lg:-ml-16" : "lg:-mr-16"}`}
                  >
                    <BrowserFrame
                      src={p.image}
                      alt={`Interface do projeto ${p.name}`}
                      label={p.url}
                    />

                    <FloatingOrb
                      size={104}
                      opacity={0.85}
                      duration={18}
                      delay={-i * 2}
                      className={`-z-10 hidden lg:block ${
                        invertido ? "-right-12 -top-10" : "-left-12 -top-10"
                      }`}
                    />
                  </motion.div>

                  {/* MÓDULO — recebe a captura por cima da sua borda */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
                    className="relative z-10"
                  >
                    <GlassCard
                      className={`p-7 lg:py-12 ${
                        invertido ? "lg:pl-10 lg:pr-24" : "lg:pl-24 lg:pr-10"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-neon-400">
                          {p.kicker}
                        </span>
                        <span className="font-mono text-[0.7rem] tracking-[0.2em] text-fog">
                          {p.n}
                        </span>
                      </div>

                      <h3 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold tracking-[-0.03em] text-ink">
                        {p.name}
                      </h3>

                      <div className="mt-6 flex flex-col gap-4">
                        <Historia label="O problema">{p.problema}</Historia>
                        <Historia label="A decisão">{p.decisao}</Historia>
                        <Historia label="O que ficou">{p.aprendi}</Historia>
                      </div>

                      <div aria-hidden="true" className="mt-7 h-px bg-ink/8" />

                      <ChipRow items={p.stack} size="sm" className="mt-6" />

                      <div className="mt-7 flex flex-wrap gap-3">
                        {p.links.map((l) => (
                          <BotaoLink key={l.href} {...l} />
                        ))}
                      </div>
                    </GlassCard>
                  </motion.div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
