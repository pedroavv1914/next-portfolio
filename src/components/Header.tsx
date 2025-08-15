"use client";
import { useCallback, useEffect, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);
  const openMenu = useCallback(() => setOpen(true), []);

  // Fecha o menu ao navegar por hash links no mobile
  useEffect(() => {
    const handler = () => setOpen(false);
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  return (
    <header className="nav-magic" id="topo">
      <div className="nav-progress" aria-hidden="true" />
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
              <li><a href="#inicio">Início</a></li>
              <li><a href="#sobre">Sobre</a></li>
              <li><a href="#especialidades">Especialidades</a></li>
              <li><a href="#portifolio">Projetos</a></li>
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
