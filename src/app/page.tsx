import Effects from "@/components/Effects";
import BackToTop from "@/components/BackToTop";

type Project = {
  id: string;
  kicker: string;
  name: string;
  image: string;
  problema: string;
  decisao: string;
  aprendi: string;
  stack: string[];
  links: { label: string; href: string; solid?: boolean }[];
};

const projects: Project[] = [
  {
    id: "babilon",
    kicker: "Projeto autoral · em produção",
    name: "Babilon",
    image: "/projeto-babilon.png",
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
    kicker: "E-commerce completo",
    name: "ShopSphere",
    image: "/api-shopsphere.png",
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
    kicker: "Gestão de tarefas",
    name: "Stratix",
    image: "/api-stratix.png",
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
    kicker: "Painel administrativo",
    name: "Palazzo Travel",
    image: "/palazzotravel.png",
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
    kicker: "Operação de serviço",
    name: "API Petshop",
    image: "/api-petshop.png",
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
    kicker: "Frontend · consumo de API",
    name: "GitHub Finder",
    image: "/githubfinder.png",
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

export default function Home() {
  return (
    <>
      <Effects />

      <header className="site-header">
        <div className="wrap header-inner">
          <a href="#topo" className="wordmark">
            <span className="leaf" aria-hidden="true"></span>
            Pedro Ribeiro
          </a>
          <nav className="header-nav" aria-label="Seções">
            <a href="#sobre">Trajetória</a>
            <a href="#skills">O que faço</a>
            <a href="#projetos">Projetos</a>
            <a href="#processo">Processo</a>
          </nav>
          <a href="#contato" className="header-cta">
            Falar comigo
          </a>
        </div>
      </header>

      <section className="hero" id="topo">
        <div className="hero-bg" aria-hidden="true">
          <div className="blob a"></div>
          <div className="blob b"></div>
        </div>
        <div className="wrap">
          <span className="hero-eyebrow" data-reveal>
            <span className="pulse" aria-hidden="true"></span>
            Jundiaí, SP · disponível para novos projetos
          </span>
          <h1 data-reveal data-reveal-delay="1">
            Oi, eu sou o Pedro. Construo <span className="hl">produtos web</span> de ponta a ponta.
          </h1>
          <p className="hero-sub" data-reveal data-reveal-delay="2">
            Desenvolvedor full stack, estudante de Ciência da Computação e cofundador da
            Aithos Tech. Este site é meu diário de bordo: o que estou construindo, as
            decisões que tomei no caminho e para onde estou indo.
          </p>
          <div className="hero-actions" data-reveal data-reveal-delay="3">
            <a href="#projetos" className="btn btn-primary">
              Ver os projetos <span className="arr">→</span>
            </a>
            <a href="#sobre" className="btn btn-ghost">
              Minha trajetória
            </a>
          </div>
          <div className="hero-meta" data-reveal data-reveal-delay="4">
            <a href="https://github.com/pedroavv1914" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/pedro-ribeiro-a71300230/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a href="https://www.instagram.com/_pedroavv/" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <span>React · Next.js · TypeScript · Node · PostgreSQL</span>
          </div>
        </div>
      </section>

      {/* SOBRE / TRAJETÓRIA */}
      <section className="sec" id="sobre">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <span className="sec-label">Trajetória</span>
            <h2 className="sec-title">Como eu cheguei até aqui</h2>
          </div>

          <div className="about-grid">
            <figure className="portrait-card" data-reveal="left">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/foto-prof.jpeg" alt="Pedro Ribeiro" loading="lazy" />
              <figcaption>
                <strong>Pedro Ribeiro</strong>
                <span>Jundiaí · SP</span>
              </figcaption>
            </figure>

            <div data-reveal="right" data-reveal-delay="1">
              <p className="about-intro">
                Sou desenvolvedor full stack júnior e gosto de contar essa história sem
                atalho: comecei pela faculdade, passei por uma empresa de software do setor
                farmacêutico e hoje divido meu tempo entre <strong>projetos próprios</strong>{" "}
                e a <strong>Aithos Tech</strong>, a startup que cofundei.
              </p>

              <div className="timeline">
                <div className="tl-item" data-reveal>
                  <span className="when">Em curso · 5º semestre</span>
                  <h3>Ciência da Computação — UniAnchieta</h3>
                  <p>
                    Foi onde programar deixou de ser curiosidade e virou direção. A base
                    teórica me deu vocabulário para as decisões que eu tomava no
                    improviso: estrutura de dados, banco relacional, redes.
                  </p>
                </div>
                <div className="tl-item" data-reveal>
                  <span className="when">Até julho de 2026</span>
                  <h3>Analista de Implantação — Fagron Tech</h3>
                  <p>
                    Implantar software para farmácias de manipulação me ensinou o que
                    nenhum tutorial ensina: o que acontece quando o sistema encontra o
                    usuário de verdade. Migração de dados, treinamento, suporte — vi de
                    perto onde produto bom vira produto usado. Saí para apostar de vez no
                    desenvolvimento.
                  </p>
                </div>
                <div className="tl-item" data-reveal>
                  <span className="when">Atual</span>
                  <h3>Cofundador — Aithos Tech</h3>
                  <p>
                    Na Aithos, criamos soluções digitais para pequenos e médios negócios do
                    Brasil. Aqui eu não só escrevo código: converso com cliente, levanto
                    requisito, estimo prazo e respondo pelo resultado.
                  </p>
                </div>
                <div className="tl-item" data-reveal>
                  <span className="when">Próxima parada</span>
                  <h3>Irlanda</h3>
                  <p>
                    O plano de longo prazo é ganhar mais estrada como dev e me mudar para a
                    Irlanda em alguns anos. Cada projeto desta página é um passo nessa
                    direção.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="sec tinted" id="skills">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <span className="sec-label">O que faço</span>
            <h2 className="sec-title">O que eu entrego na prática</h2>
            <p className="sec-lead">
              Sem lista infinita de tecnologia: estas são as ferramentas com que eu
              trabalho de verdade, agrupadas pelo que elas resolvem.
            </p>
          </div>

          <div className="skills-grid">
            <article className="skill-card" data-reveal>
              <div className="glyph" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 18v3" />
                </svg>
              </div>
              <h3>Interfaces</h3>
              <p>
                Telas responsivas e rápidas, com estados bem tratados e micro-interações
                que ajudam em vez de enfeitar. Do layout ao comportamento final.
              </p>
              <div className="chips">
                <span className="chip">React</span>
                <span className="chip">Next.js</span>
                <span className="chip">TypeScript</span>
                <span className="chip">Tailwind</span>
                <span className="chip">Vite</span>
              </div>
            </article>

            <article className="skill-card" data-reveal data-reveal-delay="1">
              <div className="glyph" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M21 5v14c0 1.66-4 3-9 3s-9-1.34-9-3V5" />
                  <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
                </svg>
              </div>
              <h3>APIs e dados</h3>
              <p>
                Backends com regras de negócio no lugar certo, autenticação e modelagem
                relacional pensada antes da primeira linha de código.
              </p>
              <div className="chips">
                <span className="chip">Node.js</span>
                <span className="chip">Express</span>
                <span className="chip">PostgreSQL</span>
                <span className="chip">Prisma</span>
                <span className="chip">Supabase</span>
              </div>
            </article>

            <article className="skill-card" data-reveal data-reveal-delay="2">
              <div className="glyph" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2 2 7l10 5 10-5-10-5Z" />
                  <path d="m2 17 10 5 10-5" />
                  <path d="m2 12 10 5 10-5" />
                </svg>
              </div>
              <h3>Entrega e operação</h3>
              <p>
                Deploy que se repete sem susto: ambientes em contêiner, versionamento
                disciplinado e o projeto saudável depois da primeira entrega.
              </p>
              <div className="chips">
                <span className="chip">Docker</span>
                <span className="chip">Vercel</span>
                <span className="chip">AWS</span>
                <span className="chip">Git / CI</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* PROJETOS */}
      <section className="sec" id="projetos">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <span className="sec-label">Projetos</span>
            <h2 className="sec-title">Cada projeto é uma história de decisão</h2>
            <p className="sec-lead">
              Não é vitrine de tecnologia: cada um nasceu de um problema concreto, exigiu
              uma escolha técnica e me deixou uma lição. Conto as três coisas.
            </p>
          </div>

          {projects.map((p, i) => (
            <article className={`project${i % 2 === 1 ? " flip" : ""}`} key={p.id} id={p.id}>
              <div className="project-media" data-reveal={i % 2 === 1 ? "right" : "left"}>
                <div data-parallax="14">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={`Interface do projeto ${p.name}`} loading="lazy" />
                </div>
              </div>
              <div data-reveal={i % 2 === 1 ? "left" : "right"} data-reveal-delay="1">
                <div className="project-kicker">{p.kicker}</div>
                <h3>{p.name}</h3>
                <div className="story">
                  <div className="story-row">
                    <b>O problema</b>
                    <p>{p.problema}</p>
                  </div>
                  <div className="story-row">
                    <b>A decisão</b>
                    <p>{p.decisao}</p>
                  </div>
                  <div className="story-row">
                    <b>O que ficou</b>
                    <p>{p.aprendi}</p>
                  </div>
                </div>
                <div className="chips">
                  {p.stack.map((t) => (
                    <span className="chip" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  {p.links.map((l) => (
                    <a
                      className={`plink${l.solid ? " solid" : ""}`}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      key={l.href}
                    >
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PROCESSO */}
      <section className="sec tinted" id="processo">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <span className="sec-label">Processo</span>
            <h2 className="sec-title">Como eu trabalho</h2>
            <p className="sec-lead">
              O mesmo caminho nos projetos próprios e nos da Aithos — pensado para quem
              contrata entender o andamento sem precisar ler código.
            </p>
          </div>

          <div className="steps">
            <div className="step" data-reveal>
              <h3>Entender o problema</h3>
              <p>
                Converso até conseguir explicar o problema com as minhas palavras. Só então
                escrevo escopo — curto, em linguagem que o cliente também entende.
              </p>
            </div>
            <div className="step" data-reveal data-reveal-delay="1">
              <h3>Desenhar a solução</h3>
              <p>
                Modelagem de dados, fluxos e as decisões técnicas justificadas por escrito:
                o que entra agora, o que fica para depois e por quê.
              </p>
            </div>
            <div className="step" data-reveal data-reveal-delay="2">
              <h3>Construir em ciclos curtos</h3>
              <p>
                Entregas pequenas e frequentes, com demo a cada ciclo. Quem acompanha vê o
                produto crescer, não só recebe no final.
              </p>
            </div>
            <div className="step" data-reveal data-reveal-delay="3">
              <h3>Acompanhar depois</h3>
              <p>
                Documentação, monitoramento e estrutura para evoluir. Entregar é o começo
                da conversa, não o fim.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section className="sec" id="contato">
        <div className="wrap">
          <div className="contact-card" data-reveal>
            <div className="glow" aria-hidden="true"></div>
            <h2>Bora construir alguma coisa?</h2>
            <p className="sub">
              Vaga full stack júnior, projeto para a Aithos ou só uma conversa sobre uma
              ideia — me chama direto. Sem formulário: eu leio e respondo.
            </p>
            <div className="contact-actions">
              <a className="btn btn-light" href="mailto:pedroribeiro.contato1914@gmail.com">
                Mandar um email <span className="arr">→</span>
              </a>
              <a
                className="btn btn-outline"
                href="https://www.linkedin.com/in/pedro-ribeiro-a71300230/"
                target="_blank"
                rel="noreferrer"
              >
                Chamar no LinkedIn
              </a>
            </div>
            <div className="contact-channels">
              <span>
                Email: <a href="mailto:pedroribeiro.contato1914@gmail.com">pedroribeiro.contato1914@gmail.com</a>
              </span>
              <span>
                GitHub: <a href="https://github.com/pedroavv1914" target="_blank" rel="noreferrer">pedroavv1914</a>
              </span>
              <span>
                Instagram: <a href="https://www.instagram.com/_pedroavv/" target="_blank" rel="noreferrer">_pedroavv</a>
              </span>
              <span>Jundiaí · SP · Brasil (UTC−3)</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <span>© 2026 Pedro Ribeiro — feito por mim, em Jundiaí.</span>
          <span>Next.js · TypeScript · deploy na Vercel</span>
        </div>
      </footer>

      <BackToTop />
    </>
  );
}
