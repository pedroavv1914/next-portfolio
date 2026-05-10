"use client";

import { useEffect, useState, FormEvent } from "react";

const LogoMark = () => (
  <span className="logo-mark">
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" fill="none" stroke="#7CFFB2" strokeWidth="1.5" opacity=".45" />
      <g className="lm-orbit">
        <circle className="lm-dot" cx="32" cy="2" r="2.6" fill="#7CFFB2" />
        <circle className="lm-dot" cx="32" cy="62" r="1.6" fill="#7CFFB2" opacity=".55" />
      </g>
      <circle cx="32" cy="32" r="24" fill="#7CFFB2" />
      <path d="M21 19 L21 47 M21 19 L30 19 Q35.5 19 35.5 25.5 Q35.5 32 30 32 L21 32" stroke="#04130b" strokeWidth="3" fill="none" strokeLinecap="square" />
      <path d="M40 47 L40 22 L48 22 Q52.5 22 52.5 27 Q52.5 32 48 32 L40 32 M46 32 L52.5 47" stroke="#04130b" strokeWidth="3" fill="none" strokeLinecap="square" />
    </svg>
  </span>
);

export default function Home() {
  const [filter, setFilter] = useState<"all" | "full" | "front" | "api">("all");
  const [submitLabel, setSubmitLabel] = useState("Enviar mensagem");

  useEffect(() => {
    // Reveal on scroll
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    document
      .querySelectorAll(".reveal,.reveal-x,.reveal-r,.reveal-zoom,.stagger")
      .forEach((el) => io.observe(el));

    // Letter-up hero name
    document.querySelectorAll<HTMLElement>("[data-letters]").forEach((el) => {
      if (el.dataset.processed) return;
      el.dataset.processed = "1";
      const txt = el.textContent || "";
      el.textContent = "";
      [...txt].forEach((ch, i) => {
        const s = document.createElement("span");
        s.className = "letter";
        s.style.animationDelay = i * 40 + "ms";
        s.textContent = ch === " " ? "\u00a0" : ch;
        el.appendChild(s);
      });
    });

    // Magnetic buttons
    const magnetic = document.querySelectorAll<HTMLElement>(
      ".btn-primary, .nav-cta, .case-btn.primary, .form .submit"
    );
    const onMove = (btn: HTMLElement) => (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.18}px,${y * 0.22}px)`;
    };
    const onLeave = (btn: HTMLElement) => () => {
      btn.style.transform = "";
    };
    const moveHandlers: Array<{ btn: HTMLElement; m: (e: MouseEvent) => void; l: () => void }> = [];
    magnetic.forEach((btn) => {
      const m = onMove(btn);
      const l = onLeave(btn);
      btn.addEventListener("mousemove", m);
      btn.addEventListener("mouseleave", l);
      moveHandlers.push({ btn, m, l });
    });

    // Tilt on cards
    const cards = document.querySelectorAll<HTMLElement>(".delivery, .case");
    const tiltMove = (card: HTMLElement) => (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(1000px) rotateX(${-py * 3}deg) rotateY(${px * 4}deg) translateY(-4px)`;
    };
    const tiltLeave = (card: HTMLElement) => () => {
      card.style.transform = "";
    };
    const tiltHandlers: Array<{ card: HTMLElement; m: (e: MouseEvent) => void; l: () => void }> = [];
    cards.forEach((card) => {
      const m = tiltMove(card);
      const l = tiltLeave(card);
      card.addEventListener("mousemove", m);
      card.addEventListener("mouseleave", l);
      tiltHandlers.push({ card, m, l });
    });

    // Scroll progress
    const prog = document.getElementById("progress");
    const onScroll = () => {
      if (!prog) return;
      const h = document.documentElement;
      const p = h.scrollTop / Math.max(h.scrollHeight - h.clientHeight, 1);
      prog.style.width = p * 100 + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      moveHandlers.forEach(({ btn, m, l }) => {
        btn.removeEventListener("mousemove", m);
        btn.removeEventListener("mouseleave", l);
      });
      tiltHandlers.forEach(({ card, m, l }) => {
        card.removeEventListener("mousemove", m);
        card.removeEventListener("mouseleave", l);
      });
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitLabel("Mensagem validada · obrigado");
  };

  type CaseType = "full" | "front" | "api";
  const showCase = (types: CaseType[]) =>
    filter === "all" || types.includes(filter as CaseType);

  return (
    <>
      <div className="ambient" aria-hidden="true">
        <div className="grid"></div>
        <div className="glow-a"></div>
        <div className="glow-b"></div>
        <div className="noise"></div>
      </div>

      {/* NAV */}
      <header className="nav">
        <div className="wrap nav-inner">
          <a href="#topo" className="brand">
            <LogoMark />
            <span>
              pedro<span style={{ color: "var(--green)" }}>.</span>ribeiro
            </span>
            <span className="brand-meta">— eng. de produto</span>
          </a>
          <nav className="nav-links">
            <a href="#sobre"><span className="num">01</span><span>sobre</span></a>
            <a href="#skills"><span className="num">02</span><span>skills</span></a>
            <a href="#projetos"><span className="num">03</span><span>projetos</span></a>
            <a href="#processo"><span className="num">04</span><span>processo</span></a>
            <a href="#contato"><span className="num">05</span><span>contato</span></a>
          </nav>
          <a href="#contato" className="nav-cta">
            Iniciar conversa <span className="arrow">↗</span>
          </a>
          <span className="progress" id="progress"></span>
        </div>
      </header>

      {/* HERO */}
      <section className="hero" id="topo">
        <div className="wrap">
          <div className="hero-eyebrow">
            <span className="live">
              <span className="dot"></span>Disponível · Q2 / 2026
            </span>
            <span>// jundiaí, sp · brasil · UTC−3</span>
          </div>

          <h1 className="hero-name">
            <span className="first" data-letters>Pedro</span>
            <span className="last">
              <span data-letters>Ribeiro</span>
              <em>&nbsp;/&nbsp;dev</em>
              <span className="badge"><i></i>v3.2.0</span>
            </span>
          </h1>

          <div className="hero-grid reveal d2">
            <div>
              <p className="hero-tagline">
                Eu desenho a ponte entre uma ideia <u>promissora</u> e um produto que parece <u>inevitável</u>.
              </p>
              <p className="hero-desc">
                Full-stack focado nos <strong>últimos 10%</strong>: arquitetura limpa, performance e micro-interações que deixam o usuário em paz. Trabalho com React, Next.js, Node e Postgres — do MVP ao produto que sustenta operação.
              </p>
              <div className="hero-actions">
                <a href="#projetos" className="btn btn-primary">
                  Ver casos selecionados <span className="arrow">→</span>
                </a>
                <a href="#contato" className="btn btn-ghost">
                  Iniciar conversa <span className="arrow">↗</span>
                </a>
              </div>
              <div className="hero-socials">
                <a href="https://github.com/pedroavv1914" target="_blank" rel="noreferrer">github ↗</a>
                <span>·</span>
                <a href="https://www.linkedin.com/in/pedro-ribeiro-a71300230/" target="_blank" rel="noreferrer">linkedin ↗</a>
                <span>·</span>
                <a href="https://www.instagram.com/_pedroavv/" target="_blank" rel="noreferrer">instagram ↗</a>
              </div>
            </div>

            <aside className="panel">
              <div className="panel-bar">
                <div className="dots"><i></i><i></i><i></i></div>
                <span className="path">~/<b>pedro/workflow.ts</b></span>
                <span style={{ marginLeft: "auto", color: "var(--green)" }}>●</span>
              </div>
              <div className="panel-body">
                <div className="term-line"><span className="c">// princípio operacional</span></div>
                <div className="term-line"><span className="k">const</span> <span className="v">missao</span> = {"{"}</div>
                <div className="term-line">&nbsp;&nbsp;<span className="v">desenhar</span>: <span className="s">&quot;interface que parece leve&quot;</span>,</div>
                <div className="term-line">&nbsp;&nbsp;<span className="v">construir</span>: <span className="s">&quot;backend que sustenta produto&quot;</span>,</div>
                <div className="term-line">&nbsp;&nbsp;<span className="v">entregar</span>: <span className="s">&quot;sem improviso, sem retrabalho&quot;</span>,</div>
                <div className="term-line">{"};"}</div>
                <div className="term-line">&nbsp;</div>
                <div className="term-line"><span className="p">→</span> <span className="v">missao.executar()</span><span className="caret"></span></div>
              </div>

              <div className="panel-section">
                <h4>Sinais</h4>
                <div className="metrics">
                  <div className="metric"><div className="n">3+</div><div className="l">anos<br />criando produto</div></div>
                  <div className="metric"><div className="n">12+</div><div className="l">projetos<br />no portfólio</div></div>
                  <div className="metric"><div className="n">24h</div><div className="l">tempo médio<br />de resposta</div></div>
                </div>
              </div>

              <div className="panel-section">
                <h4>Stack núcleo</h4>
                <div className="stack-strip">
                  <span>React</span><span>Next.js</span><span>TypeScript</span><span>Node.js</span>
                  <span>Express</span><span>Prisma</span><span>PostgreSQL</span><span>Tailwind</span>
                  <span>Docker</span><span>Vercel</span>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            <span>código limpo <span className="star">✦</span> <span className="alt">arquitetura sólida</span> <span className="star">✦</span> performance obsessiva <span className="star">✦</span> <span className="alt">micro-interações</span> <span className="star">✦</span> produto memorável <span className="star">✦</span> <span className="alt">deploy contínuo</span> <span className="star">✦</span> ux validada <span className="star">✦</span> <span className="alt">disponível para projetos</span> <span className="star">✦&nbsp;</span></span>
            <span>código limpo <span className="star">✦</span> <span className="alt">arquitetura sólida</span> <span className="star">✦</span> performance obsessiva <span className="star">✦</span> <span className="alt">micro-interações</span> <span className="star">✦</span> produto memorável <span className="star">✦</span> <span className="alt">deploy contínuo</span> <span className="star">✦</span> ux validada <span className="star">✦</span> <span className="alt">disponível para projetos</span> <span className="star">✦&nbsp;</span></span>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="sec" id="sobre">
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <div className="sec-tag">Sobre</div>
              <div className="sec-num">Capítulo 01 / 05</div>
            </div>
            <div>
              <h2 className="sec-title">Construo produto, <em>não vitrine</em>.</h2>
            </div>
          </div>

          <div className="about-grid">
            <div className="portrait reveal-x">
              <div className="portrait-corner tl"></div>
              <div className="portrait-corner br"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/foto-prof.jpeg" alt="Pedro Ribeiro" loading="lazy" />
              <div className="portrait-meta">
                <div className="left"><span>P. RIBEIRO</span><b>full-stack</b></div>
                <div className="right">JUNDIAÍ · SP<br />2022 →</div>
              </div>
            </div>

            <div className="reveal-r d1">
              <p className="about-quote">
                Eu gosto de transformar bagunça em fluxo. Pego uma ideia, entendo onde ela precisa chegar e construo a ponte com <em>interface, backend e decisões técnicas</em> que não atrapalham o produto depois.
              </p>
              <p className="about-body">
                Desenvolvedor <strong>Full Stack</strong> focado em experiências de alto impacto. Transformo ideias em produtos com <strong>código limpo</strong>, <strong>performance</strong> e atenção obsessiva aos detalhes. A obsessão mora nos últimos 10% — onde o produto deixa de funcionar e passa a ser memorável.
              </p>

              <div className="principles stagger">
                <div className="principle">
                  <div className="ix">/ 01</div>
                  <h5>Pensar antes de codar</h5>
                  <p>Modelar o problema com clareza vale mais do que qualquer linha bonita.</p>
                </div>
                <div className="principle">
                  <div className="ix">/ 02</div>
                  <h5>Remover fricção</h5>
                  <p>Cada clique a menos é um detalhe que o usuário sente sem perceber.</p>
                </div>
                <div className="principle">
                  <div className="ix">/ 03</div>
                  <h5>Entregar com orgulho</h5>
                  <p>Código que dá orgulho de manter daqui a um ano, não só de mostrar hoje.</p>
                </div>
              </div>

              <div className="differences stagger">
                <div className="diff"><span className="num">i.</span><span className="txt">Entrega rápida sem abrir mão da qualidade</span><span className="arr">princípio</span></div>
                <div className="diff"><span className="num">ii.</span><span className="txt">Arquitetura segura, performática e escalável</span><span className="arr">princípio</span></div>
                <div className="diff"><span className="num">iii.</span><span className="txt">Micro-interações e UX validadas para surpreender</span><span className="arr">princípio</span></div>
                <div className="diff"><span className="num">iv.</span><span className="txt">Código que dá orgulho de manter no longo prazo</span><span className="arr">princípio</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="sec skills" id="skills">
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <div className="sec-tag">Skills</div>
              <div className="sec-num">Capítulo 02 / 05</div>
            </div>
            <div>
              <h2 className="sec-title">O que entrego <em>na prática</em>.</h2>
              <p className="sec-lead">Tecnologia é meio. O foco é criar produto rápido, organizado e confortável de manter.</p>
            </div>
          </div>

          <div className="delivery-grid stagger">
            <article className="delivery">
              <div className="topline"><span className="ix">01</span><span className="icon">◧</span></div>
              <h3>Interfaces que parecem leves</h3>
              <p>Telas responsivas, rápidas e com micro-interações que deixam o produto mais claro de usar — do layout ao comportamento final.</p>
              <div className="result">Do briefing ao detalhe final</div>
              <div className="tags"><span>React</span><span>Next.js</span><span>TypeScript</span><span>Tailwind</span><span>CSS</span></div>
            </article>
            <article className="delivery">
              <div className="topline"><span className="ix">02</span><span className="icon">⌘</span></div>
              <h3>APIs que sustentam produto</h3>
              <p>Backends com regras bem separadas, autenticação, persistência e integração com front sem improviso — fluxos previsíveis em produção.</p>
              <div className="result">Fluxos seguros e previsíveis</div>
              <div className="tags"><span>Node.js</span><span>Express</span><span>Prisma</span><span>PostgreSQL</span><span>JWT</span></div>
            </article>
            <article className="delivery">
              <div className="topline"><span className="ix">03</span><span className="icon">↗</span></div>
              <h3>Pronto para evoluir</h3>
              <p>Deploy, versionamento e estrutura para manter o projeto saudável depois da primeira entrega — menos retrabalho no crescimento.</p>
              <div className="result">Menos retrabalho, mais escala</div>
              <div className="tags"><span>Docker</span><span>Vercel</span><span>AWS</span><span>Git</span><span>CI/CD</span></div>
            </article>
          </div>

          <div className="tools reveal">
            <span className="tools-label">Ferramentas do dia-a-dia</span>
            <span className="tool">Git / GitHub</span>
            <span className="tool">VS Code</span>
            <span className="tool">Figma</span>
            <span className="tool">Docker</span>
            <span className="tool">Postman</span>
            <span className="tool">Jest</span>
            <span className="tool">Supabase</span>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="sec" id="projetos">
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <div className="sec-tag">Projetos</div>
              <div className="sec-num">Capítulo 03 / 05</div>
            </div>
            <div>
              <h2 className="sec-title">Casos que <em>explicam</em> a própria razão de existir.</h2>
              <p className="sec-lead">Cada projeto começa por um problema concreto. A decisão técnica vem depois — e o ganho de uso é o que fica.</p>
            </div>
          </div>

          <div className="filter-row reveal d1">
            <button className={`filter ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>Todos <small>06</small></button>
            <button className={`filter ${filter === "full" ? "active" : ""}`} onClick={() => setFilter("full")}>Full-Stack <small>05</small></button>
            <button className={`filter ${filter === "front" ? "active" : ""}`} onClick={() => setFilter("front")}>Frontend <small>01</small></button>
            <button className={`filter ${filter === "api" ? "active" : ""}`} onClick={() => setFilter("api")}>APIs <small>05</small></button>
          </div>

          <div className="case-grid stagger" id="cases">
            {showCase(["full", "api"]) && (
              <article className="case featured">
                <div className="case-inner">
                  <div className="media">
                    <span className="index">★ 01 / em destaque</span>
                    <span className="ribbon"><span className="dot"></span>Case autoral</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/projeto-babilon.png" alt="Projeto Babilon" />
                  </div>
                  <div className="body">
                    <span className="impact">Controle financeiro · Supabase · RLS · Realtime</span>
                    <h3 className="name">Babilon — <em>disciplina financeira</em> com cara de produto.</h3>
                    <p className="desc">Sistema autoral de controle financeiro pessoal inspirado em &quot;O Homem mais rico da Babilônia&quot;. Transforma rotina disciplinada em interface visual, acompanhável e menos intimidadora — com Supabase para acelerar auth, banco e tempo real, e RLS protegendo dados sensíveis desde o primeiro dia.</p>
                    <div className="stack">
                      <span>React</span><span>TypeScript</span><span>Vite</span><span>Tailwind</span>
                      <span>Supabase</span><span>PostgreSQL</span><span>RLS</span><span>Realtime</span><span>Recharts</span>
                    </div>
                    <div className="actions">
                      <a className="case-btn primary" href="https://babiloncontrole.vercel.app/" target="_blank" rel="noreferrer">Ver projeto ao vivo →</a>
                      <a className="case-btn" href="https://github.com/pedroavv1914/Babilon" target="_blank" rel="noreferrer">github ↗</a>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {showCase(["full", "api"]) && (
              <article className="case">
                <div className="media">
                  <span className="index">02</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/api-shopsphere.png" alt="ShopSphere" />
                </div>
                <div className="body">
                  <span className="impact">E-commerce · busca · carrinho · pagamentos</span>
                  <h3 className="name">ShopSphere</h3>
                  <p className="desc">Plataforma completa de e-commerce com catálogo, busca, filtros, carrinho e processamento seguro de pagamentos. Backend organizado para sustentar regras de negócio desde cedo.</p>
                  <div className="stack"><span>React</span><span>TypeScript</span><span>Node.js</span><span>Express</span><span>PostgreSQL</span><span>Docker</span><span>JWT</span></div>
                  <div className="actions">
                    <a className="case-btn primary" href="https://github.com/pedroavv1914/frontend-api-shopSphere" target="_blank" rel="noreferrer">frontend ↗</a>
                    <a className="case-btn" href="https://github.com/pedroavv1914/backend-api-shopSphere" target="_blank" rel="noreferrer">backend ↗</a>
                  </div>
                </div>
              </article>
            )}

            {showCase(["full", "api"]) && (
              <article className="case">
                <div className="media">
                  <span className="index">03</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/api-stratix.png" alt="Stratix Task Manager" />
                </div>
                <div className="body">
                  <span className="impact">Task manager full-stack · JWT · Prisma</span>
                  <h3 className="name">Stratix</h3>
                  <p className="desc">Sistema completo de gerenciamento de tarefas com criação, organização e acompanhamento. Auth com JWT por usuário e camada de dados previsível com Prisma.</p>
                  <div className="stack"><span>React</span><span>TypeScript</span><span>Vite</span><span>Node.js</span><span>Express</span><span>Prisma</span><span>JWT</span></div>
                  <div className="actions">
                    <a className="case-btn primary" href="https://github.com/pedroavv1914/frontend-task-manager" target="_blank" rel="noreferrer">frontend ↗</a>
                    <a className="case-btn" href="https://github.com/pedroavv1914/backend-task-manager" target="_blank" rel="noreferrer">backend ↗</a>
                  </div>
                </div>
              </article>
            )}

            {showCase(["full", "api"]) && (
              <article className="case">
                <div className="media">
                  <span className="index">04</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/palazzotravel.png" alt="Palazzo Travel" />
                </div>
                <div className="body">
                  <span className="impact">Gestão de pacotes · auth · banco relacional</span>
                  <h3 className="name">Palazzo Travel</h3>
                  <p className="desc">Painel para organizar pacotes de viagem e usuários sem depender de planilhas soltas. TypeScript ponta-a-ponta, JWT em fluxos administrativos e dados modelados com TypeORM.</p>
                  <div className="stack"><span>React</span><span>TypeScript</span><span>Styled-Components</span><span>Node.js</span><span>TypeORM</span><span>PostgreSQL</span></div>
                  <div className="actions">
                    <a className="case-btn primary" href="https://github.com/pedroavv1914/agencia-viagens" target="_blank" rel="noreferrer">repositório ↗</a>
                  </div>
                </div>
              </article>
            )}

            {showCase(["full", "api"]) && (
              <article className="case">
                <div className="media">
                  <span className="index">05</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/api-petshop.png" alt="API Petshop" />
                </div>
                <div className="body">
                  <span className="impact">Operação de petshop · CRUD completo · Prisma</span>
                  <h3 className="name">API Petshop</h3>
                  <p className="desc">Página de gerenciamento de petshop com cadastro, consulta e atualização de pets, clientes e serviços. Frontend e backend separados para responsabilidades claras e leitura rápida no atendimento.</p>
                  <div className="stack"><span>React</span><span>Node.js</span><span>Express</span><span>Prisma</span><span>CSS</span></div>
                  <div className="actions">
                    <a className="case-btn primary" href="https://github.com/pedroavv1914/frontend-agendamento-petshop" target="_blank" rel="noreferrer">frontend ↗</a>
                    <a className="case-btn" href="https://github.com/pedroavv1914/backend-agendamento-petshop" target="_blank" rel="noreferrer">backend ↗</a>
                  </div>
                </div>
              </article>
            )}

            {showCase(["front"]) && (
              <article className="case">
                <div className="media">
                  <span className="index">06</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/githubfinder.png" alt="GitHub Finder" />
                </div>
                <div className="body">
                  <span className="impact">Consumo de API · UX de busca · estados claros</span>
                  <h3 className="name">GitHub Finder</h3>
                  <p className="desc">Busca de perfis públicos do GitHub com interface objetiva, responsiva e estados de carregamento e erro tratados como parte central da experiência.</p>
                  <div className="stack"><span>React</span><span>TypeScript</span><span>Vite</span><span>API GitHub</span></div>
                  <div className="actions">
                    <a className="case-btn primary" href="https://github-finder-pearl-mu.vercel.app/" target="_blank" rel="noreferrer">demo ao vivo ↗</a>
                    <a className="case-btn" href="https://github.com/pedroavv1914" target="_blank" rel="noreferrer">github ↗</a>
                  </div>
                </div>
              </article>
            )}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="sec process" id="processo">
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <div className="sec-tag">Processo</div>
              <div className="sec-num">Capítulo 04 / 05</div>
            </div>
            <div>
              <h2 className="sec-title">Quatro etapas, <em>zero improviso</em>.</h2>
              <p className="sec-lead">Do problema mal-formulado até o produto rodando na operação. Sem ruído, com checkpoint a cada passo.</p>
            </div>
          </div>

          <div className="steps stagger">
            <div className="step">
              <div className="ix">01</div>
              <h4>Diagnóstico</h4>
              <p>Conversa pra entender o que dói, onde, e o que precisa parar de doer primeiro. Saio com escopo escrito.</p>
              <div className="meta"><span>≈ 1–2 dias</span><b>output: brief</b></div>
            </div>
            <div className="step">
              <div className="ix">02</div>
              <h4>Arquitetura</h4>
              <p>Modelagem de dados, fluxo, decisões técnicas justificadas. O que entra, o que fica fora, o que vem depois.</p>
              <div className="meta"><span>≈ 2–4 dias</span><b>output: blueprint</b></div>
            </div>
            <div className="step">
              <div className="ix">03</div>
              <h4>Construção</h4>
              <p>Sprints curtas, deploy contínuo, demo a cada checkpoint. Você acompanha, não só recebe no final.</p>
              <div className="meta"><span>≈ 2–8 sem.</span><b>output: produto</b></div>
            </div>
            <div className="step">
              <div className="ix">04</div>
              <h4>Operação</h4>
              <p>Documentação, monitoramento e estrutura pra evoluir sem retrabalho. Depois da entrega, o trabalho continua bem feito.</p>
              <div className="meta"><span>contínuo</span><b>output: confiança</b></div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="sec contact" id="contato">
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <div className="sec-tag">Contato</div>
              <div className="sec-num">Capítulo 05 / 05</div>
            </div>
            <div></div>
          </div>

          <div className="contact-grid">
            <div className="contact-left reveal-x">
              <h2>Transforme sua ideia em <em>realidade.</em></h2>
              <p className="contact-lead">Conte o que você quer construir e eu respondo com próximos passos claros, sem enrolar.</p>
              <div className="response"><span className="dot"></span>Tempo médio de resposta · &lt; 24h</div>

              <div className="help">
                <div className="help-label">Como posso ajudar</div>
                <div className="help-grid">
                  <span>MVPs</span><span>Landing pages</span><span>Sistemas internos</span>
                  <span>APIs</span><span>E-commerce</span><span>Integrações</span>
                </div>
              </div>

              <div className="contact-channels">
                <a className="channel" href="mailto:pedroribeiro.contato1914@gmail.com">
                  <span className="ic">✉</span>
                  <span className="label">pedroribeiro.contato1914@gmail.com</span>
                  <span className="meta">EMAIL ↗</span>
                </a>
                <a className="channel" href="https://www.linkedin.com/in/pedro-ribeiro-a71300230/" target="_blank" rel="noreferrer">
                  <span className="ic">in</span>
                  <span className="label">linkedin · pedro-ribeiro</span>
                  <span className="meta">REDE ↗</span>
                </a>
                <a className="channel" href="https://github.com/pedroavv1914" target="_blank" rel="noreferrer">
                  <span className="ic">◍</span>
                  <span className="label">github · pedroavv1914</span>
                  <span className="meta">CÓDIGO ↗</span>
                </a>
                <div className="channel">
                  <span className="ic">⌖</span>
                  <span className="label">Jundiaí · São Paulo · Brasil</span>
                  <span className="meta">UTC−3</span>
                </div>
              </div>
            </div>

            <form className="form reveal-r d1" onSubmit={handleSubmit}>
              <div className="ftop">
                <strong>Me mande o contexto</strong>
                <span>session #2904</span>
              </div>
              <div className="field">
                <label htmlFor="n">Nome</label>
                <input id="n" name="nome" placeholder="Como devo te chamar?" />
              </div>
              <div className="field">
                <label htmlFor="e">Email</label>
                <input id="e" name="email" type="email" placeholder="seu@email.com" />
              </div>
              <div className="field">
                <label htmlFor="m">Contexto do projeto</label>
                <textarea id="m" name="mensagem" placeholder="Ideia, prazo, objetivo ou só o problema que você quer resolver." />
              </div>
              <button className="submit" type="submit">
                {submitLabel} <span className="arrow">→</span>
              </button>
              <div className="footer">// pgp opcional · resposta em até 24h</div>
            </form>
          </div>
        </div>
      </section>

      {/* SIGNOFF */}
      <section className="signoff reveal-zoom">
        <div className="wrap">
          <div className="label">— construído com obsessão por detalhes —</div>
          <div className="name">Pedro <em>Ribeiro</em></div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site">
        <div className="wrap">
          <div className="foot-top">
            <div className="foot-brand">
              <a href="#topo" className="brand">
                <LogoMark />
                <span>pedro<span style={{ color: "var(--green)" }}>.</span>ribeiro</span>
              </a>
              <p>Full-stack developer focado em performance, arquitetura limpa e produtos memoráveis. Disponível para projetos a partir de Q2 / 2026.</p>
            </div>
            <div className="foot-col">
              <h5>Navegação</h5>
              <ul>
                <li>Sobre</li><li>Skills</li><li>Projetos</li><li>Processo</li><li>Contato</li>
              </ul>
            </div>
            <div className="foot-col">
              <h5>Stack</h5>
              <ul>
                <li>React · Next.js · TS</li>
                <li>Node · Express · Prisma</li>
                <li>PostgreSQL · Supabase</li>
                <li>Docker · AWS · Vercel</li>
              </ul>
            </div>
            <div className="foot-col">
              <h5>Conexão</h5>
              <ul>
                <li>Email</li><li>GitHub</li><li>LinkedIn</li><li>Jundiaí, SP</li>
              </ul>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 Pedro Ribeiro · todos os pixels reservados</span>
            <span>feito com <em>obsessão por detalhes</em> · Jundiaí · SP</span>
          </div>
        </div>
      </footer>
    </>
  );
}
