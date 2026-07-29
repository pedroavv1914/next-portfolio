import {
  SectionHeader,
  GlassCard,
  GhostHeadline,
  FloatingOrb,
  GridBackdrop,
  ChipRow,
  Monogram,
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/components/system";

export const metadata = {
  title: "Sistema visual — Pedro Ribeiro",
  robots: { index: false, follow: false },
};

function Spec({ name, note }: { name: string; note: string }) {
  return (
    <div className="mb-8 border-l-2 border-neon-500/40 pl-4">
      <h2 className="font-mono text-sm font-bold uppercase tracking-[0.18em] text-neon-400">
        {name}
      </h2>
      <p className="mt-1 max-w-[62ch] text-sm text-mist">{note}</p>
    </div>
  );
}

export default function SistemaPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-void pb-40">
      <GridBackdrop fade="top" opacity={0.7} />

      <div className="relative z-10 mx-auto w-[min(1160px,calc(100%-48px))] pt-24">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-fog">
          Página de validação · não indexada
        </p>
        <h1 className="mt-4 font-display text-5xl font-extrabold tracking-[-0.04em] text-ink sm:text-6xl">
          Componentes de sistema
        </h1>
        <p className="mt-4 max-w-[60ch] text-mist">
          Os seis blocos de construção isolados. Tudo que vier depois — Hero,
          Trajetória, Projetos, Processo, Contato — é composição destes.
        </p>

        {/* ---------------- SectionHeader ---------------- */}
        <section className="mt-24">
          <Spec
            name="01 · SectionHeader"
            note="Selo de abertura repetido nas seis seções: marca, numeração, linha que se desenha da esquerda para a direita, rótulo em caixa alta à direita."
          />
          <div className="space-y-10 rounded-glass border border-ink/8 bg-abyss/40 p-8">
            <SectionHeader label="Trajetória" index="02" />
            <SectionHeader label="O que faço" index="03" />
            <SectionHeader label="Projetos" index="04" />
          </div>
        </section>

        {/* ---------------- GhostHeadline ---------------- */}
        <section className="mt-24">
          <Spec
            name="02 · GhostHeadline"
            note="Tipografia gigante como elemento gráfico. variant='display' é o título sólido com gradiente verde claro → quase preto; variant='ghost' é a marca d'água translúcida que fica atrás do conteúdo, com parallax mais lento que o primeiro plano."
          />
          <div className="relative overflow-hidden rounded-glass border border-ink/8 bg-abyss/40 px-8 py-14">
            <GhostHeadline variant="ghost" className="absolute inset-x-8 top-6">
              Trajetória
            </GhostHeadline>
            <div className="relative">
              <GhostHeadline variant="display" parallax={0}>
                Pedro Ribeiro
              </GhostHeadline>
              <p className="mt-4 max-w-[46ch] text-sm text-mist">
                O texto do fundo é a mesma família em peso extremo, tracking
                apertado e opacidade baixa — dá textura sem competir com a
                leitura.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- GlassCard ---------------- */}
        <section className="mt-24">
          <Spec
            name="03 · GlassCard"
            note="Módulo flutuante. variant='glass' para blocos de conteúdo, variant='phone' com proporção e cantos de tela de celular para os objetos da composição. Halo verde segue o cursor; borda e sombra acendem no hover."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <GlassCard className="p-7">
              <h3 className="font-display text-xl font-bold text-ink">glass</h3>
              <p className="mt-2 text-sm text-mist">
                Cartão translúcido padrão. Passe o mouse: o halo verde
                acompanha o cursor e a borda esquenta.
              </p>
            </GlassCard>

            <GlassCard variant="phone" className="px-6 pb-7 pt-10">
              <h3 className="font-display text-xl font-bold text-ink">phone</h3>
              <p className="mt-2 text-sm text-mist">
                Cantos maiores e a barra de status no topo. É o formato dos
                marcos da timeline e do cartão de contato.
              </p>
            </GlassCard>

            <GlassCard interactive={false} spotlight={false} className="p-7">
              <h3 className="font-display text-xl font-bold text-ink">estático</h3>
              <p className="mt-2 text-sm text-mist">
                Sem hover e sem halo — para quando o módulo é fundo de outra
                coisa e não deve reagir.
              </p>
            </GlassCard>
          </div>
        </section>

        {/* ---------------- FloatingOrb ---------------- */}
        <section className="mt-24">
          <Spec
            name="04 · FloatingOrb"
            note="Mármore escuro com rim light verde. Flutuação infinita em CSS (transform apenas). Serve de cola entre módulos e preenche o espaço negativo — os desfocados ficam atrás de tudo."
          />
          <div className="relative h-[380px] overflow-hidden rounded-glass border border-ink/8 bg-abyss/40">
            <FloatingOrb size={260} blur={60} opacity={0.75} duration={22} className="-left-16 top-6" />
            <FloatingOrb size={150} duration={16} delay={-4} className="left-[38%] top-24" />
            <FloatingOrb size={92} duration={13} delay={-8} className="right-[22%] top-16" />
            <FloatingOrb size={200} blur={30} opacity={0.6} duration={26} delay={-2} className="-bottom-10 right-0" />
            <span className="absolute bottom-6 left-8 font-mono text-xs text-fog">
              nítido · desfocado · pequeno — ciclos de 13s a 26s, dessincronizados
            </span>
          </div>
        </section>

        {/* ---------------- IconChip ---------------- */}
        <section className="mt-24">
          <Spec
            name="05 · IconChip"
            note="Selo quadrado com o glifo da ferramenta na cor da marca, no lugar de texto em lista. Glifos desenhados no mesmo grid de 24px — para logos complexos (Postgres, AWS) uso monograma próprio em vez de reproduzir a marca de terceiros."
          />
          <div className="space-y-8 rounded-glass border border-ink/8 bg-abyss/40 p-8">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-fog">
                Só ícone (nome no title / leitor de tela)
              </p>
              <ChipRow
                items={[
                  "React", "Next.js", "TypeScript", "Tailwind", "Vite", "Node.js",
                  "Express", "PostgreSQL", "Prisma", "Supabase", "Docker", "Vercel",
                  "AWS", "Git", "JWT", "Recharts", "Styled-Components", "TypeORM", "CSS",
                ]}
              />
            </div>
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-fog">
                Com rótulo
              </p>
              <ChipRow items={["React", "PostgreSQL", "Docker", "Supabase"]} showLabel />
            </div>
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-fog">
                Pequeno (dentro de card de projeto)
              </p>
              <ChipRow items={["React", "TypeScript", "Prisma", "JWT"]} size="sm" />
            </div>
          </div>
        </section>

        {/* ---------------- Reveal ---------------- */}
        <section className="mt-24">
          <Spec
            name="06 · Reveal + RevealGroup"
            note="Entrada disparada por whileInView (IntersectionObserver), uma vez só, com stagger entre irmãos. Anima apenas opacity e transform. Quem tem prefers-reduced-motion recebe só o fade, sem deslocamento."
          />
          <RevealGroup stagger={0.12} className="grid gap-4 sm:grid-cols-4">
            {["um", "dois", "três", "quatro"].map((n, i) => (
              <RevealItem key={n}>
                <GlassCard className="grid h-28 place-items-center rounded-glass">
                  <span className="font-mono text-sm text-mist">
                    0{i + 1} · {n}
                  </span>
                </GlassCard>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Reveal direction="left">
              <GlassCard className="grid h-24 place-items-center">
                <span className="font-mono text-xs text-mist">direction=&quot;left&quot;</span>
              </GlassCard>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <GlassCard className="grid h-24 place-items-center">
                <span className="font-mono text-xs text-mist">direction=&quot;up&quot;</span>
              </GlassCard>
            </Reveal>
            <Reveal direction="right" delay={0.2}>
              <GlassCard className="grid h-24 place-items-center">
                <span className="font-mono text-xs text-mist">direction=&quot;right&quot;</span>
              </GlassCard>
            </Reveal>
          </div>
        </section>

        {/* ---------------- assinatura ---------------- */}
        <div className="mt-28 flex flex-col items-center gap-3">
          <Monogram size={26} className="text-neon-500" title="Pedro Ribeiro" />
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-fog">
            Pedro Ribeiro
          </span>
        </div>
      </div>
    </main>
  );
}
