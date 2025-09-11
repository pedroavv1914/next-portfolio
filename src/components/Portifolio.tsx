"use client";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Portifolio() {
  type Tipo = "front" | "back" | "full";  
  type Projeto = {
    id: string;
    title: string;
    desc: string;
    imgSrc: string;
    type: Tipo;
    tags: string[];
    codeUrl?: string;
    demoUrl?: string;
    frontUrl?: string; 
    backUrl?: string;  
  };

  const projetos: Projeto[] = [
    // 1) API Petshop — Full stack
    {
      id: "api-petshop",
      title: "API Petshop",
      desc: "Página de gerenciamento de Petshop. Permite cadastrar, consultar e atualizar pets, clientes e serviços, integrando frontend e backend com foco em experiência do usuário.",
      imgSrc: "/api-petshop.png",
      type: "full",
      tags: ["React", "CSS", "Node.js", "Express", "Prisma"],
      codeUrl: "https://github.com/pedroavv1914", 
      frontUrl: "https://github.com/pedroavv1914", 
      backUrl: "https://github.com/pedroavv1914", 
    },
    // 2) Palazzo Travel — Front-end
    {
      id: "palazzo-travel",
      title: "Palazzo Travel",
      desc: "Site moderno e responsivo para agência de viagens, com menu lateral animado, carrossel de pacotes e navegação intuitiva.",
      imgSrc: "/palazzotravel.png",
      type: "front",
      tags: ["React", "CSS", "TypeScript", "Vite", "React Router DOM"],
      codeUrl: "https://github.com/pedroavv1914",
      demoUrl: "https://agencia-viagens-iota.vercel.app/"
    },
    // 3) GitHub Finder — Front-end
    {
      id: "github-finder",
      title: "GitHub Finder",
      desc: "Busque e visualize perfis do GitHub de forma simples e eficiente. App moderno, responsivo e com consulta à API pública do GitHub.",
      imgSrc: "/githubfinder.png",
      type: "front",
      tags: ["CSS", "React", "TypeScript", "Vite", "API GitHub"],
      codeUrl: "https://github.com/pedroavv1914",
      demoUrl: "https://github-finder-pearl-mu.vercel.app/"
    },
    // 4) STRATIX – Task Manager — Full stack
    {
      id: "api-stratix",
      title: "STRATIX – Task Manager",
      desc: "Sistema completo para gerenciamento de tarefas, permitindo criar, organizar e acompanhar atividades com integração entre frontend e backend.",
      imgSrc: "/api-stratix.png",
      type: "full",
      tags: ["React", "CSS", "TypeScript", "Vite", "Node.js", "Express", "Prisma", "JWT"],
      codeUrl: "https://github.com/pedroavv1914",
      frontUrl: "https://github.com/pedroavv1914", 
      backUrl: "https://github.com/pedroavv1914", 
    },
    // 5) SHOPSPHERE – E-commerce Platform — Full stack
    {
      id: "api-shopsphere",
      title: "SHOPSPHERE – E-commerce Platform",
      desc: "Plataforma completa de e‑commerce para compra e venda de produtos online, com interface moderna, busca e filtragem, carrinho e processamento seguro de pagamentos.",
      imgSrc: "/api-shopsphere.png",
      type: "full",
      tags: ["React", "TypeScript", "PostgreSQL", "Node.js", "Express", "JWT", "Docker"],
      codeUrl: "https://github.com/pedroavv1914",
      frontUrl: "https://github.com/pedroavv1914",      
      backUrl: "https://github.com/pedroavv1914", 
    },
  ];

  const allTags = useMemo(() => Array.from(new Set(projetos.flatMap(p => p.tags))).sort(), [projetos]);

  const [tag, setTag] = useState<string | "all">("all");
  const [q, setQ] = useState("");
  const [sel, setSel] = useState<Projeto | null>(null);
  const [sort, setSort] = useState<"recent"|"az"|"za">("recent");
  const [dense, setDense] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-reveal]"));
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      items.forEach((n) => n.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target as Element);
        }
      }
    }, { threshold: 0.01, rootMargin: '0px 0px -10% 0px' });
    
    requestAnimationFrame(() => {
      const vh = window.innerHeight || 0;
      items.forEach((n) => {
        const r = n.getBoundingClientRect();
        if (r.top < vh * 0.95 && r.bottom > 0) {
          n.classList.add('is-in');
        } else {
          io.observe(n);
        }
      });
    });
    return () => io.disconnect();
  }, []);

  const list = useMemo(() => {
    const filtered = projetos
      .filter(p => (tag === "all" || p.tags.includes(tag)))
      .filter(p => (q.trim() === "" || (p.title+" "+p.desc+" "+p.tags.join(" ")).toLowerCase().includes(q.toLowerCase())));
    if (sort === 'az') return [...filtered].sort((a,b)=>a.title.localeCompare(b.title));
    if (sort === 'za') return [...filtered].sort((a,b)=>b.title.localeCompare(a.title));
    return filtered; 
  }, [projetos, tag, q, sort]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSel(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section ref={sectionRef} className="projects-v2" id="portifolio">
      <div className="projects-bg"></div>
      <div className="interface">
        <header className="projects-head">
          <div className="ph-left">
            <h2 className="about-title is-in" data-reveal style={{ ['--d' as any]: '80ms' }}>
              <span className="line">Meus</span>
              <span className="line">Projetos</span>
            </h2>
            <p className="projects-lead">Selecione um filtro ou pesquise para encontrar algo específico.</p>
          </div>
          <div className="ph-right">
            <div className="ph-controls">
              <div className="ph-search">
                <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar por título, tag..." aria-label="Buscar projetos" />
              </div>
              <select className="ph-select" aria-label="Ordenar" value={sort} onChange={e=>setSort(e.target.value as any)}>
                <option value="recent">Recentes</option>
                <option value="az">A–Z</option>
                <option value="za">Z–A</option>
              </select>
            </div>
          </div>
        </header>

        <div className="projects-filters" role="group" aria-label="Filtros">
          <div className="pf-row">
            <div className="pf-tags">
              <button className={`pf-tag ${tag==='all'?'is-active':''}`} onClick={()=>setTag('all')}>Todas</button>
              {allTags.map(t => (
                <button key={t} className={`pf-tag ${tag===t?'is-active':''}`} onClick={()=>setTag(t)}>{t}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="portfolio-grid" role="list">
          {list.length===0 && (
            <div className="proj-empty" role="status">
              Nenhum projeto encontrado.
              <div className="proj-empty-actions">
                <button className="btn-secondary" onClick={()=>{ setTag('all'); setQ(""); setSort('recent'); }}>Limpar filtros</button>
              </div>
            </div>
          )}
          {list.map((p)=> (
            <article key={p.id} className={`proj-card ${dense? 'dense': ''}`} role="listitem">
              <div className="pc-media group" onClick={()=>setSel(p)} role="button" tabIndex={0}
                   onKeyDown={(e)=>{ if(e.key==='Enter') setSel(p); }} aria-label={`Abrir pré-visualização de ${p.title}`}>
                <img src={p.imgSrc} alt="" loading="lazy" decoding="async" />
                <div className="pc-overlay-content">
                <h1 className="pc-title">{p.title}</h1>
                <p className="pc-desc">{p.desc}</p>
                <div className="pc-tags">
                  {p.tags.map(t=> <span key={t} className="chip">{t}</span>)}
                </div>
                <footer className="pc-actions">
                  {(p.frontUrl || p.backUrl) ? (
                    <>
                      {p.frontUrl && (
                        <a href={p.frontUrl} target="_blank" rel="noopener noreferrer" className="btn-front">
                          <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-4 4v-4H5a2 2 0 0 1-2-2V5z"/></svg>
                          <span>Front End</span>
                        </a>
                      )}
                      {p.backUrl && (
                        <a href={p.backUrl} target="_blank" rel="noopener noreferrer" className="btn-back">
                          <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v4H4V6zm0 6h16v6H4v-6z"/></svg>
                          <span>Back End</span>
                        </a>
                      )}
                      {p.demoUrl && (
                        <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-demo">
                          <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg>
                          <span>Demo</span>
                        </a>
                      )}
                    </>
                  ) : (
                    <>
                      {p.codeUrl && (
                        <a href={p.codeUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                          <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L5.8 13l3.6-3.6L8 4l-8 8 8 8 1.4-3.4zm5.2 0L18.2 13l-3.6-3.6L16 4l8 8-8 8-1.4-3.4z"/></svg>
                          <span>Código (GitHub)</span>
                        </a>
                      )}
                      {p.demoUrl && (
                        <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                          <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg>
                          <span>Demo</span>
                        </a>
                      )}
                    </>
                  )}
                </footer>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

    </section>
  );
}
