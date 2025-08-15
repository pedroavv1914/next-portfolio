"use client";
import { useCallback, useEffect, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("inicio");

  const close = useCallback(() => setOpen(false), []);
  const openMenu = useCallback(() => setOpen(true), []);

  // Fecha o menu ao navegar por hash links no mobile
  useEffect(() => {
    const onHash = () => setOpen(false);
    window.addEventListener("hashchange", onHash);

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = Math.max(scrollHeight - clientHeight, 1);
      setProgress(Math.min(100, Math.max(0, (scrollTop / total) * 100)));
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Active link por seção
    const ids = ["inicio", "sobre", "especialidades", "portifolio", "formulario"]; // seções existentes
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const io = new IntersectionObserver(
      (entries) => {
        // pega a entrada mais visível
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    elements.forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("scroll", onScroll as EventListener);
      io.disconnect();
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
              <li><a href="#inicio" className={active === "inicio" ? "is-active" : ""} aria-current={active === "inicio" ? "page" : undefined}>Início</a></li>
              <li><a href="#sobre" className={active === "sobre" ? "is-active" : ""} aria-current={active === "sobre" ? "page" : undefined}>Sobre</a></li>
              <li><a href="#especialidades" className={active === "especialidades" ? "is-active" : ""} aria-current={active === "especialidades" ? "page" : undefined}>Especialidades</a></li>
              <li><a href="#portifolio" className={active === "portifolio" ? "is-active" : ""} aria-current={active === "portifolio" ? "page" : undefined}>Projetos</a></li>
              <li className="only-desktop-cta">
                <a href="#formulario" className="btn-primary nav-cta">Contato</a>
              </li>
            </ul>
          </nav>
        </div>

        <button className="btn-abrir-menu" id="btn-menu" onClick={openMenu} aria-controls="menu-mobile" aria-expanded={open} aria-label="Abrir menu">
          <i className="bi bi-list-nested" />
        </button>

        <div className={`menu-mobile ${open ? "translate-x-0" : "translate-x-full"}`} id="menu-mobile" role="dialog" aria-modal="true">
          <button className="btn-fechar" onClick={close} aria-label="Fechar menu">
            <i className="bi bi-x-lg" />
          </button>
          <nav>
            <ul>
              <li><a href="#inicio" onClick={close}>INICIO</a></li>
              <li><a href="#sobre" onClick={close}>SOBRE</a></li>
              <li><a href="#especialidades" onClick={close}>ESPECIALIDADES</a></li>
              <li><a href="#portifolio" onClick={close}>PROJETOS</a></li>
              <li><a href="#formulario" onClick={close}>CONTATO</a></li>
            </ul>
          </nav>
        </div>

        <button
          className={`overlay-menu ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          id="overlay-menu"
          aria-hidden={!open}
          onClick={close}
        />
      </div>
    </header>
  );
}
