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

  const [sel, setSel] = useState<Projeto | null>(null);

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

  const list = projetos;

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
            <p className="projects-lead">Confira meus principais projetos desenvolvidos.</p>
          </div>
        </header>

        <div className="projects-grid" role="list">
          {list.map((p, index)=> (
            <article key={p.id} className="project-card-v2" role="listitem" 
                     data-reveal style={{ ['--d' as any]: `${120 + index * 60}ms` }}>
              <div className="card-image-v2">
                <img src={p.imgSrc} alt={`Preview do projeto ${p.title}`} loading="lazy" decoding="async" />
                <div className="card-overlay-v2">
                  <button className="preview-btn-v2" onClick={()=>setSel(p)} 
                          aria-label={`Visualizar detalhes de ${p.title}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    <span>Visualizar</span>
                  </button>
                </div>
              </div>
              
              <div className="card-content-v2">
                <div className="card-header-v2">
                  <h3 className="card-title-v2">{p.title}</h3>
                </div>
                
                <p className="card-description-v2">{p.desc}</p>
                
                <div className="card-technologies">
                  <h4 className="tech-title">Tecnologias utilizadas:</h4>
                  <div className="tech-grid">
                    {p.tags.map(tech => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
                
                <div className="card-actions-v2">
                  {p.demoUrl && (
                    <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="action-btn-v2 demo">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="5,3 19,12 5,21 5,3"/>
                      </svg>
                      <span>Ver Demo</span>
                    </a>
                  )}
                  {p.codeUrl && (
                    <a href={p.codeUrl} target="_blank" rel="noopener noreferrer" className="action-btn-v2 code">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="16,18 22,12 16,6"/>
                        <polyline points="8,6 2,12 8,18"/>
                      </svg>
                      <span>Código</span>
                    </a>
                  )}
                  {p.frontUrl && (
                    <a href={p.frontUrl} target="_blank" rel="noopener noreferrer" className="action-btn-v2 frontend">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                        <line x1="8" y1="21" x2="16" y2="21"/>
                        <line x1="12" y1="17" x2="12" y2="21"/>
                      </svg>
                      <span>Ver Frontend</span>
                    </a>
                  )}
                  {p.backUrl && (
                    <a href={p.backUrl} target="_blank" rel="noopener noreferrer" className="action-btn-v2 backend">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
                        <line x1="7" y1="2" x2="7" y2="22"/>
                        <line x1="17" y1="2" x2="17" y2="22"/>
                        <line x1="2" y1="12" x2="22" y2="12"/>
                        <line x1="2" y1="7" x2="7" y2="7"/>
                        <line x1="2" y1="17" x2="7" y2="17"/>
                        <line x1="17" y1="17" x2="22" y2="17"/>
                        <line x1="17" y1="7" x2="22" y2="7"/>
                      </svg>
                      <span>Backend</span>
                    </a>
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
