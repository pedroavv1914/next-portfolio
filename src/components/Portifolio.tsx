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

  // Hover glow: track pointer within each tile and set CSS vars
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const tiles = Array.from(root.querySelectorAll<HTMLElement>('.tile'));
    const onMove = (e: PointerEvent) => {
      const t = e.currentTarget as HTMLElement;
      const rect = t.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 100;
      const my = ((e.clientY - rect.top) / rect.height) * 100;
      t.style.setProperty('--mx', mx + '%');
      t.style.setProperty('--my', my + '%');
    };
    tiles.forEach(t => {
      t.addEventListener('pointermove', onMove as any);
    });
    return () => {
      tiles.forEach(t => t.removeEventListener('pointermove', onMove as any));
    };
  }, []);

  return (
    <section ref={sectionRef} className="portfolio-v3" id="portifolio">
      <div className="portfolio-bg" aria-hidden="true" />
      <div className="interface interface--full">
        <div className="portfolio-wrap">
          <div className="v2-flag" aria-hidden="true">
            <span className="flag-green" />
            <span className="flag-white" />
          </div>

          <h2 className="about-title" data-reveal style={{ ['--d' as any]: '80ms' }}>
            <span className="line">Meus</span>
            <span className="line">Projetos</span>
          </h2>

          <p className="lead" data-reveal style={{ ['--d' as any]: '120ms' }}>
            Confira meus principais projetos desenvolvidos com tecnologias modernas.
          </p>

          <div className="tile-grid">
            {list.map((p, index) => (
              <article key={p.id} className="project-tile" data-reveal style={{ ['--d' as any]: `${160 + index * 40}ms` }}>
                <div className="tile-icon" aria-hidden>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                </div>
                <h4 className="tile-title">{p.title}</h4>
                <p className="tile-description">{p.desc}</p>
                <div className="tile-badges">
                  <span className={`tile-badge project-type ${p.type}`}>
                    {p.type === 'full' ? 'Full Stack' : p.type === 'front' ? 'Frontend' : 'Backend'}
                  </span>
                </div>
                <div className="tile-chips">
                  {p.tags.map((tag) => (
                    <span key={tag} className="chip" title={tag}>{tag}</span>
                  ))}
                </div>
                <div className="tile-actions">
                  {p.demoUrl && (
                    <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="action-btn primary">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="5,3 19,12 5,21 5,3"/>
                      </svg>
                      <span>Demo</span>
                    </a>
                  )}
                  {p.codeUrl && (
                    <a href={p.codeUrl} target="_blank" rel="noopener noreferrer" className="action-btn secondary">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="16,18 22,12 16,6"/>
                        <polyline points="8,6 2,12 8,18"/>
                      </svg>
                      <span>Código</span>
                    </a>
                  )}
                  {p.frontUrl && (
                    <a href={p.frontUrl} target="_blank" rel="noopener noreferrer" className="action-btn secondary">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                        <line x1="8" y1="21" x2="16" y2="21"/>
                        <line x1="12" y1="17" x2="12" y2="21"/>
                      </svg>
                      <span>Frontend</span>
                    </a>
                  )}
                  {p.backUrl && (
                    <a href={p.backUrl} target="_blank" rel="noopener noreferrer" className="action-btn secondary">
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
              </article>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
