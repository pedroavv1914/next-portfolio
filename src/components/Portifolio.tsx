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
      frontUrl: "https://github.com/pedroavv1914/frontend-agendamento-petshop",
      backUrl: "https://github.com/pedroavv1914/backend-agendamento-petshop",
    },
    // 2) Palazzo Travel — Full Stack
    {
      id: "palazzo-travel",
      title: "Palazzo Travel",
      desc: "Sistema gerenciador de pacotes de viagens, permitindo cadastrar, consultar e atualizar pacotes e usuários.",
      imgSrc: "/palazzotravel.png",
      type: "full",
      tags: ["React", "TypeScript", "Vite", "React Router DOM", "Styled Components", "CSS", "Node.js", "Express", "TypeORM", "PostgreSQL", "JWT"],
      codeUrl: "https://github.com/pedroavv1914/agencia-viagens",
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
      frontUrl: "https://github.com/pedroavv1914/frontend-task-manager",
      backUrl: "https://github.com/pedroavv1914/backend-task-manager",
    },
    // 5) SHOPSPHERE – E-commerce Platform — Full stack
    {
      id: "api-shopsphere",
      title: "SHOPSPHERE – E-commerce Platform",
      desc: "Plataforma completa de e‑commerce para compra e venda de produtos online, com interface moderna, busca e filtragem, carrinho e processamento seguro de pagamentos.",
      imgSrc: "/api-shopsphere.png",
      type: "full",
      tags: ["React", "TypeScript", "PostgreSQL", "Node.js", "Express", "JWT", "Docker"],
      frontUrl: "https://github.com/pedroavv1914/frontend-api-shopSphere",
      backUrl: "https://github.com/pedroavv1914/backend-api-shopSphere",
    },
    // 6) BABILON — Full stack  
    {
      id: "projeto-babilon",
      title: "BABILON — Controle Financeiro Pessoal",
      desc: "Sistema para controle financeiro pessoal, inspirado nos princípios do livro 'O Homem mais rico da Babilônia'.",
      imgSrc: "/projeto-babilon.png",
      type: "full",
      tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "PostgreSQL", "RLS", "Realtime", "Recharts", "Node.js", "Express"],
      frontUrl: "https://github.com/pedroavv1914/Babilon",
      demoUrl: "https://babiloncontrole.vercel.app/"
    },
  ];


  const [filtroTipo, setFiltroTipo] = useState<Tipo | 'all'>('all');
  const [filtroTecnologia, setFiltroTecnologia] = useState<string>('all');

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

  // Parallax effect on scroll
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect();
        const delta = Math.max(-120, Math.min(120, r.top));
        el.style.setProperty('--parallax', `${delta}px`);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Filtrar projetos
  const projetosFiltrados = useMemo(() => {
    return projetos.filter(projeto => {
      const passaTipoFiltro = filtroTipo === 'all' || projeto.type === filtroTipo;
      const passaTecnologiaFiltro = filtroTecnologia === 'all' || projeto.tags.some(tag =>
        tag.toLowerCase().includes(filtroTecnologia.toLowerCase())
      );
      return passaTipoFiltro && passaTecnologiaFiltro;
    });
  }, [projetos, filtroTipo, filtroTecnologia]);

  const list = projetosFiltrados;

  // Obter todas as tecnologias únicas
  const tecnologiasUnicas = useMemo(() => {
    const todasTecnologias = projetos.flatMap(p => p.tags);
    return Array.from(new Set(todasTecnologias)).sort();
  }, [projetos]);



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
      t.addEventListener('pointermove', onMove as EventListener);
    });
    return () => {
      tiles.forEach(t => t.removeEventListener('pointermove', onMove as EventListener));
    };
  }, []);

  return (
    <section ref={sectionRef} className="portfolio-v3" id="portifolio">

      <div className="interface interface--full">
        <div className="portfolio-wrap">
          <div className="v2-flag" aria-hidden="true">
            <span className="flag-green" />
            <span className="flag-white" />
          </div>

          <h2 className="about-title" data-reveal style={{ '--d': '80ms' } as React.CSSProperties}>
            <span className="line">Meus</span>
            <span className="line">Projetos</span>
          </h2>

          <p className="lead" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
            Confira meus principais projetos desenvolvidos com tecnologias modernas.
          </p>

          {/* Filtros */}
          <div className="portfolio-filters" data-reveal style={{ '--d': '140ms' } as React.CSSProperties}>
            <div className="filter-group">
              <label className="filter-label">Tipo:</label>
              <div className="filter-buttons">
                <button
                  className={`filter-btn ${filtroTipo === 'all' ? 'active' : ''}`}
                  onClick={() => setFiltroTipo('all')}
                >
                  Todos
                </button>
                <button
                  className={`filter-btn ${filtroTipo === 'front' ? 'active' : ''}`}
                  onClick={() => setFiltroTipo('front')}
                >
                  Frontend
                </button>
                <button
                  className={`filter-btn ${filtroTipo === 'back' ? 'active' : ''}`}
                  onClick={() => setFiltroTipo('back')}
                >
                  Backend
                </button>
                <button
                  className={`filter-btn ${filtroTipo === 'full' ? 'active' : ''}`}
                  onClick={() => setFiltroTipo('full')}
                >
                  Full Stack
                </button>
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">Tecnologia:</label>
              <select
                className="filter-select"
                value={filtroTecnologia}
                onChange={(e) => setFiltroTecnologia(e.target.value)}
              >
                <option value="all">Todas</option>
                {tecnologiasUnicas.map(tech => (
                  <option key={tech} value={tech}>{tech}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="tile-grid">
            {list.map((p, index) => (
              <article key={p.id} className="project-tile tile" data-reveal style={{ '--d': `${160 + index * 40}ms` } as React.CSSProperties}>
                <div className="project-image">
                  <img src={p.imgSrc} alt={p.title} loading="lazy" />
                  <div className="project-overlay">
                  </div>
                </div>
                <div className="project-content">
                  <div className="tile-badges">
                    <span className={`tile-badge project-type ${p.type}`}>
                      {p.type === 'full' ? 'Full Stack' : p.type === 'front' ? 'Frontend' : 'Backend'}
                    </span>
                  </div>
                  <h4 className="tile-title">{p.title}</h4>
                  <p className="tile-description">{p.desc}</p>
                  <div className="tile-chips">
                    {p.tags.map((tag) => (
                      <span key={tag} className="chip">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="tile-actions">
                  {p.demoUrl && (
                    <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="action-btn primary">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="5,3 19,12 5,21 5,3" />
                      </svg>
                      <span>Demo</span>
                    </a>
                  )}
                  {p.codeUrl && !p.frontUrl && !p.backUrl && (
                    <a href={p.codeUrl} target="_blank" rel="noopener noreferrer" className="action-btn secondary">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="16,18 22,12 16,6" />
                        <polyline points="8,6 2,12 8,18" />
                      </svg>
                      <span>Código</span>
                    </a>
                  )}
                  {p.frontUrl && (
                    <a href={p.frontUrl} target="_blank" rel="noopener noreferrer" className="action-btn secondary">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                      <span>Frontend</span>
                    </a>
                  )}
                  {p.backUrl && (
                    <a href={p.backUrl} target="_blank" rel="noopener noreferrer" className="action-btn secondary">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                        <line x1="7" y1="2" x2="7" y2="22" />
                        <line x1="17" y1="2" x2="17" y2="22" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <line x1="2" y1="7" x2="7" y2="7" />
                        <line x1="2" y1="17" x2="7" y2="17" />
                        <line x1="17" y1="17" x2="22" y2="17" />
                        <line x1="17" y1="7" x2="22" y2="7" />
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
