"use client";
import { useCallback, useEffect, useState } from "react";

export default function Header() {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("inicio");

  useEffect(() => {

    const ids = ["inicio", "sobre", "especialidades", "portifolio", "formulario"]; // seções existentes

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = Math.max(scrollHeight - clientHeight, 1);
      setProgress(Math.min(100, Math.max(0, (scrollTop / total) * 100)));
      setScrolled(window.scrollY > 8);

      // Ativo: última seção cujo topo passou a linha de pivô considerando a altura do header
      const header = document.getElementById('topo');
      const headerH = header ? Math.ceil(header.getBoundingClientRect().height) : 0;
      const mid = Math.round(headerH + 16 + window.innerHeight * 0.22); // 22% + header + margem
      let candidate: { id: string; top: number } | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.bottom <= 0) continue; // totalmente acima, ignora
        if (rect.top <= mid) {
          if (!candidate || rect.top > candidate.top) {
            candidate = { id, top: rect.top };
          }
        }
      }
      if (candidate) {
        setActive(candidate.id);
      } else {
        // fallback: pega a seção mais próxima da linha de pivô
        let bestId = ids[0];
        let bestDist = Number.POSITIVE_INFINITY;
        for (const id of ids) {
          const el = document.getElementById(id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          const dist = Math.abs(rect.top - mid);
          if (dist < bestDist) { bestDist = dist; bestId = id; }
        }
        setActive(bestId);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Active link por seção (fallback com IO + re-registro)
    let io: IntersectionObserver | null = new IntersectionObserver(
      (entries) => {
        // Fallback leve: se alguma entrar, usa a mais visível
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    const registerSections = () => {
      if (!io) return;
      // Limpa observações anteriores
      io.disconnect();
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) io!.observe(el);
      });
    };

    // Registra já, e novamente após paint e quando a página carregar
    registerSections();
    const raf = requestAnimationFrame(registerSections);
    const onLoad = () => registerSections();
    window.addEventListener("load", onLoad, { once: true });

    // Reage a mudanças no DOM (ex.: seções montam depois)
    const mo = new MutationObserver(() => registerSections());
    mo.observe(document.body, { childList: true, subtree: true });

    // Sincroniza active com hash imediatamente ao navegar por âncora
    const onHashActive = () => {
      const h = location.hash.replace('#','');
      if (ids.includes(h)) setActive(h);
    };
    window.addEventListener("hashchange", onHashActive);

    return () => {
      window.removeEventListener("scroll", onScroll as EventListener);
      window.removeEventListener("load", onLoad as EventListener);
      window.removeEventListener("hashchange", onHashActive as EventListener);
      mo.disconnect();
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, []);

  return (
    <header className={`nav-magic ${scrolled ? "is-scrolled" : ""}`} id="topo">
      <div className="nav-progress" aria-hidden="true" style={{ width: `${progress}%` }} />
      <div className="interface">
        {/* Navbar estilo "pílula" para desktop */}
        <div className="navbar-shell">
          <a href="#inicio" className="brand">
            <span className="brand-icon" aria-hidden>
              <i className="bi bi-shield-check" />
            </span>
            <div className="brand-text">
              <h1>PEDRO RIBEIRO</h1>
              <span>Software Developer</span>
            </div>
          </a>
          <nav className="pill-nav" aria-label="Principal">
            <ul>
              <li><a href="#inicio" onClick={() => setActive("inicio")} className={active === "inicio" ? "is-active" : ""} aria-current={active === "inicio" ? "page" : undefined}>Início</a></li>
              <li><a href="#sobre" onClick={() => setActive("sobre")} className={active === "sobre" ? "is-active" : ""} aria-current={active === "sobre" ? "page" : undefined}>Sobre</a></li>
              <li><a href="#especialidades" onClick={() => setActive("especialidades")} className={active === "especialidades" ? "is-active" : ""} aria-current={active === "especialidades" ? "page" : undefined}>Especialidades</a></li>
              <li><a href="#portifolio" onClick={() => setActive("portifolio")} className={active === "portifolio" ? "is-active" : ""} aria-current={active === "portifolio" ? "page" : undefined}>Projetos</a></li>
              <li className="only-desktop-cta">
                <a href="#formulario" className="btn-primary nav-cta">Contato</a>
              </li>
            </ul>
          </nav>

        </div>


      </div>
    </header>
  );
}
