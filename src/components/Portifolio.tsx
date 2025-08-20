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
  ];

  // Derived data
  const allTags = useMemo(() => Array.from(new Set(projetos.flatMap(p => p.tags))).sort(), [projetos]);

  // UI state
  const [tipo, setTipo] = useState<Tipo | "all">("all");
  const [tag, setTag] = useState<string | "all">("all");
  const [q, setQ] = useState("");
  const [sel, setSel] = useState<Projeto | null>(null);
  const [sort, setSort] = useState<"recent"|"az"|"za">("recent");
  const [dense, setDense] = useState<boolean>(false);

  // Reveal on view (match behavior of other sections)
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
    // Reveal already in view
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
    const filtered = projetos.filter(p => (tipo === "all" || p.type === tipo))
      .filter(p => (tag === "all" || p.tags.includes(tag)))
      .filter(p => (q.trim() === "" || (p.title+" "+p.desc+" "+p.tags.join(" ")).toLowerCase().includes(q.toLowerCase())));
    if (sort === 'az') return [...filtered].sort((a,b)=>a.title.localeCompare(b.title));
    if (sort === 'za') return [...filtered].sort((a,b)=>b.title.localeCompare(a.title));
    return filtered; // 'recent' preserves original order
  }, [projetos, tipo, tag, q, sort]);

  // Close modal on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSel(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section ref={sectionRef} className="projects-v2" id="portifolio">
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
              <button className={`toggle-density ${dense? 'is-on': ''}`} onClick={()=>setDense(v=>!v)} aria-pressed={dense} aria-label="Alternar densidade">
                {dense? 'Compacto' : 'Conforto'}
              </button>
            </div>
          </div>
        </header>

        <div className="projects-filters" role="group" aria-label="Filtros">
          <div className="pf-row">
            <div className="pf-types" role="tablist">
              {(["all","front","back","full"] as const).map(t => (
                <button key={t} className={`pf-pill ${tipo===t? 'is-active':''}`} onClick={()=>setTipo(t as any)} role="tab" aria-selected={tipo===t}>
                  {t==='all'? 'Todos' : t==='front'? 'Front-end' : t==='back'? 'Back-end' : 'Full Stack'}
                </button>
              ))}
            </div>
            <div className="pf-tags">
              <button className={`pf-tag ${tag==='all'?'is-active':''}`} onClick={()=>setTag('all')}>Todas</button>
              {allTags.map(t => (
                <button key={t} className={`pf-tag ${tag===t?'is-active':''}`} onClick={()=>setTag(t)}>{t}</button>
              ))}
            </div>
          </div>
        </div>

        <div className={`proj-grid ${dense? 'is-dense': ''}`} role="list">
          {list.length===0 && (
            <div className="proj-empty" role="status">
              Nenhum projeto encontrado.
              <div className="proj-empty-actions">
                <button className="btn-secondary" onClick={()=>{ setTipo('all'); setTag('all'); setQ(""); setSort('recent'); }}>Limpar filtros</button>
              </div>
            </div>
          )}
          {list.map((p)=> (
            <article key={p.id} className={`proj-card ${dense? 'dense': ''}`} role="listitem">
              <div className="pc-media" onClick={()=>setSel(p)} role="button" tabIndex={0}
                   onKeyDown={(e)=>{ if(e.key==='Enter') setSel(p); }} aria-label={`Abrir pré-visualização de ${p.title}`}>
                <img src={p.imgSrc} alt="" loading="lazy" decoding="async" />
                <span className={`pc-type ${p.type}`}>{p.type==='front'? 'Front-end': p.type==='back'? 'Back-end':'Full Stack'}</span>
                <span className="pc-shine" aria-hidden />
              </div>
              <div className="pc-body">
                <h3 className="pc-title">{p.title}</h3>
                <p className="pc-desc">{p.desc}</p>
                <div className="pc-tags">
                  {p.tags.map(t=> <span key={t} className="chip">{t}</span>)}
                </div>
                <div className="pc-actions">
                  {p.codeUrl && <a href={p.codeUrl} target="_blank" className="btn-secondary">Código</a>}
                  {p.demoUrl && <a href={p.demoUrl} target="_blank" className="btn-primary">Demo</a>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal preview */}
      {sel && (
        <div className="proj-modal" role="dialog" aria-modal="true" aria-label={`Pré-visualização de ${sel.title}`} onClick={()=>setSel(null)}>
          <div className="pm-dialog" onClick={(e)=>e.stopPropagation()}>
            <button className="pm-close" onClick={()=>setSel(null)} aria-label="Fechar">✕</button>
            {/* Prev/Next */}
            <button className="pm-nav pm-prev" aria-label="Anterior" onClick={(e)=>{ e.stopPropagation();
              const i = list.findIndex(x=>x.id===sel.id); if (i>0) setSel(list[i-1]); }}>&lsaquo;</button>
            <button className="pm-nav pm-next" aria-label="Próximo" onClick={(e)=>{ e.stopPropagation();
              const i = list.findIndex(x=>x.id===sel.id); if (i>-1 && i<list.length-1) setSel(list[i+1]); }}>&rsaquo;</button>
            <div className="pm-media">
              <img src={sel.imgSrc} alt={sel.title} />
            </div>
            <div className="pm-body">
              <h3 className="pm-title">{sel.title}</h3>
              <p className="pm-desc">{sel.desc}</p>
              <div className="pm-tags">{sel.tags.map(t=> <span key={t} className="chip">{t}</span>)}</div>
              <div className="pm-actions">
                {sel.codeUrl && <a href={sel.codeUrl} target="_blank" className="btn-secondary">Código</a>}
                {sel.demoUrl && <a href={sel.demoUrl} target="_blank" className="btn-primary">Demo</a>}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
