"use client";
import { useCallback, useState } from "react";

export default function Portifolio() {
  type Filtro = "all" | "front" | "back" | "full";
  const [filtro, setFiltro] = useState<Filtro>("all");

  const selecionar = useCallback((novo: Filtro) => setFiltro(novo), []);
  const visivel = useCallback((tipo: "front" | "back" | "full") => {
    return filtro === "all" || filtro === tipo;
  }, [filtro]);

  type Projeto = {
    id: string;
    title: string;
    desc: string;
    imgSrc: string;
    type: "front" | "back" | "full";
    tags: string[];
    codeUrl?: string;
    demoUrl?: string;
  };

  const projetos: Projeto[] = [
    {
      id: "api-petshop",
      title: "API Petshop",
      desc: "API REST para gestão de petshop com autenticação e CRUD completo.",
      imgSrc: "/api-petshop.png",
      type: "back",
      tags: ["Node.js", "Express", "MongoDB"],
      codeUrl: "https://github.com/pedroavv1914",
    },
    {
      id: "api-shopsphere",
      title: "API ShopSphere",
      desc: "API de e-commerce com carrinho, pedidos e pagamentos.",
      imgSrc: "/api-shopsphere.png",
      type: "back",
      tags: ["Node.js", "Prisma", "PostgreSQL"],
      codeUrl: "https://github.com/pedroavv1914",
    },
    {
      id: "api-stratix",
      title: "API Stratix",
      desc: "Serviços de catálogo com autenticação JWT e documentação Swagger.",
      imgSrc: "/api-stratix.png",
      type: "back",
      tags: ["Node.js", "Express", "JWT"],
      codeUrl: "https://github.com/pedroavv1914",
    },
    {
      id: "github-finder",
      title: "GitHub Finder",
      desc: "Busca perfis do GitHub com UI moderna e responsiva.",
      imgSrc: "/githubfinder.png",
      type: "front",
      tags: ["React", "TypeScript"],
      codeUrl: "https://github.com/pedroavv1914",
    },
    {
      id: "palazzo-travel",
      title: "Palazzo Travel",
      desc: "Landing page de viagens com efeitos e animações sutis.",
      imgSrc: "/palazzotravel.png",
      type: "front",
      tags: ["HTML", "CSS", "JS"],
      codeUrl: "https://github.com/pedroavv1914",
    },
    {
      id: "projeto-loja",
      title: "Projeto Loja",
      desc: "Protótipo de loja virtual com páginas de produto e carrinho.",
      imgSrc: "/projetoloja.png",
      type: "front",
      tags: ["HTML", "CSS", "JS"],
      codeUrl: "https://github.com/pedroavv1914",
    },
    {
      id: "cadastro-usuarios",
      title: "Cadastro de Usuários",
      desc: "CRUD de usuários com validação e persistência.",
      imgSrc: "/cadastrodeusuarios.png",
      type: "back",
      tags: ["Node.js", "Express", "SQLite"],
      codeUrl: "https://github.com/pedroavv1914",
    },
  ];

  return (
    <section className="portifolio" id="portifolio">
      <div className="interface">
        <h2 className="titulo">MEU <span>PORTIFÓLIO.</span></h2>

        <div className="filtros-projetos" role="tablist" aria-label="Filtros de projetos">
          <button
            className={`filtro ${filtro === "all" ? "ativo" : ""}`}
            role="tab"
            aria-selected={filtro === "all"}
            data-filter="all"
            onClick={() => selecionar("all")}
          >Todos</button>
          <button
            className={`filtro ${filtro === "front" ? "ativo" : ""}`}
            role="tab"
            aria-selected={filtro === "front"}
            data-filter="front"
            onClick={() => selecionar("front")}
          >Front-end</button>
          <button
            className={`filtro ${filtro === "back" ? "ativo" : ""}`}
            role="tab"
            aria-selected={filtro === "back"}
            data-filter="back"
            onClick={() => selecionar("back")}
          >Back-end</button>
          <button
            className={`filtro ${filtro === "full" ? "ativo" : ""}`}
            role="tab"
            aria-selected={filtro === "full"}
            data-filter="full"
            onClick={() => selecionar("full")}
          >Full Stack</button>
        </div>

        <div className="grid-projetos" role="list">
          {projetos.filter(p => visivel(p.type)).length === 0 && (
            <div className="col-span-full text-center text-sm text-zinc-500" role="status">
              Nenhum projeto encontrado para este filtro.
            </div>
          )}

          {projetos.filter(p => visivel(p.type)).map((p) => (
            <article key={p.id} className="card-projeto card-projeto--fx group" role="listitem" data-type={p.type}>
              <div className="card-badge">
                <span className={`badge ${p.type}`}>{p.type === "front" ? "Front-end" : p.type === "back" ? "Back-end" : "Full Stack"}</span>
              </div>
              <figure className="card-media relative overflow-hidden">
                <img src={p.imgSrc} alt={p.title} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                <div className="quick-actions" aria-hidden="true">
                  {p.codeUrl && (
                    <a href={p.codeUrl} target="_blank" className="qa-btn" aria-label={`Abrir código de ${p.title}`}>
                      <i className="bi bi-github" />
                    </a>
                  )}
                  {p.demoUrl && (
                    <a href={p.demoUrl} target="_blank" className="qa-btn" aria-label={`Abrir demo de ${p.title}`}>
                      <i className="bi bi-box-arrow-up-right" />
                    </a>
                  )}
                </div>
              </figure>
              <div className="card-content">
                <h3 className="card-title">{p.title}</h3>
                <p className="card-desc">{p.desc}</p>
                <div className="card-tags">
                  {p.tags.map((t) => (<span key={t} className="chip">{t}</span>))}
                </div>
                <div className="card-actions">
                  {p.codeUrl && (
                    <a href={p.codeUrl} target="_blank" className="btn-secondary"><i className="bi bi-github" /> Código</a>
                  )}
                  {p.demoUrl && (
                    <a href={p.demoUrl} target="_blank" className="btn-primary ml-2"><i className="bi bi-box-arrow-up-right" /> Demo</a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
