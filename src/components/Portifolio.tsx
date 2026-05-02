"use client";

import { useEffect, useMemo, useState } from "react";

type Tipo = "front" | "back" | "full";
type Filtro = "all" | "front" | "full" | "api";

type Projeto = {
  id: string;
  title: string;
  desc: string;
  context: string;
  impact: string;
  decisions: string[];
  learnings: string[];
  imgSrc: string;
  type: Tipo;
  tags: string[];
  codeUrl?: string;
  demoUrl?: string;
  frontUrl?: string;
  backUrl?: string;
};

const projetos: Projeto[] = [
  {
    id: "api-petshop",
    title: "API Petshop",
    desc: "Página de gerenciamento de Petshop. Permite cadastrar, consultar e atualizar pets, clientes e serviços, integrando frontend e backend com foco em experiência do usuário.",
    context: "Agenda, clientes e serviços em uma operação que precisa ser rápida de consultar no dia a dia.",
    impact: "CRUD completo para reduzir fricção no atendimento",
    decisions: [
      "Separar frontend e backend para manter responsabilidades claras.",
      "Usar Prisma para organizar o acesso aos dados e facilitar evolução.",
      "Construir fluxos simples de cadastro, consulta e atualização.",
    ],
    learnings: [
      "Operações internas precisam priorizar velocidade de leitura.",
      "Modelagem clara evita retrabalho quando novas entidades aparecem.",
    ],
    imgSrc: "/api-petshop.png",
    type: "full",
    tags: ["React", "CSS", "Node.js", "Express", "Prisma"],
    frontUrl: "https://github.com/pedroavv1914/frontend-agendamento-petshop",
    backUrl: "https://github.com/pedroavv1914/backend-agendamento-petshop",
  },
  {
    id: "palazzo-travel",
    title: "Palazzo Travel",
    desc: "Sistema gerenciador de pacotes de viagens, permitindo cadastrar, consultar e atualizar pacotes e usuários.",
    context: "Um painel para organizar pacotes de viagem e usuários sem depender de planilhas soltas.",
    impact: "Gestão de pacotes com autenticação e banco relacional",
    decisions: [
      "Usar TypeScript para reduzir erros entre tela, rotas e dados.",
      "Aplicar JWT para proteger fluxos administrativos.",
      "Modelar dados relacionais com PostgreSQL e TypeORM.",
    ],
    learnings: [
      "Sistemas administrativos ficam melhores quando o formulário guia a operação.",
      "Autenticação precisa ser pensada desde o começo do fluxo.",
    ],
    imgSrc: "/palazzotravel.png",
    type: "full",
    tags: ["React", "TypeScript", "Vite", "React Router DOM", "Styled Components", "CSS", "Node.js", "Express", "TypeORM", "PostgreSQL", "JWT"],
    codeUrl: "https://github.com/pedroavv1914/agencia-viagens",
  },
  {
    id: "github-finder",
    title: "GitHub Finder",
    desc: "Busque e visualize perfis do GitHub de forma simples e eficiente. App moderno, responsivo e com consulta à API pública do GitHub.",
    context: "Uma busca direta para transformar dados públicos do GitHub em uma experiência simples de leitura.",
    impact: "Consulta externa com interface responsiva",
    decisions: [
      "Consumir a API pública do GitHub com feedback claro para o usuário.",
      "Manter a interface objetiva para destacar os dados do perfil.",
      "Construir responsividade sem excesso visual.",
    ],
    learnings: [
      "Estados de carregamento e erro são parte central da experiência.",
      "Integrações externas pedem cuidado com respostas vazias e inconsistentes.",
    ],
    imgSrc: "/githubfinder.png",
    type: "front",
    tags: ["CSS", "React", "TypeScript", "Vite", "API GitHub"],
    codeUrl: "https://github.com/pedroavv1914",
    demoUrl: "https://github-finder-pearl-mu.vercel.app/",
  },
  {
    id: "api-stratix",
    title: "STRATIX - Task Manager",
    desc: "Sistema completo para gerenciamento de tarefas, permitindo criar, organizar e acompanhar atividades com integração entre frontend e backend.",
    context: "Organização de tarefas com fluxo completo entre interface, API, autenticação e persistência.",
    impact: "Task manager full-stack com JWT e Prisma",
    decisions: [
      "Criar autenticação com JWT para proteger tarefas por usuário.",
      "Usar Prisma para manter a camada de dados previsível.",
      "Separar ações de criação, organização e acompanhamento.",
    ],
    learnings: [
      "Produtividade depende de pequenos detalhes de fluxo.",
      "Uma API bem separada deixa a interface mais fácil de evoluir.",
    ],
    imgSrc: "/api-stratix.png",
    type: "full",
    tags: ["React", "CSS", "TypeScript", "Vite", "Node.js", "Express", "Prisma", "JWT"],
    frontUrl: "https://github.com/pedroavv1914/frontend-task-manager",
    backUrl: "https://github.com/pedroavv1914/backend-task-manager",
  },
  {
    id: "api-shopsphere",
    title: "SHOPSPHERE - E-commerce Platform",
    desc: "Plataforma completa de e-commerce para compra e venda de produtos online, com interface moderna, busca e filtragem, carrinho e processamento seguro de pagamentos.",
    context: "Experiência de compra completa, do catálogo ao carrinho, com backend preparado para regras de negócio.",
    impact: "E-commerce com busca, carrinho e base PostgreSQL",
    decisions: [
      "Priorizar busca e filtragem para acelerar descoberta de produtos.",
      "Organizar carrinho e autenticação como fluxos centrais.",
      "Usar PostgreSQL para sustentar dados estruturados de comércio.",
    ],
    learnings: [
      "E-commerce precisa equilibrar visual, confiança e clareza de ação.",
      "Regras de negócio pedem backend bem organizado desde cedo.",
    ],
    imgSrc: "/api-shopsphere.png",
    type: "full",
    tags: ["React", "TypeScript", "PostgreSQL", "Node.js", "Express", "JWT", "Docker"],
    frontUrl: "https://github.com/pedroavv1914/frontend-api-shopSphere",
    backUrl: "https://github.com/pedroavv1914/backend-api-shopSphere",
  },
  {
    id: "projeto-babilon",
    title: "BABILON - Controle Financeiro Pessoal",
    desc: "Sistema para controle financeiro pessoal, inspirado nos princípios do livro O Homem mais rico da Babilônia.",
    context: "Projeto autoral para transformar disciplina financeira em rotina visual, acompanhável e menos intimidadora.",
    impact: "Controle financeiro com Supabase, RLS, Realtime e gráficos",
    decisions: [
      "Usar Supabase para acelerar autenticação, banco e recursos em tempo real.",
      "Aplicar RLS para proteger dados financeiros por usuário.",
      "Adicionar gráficos para transformar números em leitura visual.",
    ],
    learnings: [
      "Finanças pessoais precisam de clareza emocional, não só cálculo.",
      "Dados sensíveis exigem segurança na modelagem desde o primeiro dia.",
      "Uma boa visualização muda a forma como o usuário entende a rotina.",
    ],
    imgSrc: "/projeto-babilon.png",
    type: "full",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "PostgreSQL", "RLS", "Realtime", "Recharts", "Node.js", "Express"],
    frontUrl: "https://github.com/pedroavv1914/Babilon",
    demoUrl: "https://babiloncontrole.vercel.app/",
  },
];

const featuredProjectId = "projeto-babilon";

const filtros: Array<{ label: string; value: Filtro }> = [
  { label: "Todos", value: "all" },
  { label: "Frontend", value: "front" },
  { label: "Full-Stack", value: "full" },
  { label: "APIs", value: "api" },
];

function categoryLabel(type: Tipo) {
  if (type === "front") return "Frontend";
  if (type === "back") return "API";
  return "Full-Stack";
}

function actionLinks(project: Projeto) {
  const links: Array<{ href: string; label: string; variant: "primary" | "outline" }> = [];
  if (project.demoUrl) links.push({ href: project.demoUrl, label: "Ver projeto", variant: "primary" });
  if (project.codeUrl) links.push({ href: project.codeUrl, label: "GitHub", variant: project.demoUrl ? "outline" : "primary" });
  if (project.frontUrl) links.push({ href: project.frontUrl, label: "Frontend", variant: project.demoUrl ? "outline" : "primary" });
  if (project.backUrl) links.push({ href: project.backUrl, label: "Backend", variant: "outline" });
  return links;
}

function isApiProject(project: Projeto) {
  const searchable = [
    project.title,
    project.desc,
    project.context,
    project.impact,
    ...project.tags,
  ].join(" ").toLowerCase();

  return Boolean(project.backUrl) || /\b(api|node|express|prisma|typeorm|postgresql|supabase|jwt|rls|realtime)\b/.test(searchable);
}

function matchesFilter(project: Projeto, filter: Filtro) {
  if (filter === "all") return true;
  if (filter === "api") return isApiProject(project);
  return project.type === filter;
}

export default function Portifolio() {
  const [filter, setFilter] = useState<Filtro>("all");
  const [selectedProject, setSelectedProject] = useState<Projeto | null>(null);

  useEffect(() => {
    if (!selectedProject) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProject]);

  const filteredProjects = useMemo(() => {
    const matches = projetos.filter((project) => matchesFilter(project, filter));
    if (filter !== "all") return matches;

    return [...matches].sort((a, b) => {
      if (a.id === featuredProjectId) return -1;
      if (b.id === featuredProjectId) return 1;
      return 0;
    });
  }, [filter]);

  const filterCounts = useMemo(() => {
    return filtros.reduce<Record<Filtro, number>>((acc, item) => {
      acc[item.value] = projetos.filter((project) => matchesFilter(project, item.value)).length;
      return acc;
    }, { all: 0, front: 0, full: 0, api: 0 });
  }, []);

  return (
    <section className="section-shell" id="portifolio">
      <div className="interface">
        <div className="reveal">
          <p className="section-kicker">{"// projetos"}</p>
          <h2 className="section-title">Produtos, não vitrines</h2>
          <p className="section-lead">
            Eu gosto de projeto que explica sua própria razão de existir: o problema, a decisão técnica e o ganho de uso.
          </p>

          <div className="portfolio-filters" aria-label="Filtrar projetos">
            {filtros.map((item) => (
              <button
                className={`filter-btn ${filter === item.value ? "active" : ""}`}
                key={item.value}
                type="button"
                onClick={() => setFilter(item.value)}
              >
                <span>{item.label}</span>
                <small>{filterCounts[item.value]}</small>
              </button>
            ))}
          </div>

          <div className="project-showcase">
            {filteredProjects.map((project, index) => {
              const isFeatured = project.id === featuredProjectId && filter === "all";
              return (
                <article className={`case-card reveal-child is-visible ${isFeatured ? "is-featured" : ""}`} key={project.id}>
                  {isFeatured && (
                    <div className="featured-orbit" aria-hidden="true">
                      <span />
                      <span />
                    </div>
                  )}
                  <div className="case-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="case-media">
                    <img src={project.imgSrc} alt={`Screenshot do projeto ${project.title}`} loading="lazy" decoding="async" />
                    <span className="case-category">
                      {isFeatured && <span className="pulse-dot" aria-hidden="true" />}
                      {isFeatured ? "Projeto em destaque" : categoryLabel(project.type)}
                    </span>
                  </div>

                  <div className="case-content">
                    {isFeatured && (
                      <div className="featured-eyebrow">
                        <span className="pulse-dot" aria-hidden="true" />
                        Case autoral escolhido
                      </div>
                    )}
                    <div className="case-header">
                      <div>
                        <p className="case-impact">{project.impact}</p>
                        <h3 className="case-title">{project.title}</h3>
                      </div>
                      <button
                        className="case-arrow"
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        aria-label={`Abrir case de ${project.title}`}
                      >
                        &rarr;
                      </button>
                    </div>

                    <div className="case-body">
                      <div>
                        <span className="case-label">Problema</span>
                        <p>{project.context}</p>
                      </div>
                      <div>
                        <span className="case-label">Execução</span>
                        <p>{project.desc}</p>
                      </div>
                    </div>

                    <div className="case-stack" aria-label="Tecnologias usadas">
                      {project.tags.slice(0, isFeatured ? 8 : 5).map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>

                    {isFeatured && (
                      <div className="featured-notes" aria-label="Destaques do projeto">
                        <span>Finanças pessoais</span>
                        <span>Realtime</span>
                        <span>RLS</span>
                      </div>
                    )}

                    <div className="case-actions">
                      <button className="btn btn-primary" type="button" onClick={() => setSelectedProject(project)}>
                        Ver case
                      </button>
                      {actionLinks(project).map((link) => (
                        <a
                          className={`btn ${link.variant === "primary" ? "btn-outline" : "btn-outline"}`}
                          href={link.href}
                          key={`${project.id}-${link.label}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {selectedProject && (
        <div className="project-drawer" role="dialog" aria-modal="true" aria-labelledby="project-drawer-title">
          <button className="drawer-backdrop" type="button" aria-label="Fechar case" onClick={() => setSelectedProject(null)} />
          <aside className="drawer-panel">
            <div className="drawer-header">
              <div>
                <span className="drawer-kicker">{categoryLabel(selectedProject.type)}</span>
                <h3 id="project-drawer-title">{selectedProject.title}</h3>
              </div>
              <button className="drawer-close" type="button" onClick={() => setSelectedProject(null)} aria-label="Fechar case">
                <i className="bi bi-x-lg" aria-hidden="true" />
              </button>
            </div>

            <div className="drawer-screenshot">
              <img src={selectedProject.imgSrc} alt={`Screenshot ampliado do projeto ${selectedProject.title}`} />
            </div>

            <div className="drawer-content">
              <section>
                <span className="case-label">Problema</span>
                <p>{selectedProject.context}</p>
              </section>

              <section>
                <span className="case-label">Decisões técnicas</span>
                <ul>
                  {selectedProject.decisions.map((decision) => (
                    <li key={decision}>{decision}</li>
                  ))}
                </ul>
              </section>

              <section>
                <span className="case-label">Aprendizados</span>
                <ul>
                  {selectedProject.learnings.map((learning) => (
                    <li key={learning}>{learning}</li>
                  ))}
                </ul>
              </section>

              <section>
                <span className="case-label">Stack</span>
                <div className="case-stack">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </section>

              <div className="drawer-actions">
                {actionLinks(selectedProject).map((link) => (
                  <a
                    className={`btn ${link.variant === "primary" ? "btn-primary" : "btn-outline"}`}
                    href={link.href}
                    key={`${selectedProject.id}-drawer-${link.label}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
