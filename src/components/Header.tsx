"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#sobre", label: "Sobre", id: "sobre" },
  { href: "#especialidades", label: "Skills", id: "especialidades" },
  { href: "#portifolio", label: "Projetos", id: "portifolio" },
  { href: "#formulario", label: "Contato", id: "formulario" },
];

export default function Header() {
  const [active, setActive] = useState("inicio");
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ids = ["inicio", ...links.map((link) => link.id)];

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      setProgress((scrollTop / Math.max(scrollHeight - clientHeight, 1)) * 100);
      setScrolled(window.scrollY > 12);

      const pivot = window.innerHeight * 0.28;
      const current = ids.findLast((id) => {
        const element = document.getElementById(id);
        return element ? element.getBoundingClientRect().top <= pivot : false;
      });
      if (current) setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id: string) => {
    setActive(id);
    setOpen(false);
  };

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`} id="topo">
      <span className="nav-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      <div className="interface nav-inner">
        <a href="#inicio" className="brand" onClick={() => handleNav("inicio")}>
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-initials">PR</span>
            <span className="brand-dot">.</span>
          </span>
          <span className="brand-caption">Pedro Ribeiro</span>
        </a>

        <div className="nav-shell">
          <span className="nav-shell-glow" aria-hidden="true" />
          <span className="availability-badge">
            <span className="pulse-dot" aria-hidden="true" />
            Disponível
          </span>

          <nav className={`nav-links ${open ? "is-open" : ""}`} aria-label="Navegação principal">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => handleNav(link.id)}
                className={active === link.id ? "is-active" : ""}
                aria-current={active === link.id ? "page" : undefined}
              >
                <span>{link.label}</span>
              </a>
            ))}
          </nav>
        </div>

        <a href="#formulario" className="nav-cta-premium">
          Conversar
          <i className="bi bi-arrow-up-right" aria-hidden="true" />
        </a>

        <button
          className="mobile-menu-button"
          type="button"
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <i className={open ? "bi bi-x-lg" : "bi bi-list"} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
