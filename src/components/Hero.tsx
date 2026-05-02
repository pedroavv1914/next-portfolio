export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="interface hero-inner">
        <div className="hero-layout reveal">
          <div className="hero-copy reveal-child">
            <p className="hero-kicker">{"// full-stack developer brasileiro"}</p>
            <h1 className="hero-name" aria-label="Pedro Ribeiro">
              <span>Pedro</span>
              <span className="hero-surname">Ribeiro<span className="hero-signature" aria-hidden="true" /></span>
            </h1>
            <p className="hero-tagline">
              Eu desenho o caminho entre uma ideia promissora e um produto que parece inevitável.
            </p>
            <p className="hero-desc">
              A obsessão mora nos últimos 10%: performance, micro-interações, arquitetura limpa e escolhas que deixam o usuário em paz.
            </p>

            <div className="hero-actions">
              <a href="#portifolio" className="btn btn-primary">Ver projetos selecionados</a>
              <a href="#formulario" className="btn btn-outline">Iniciar conversa</a>
            </div>

            <div className="hero-socials" aria-label="Redes sociais">
              <a href="https://github.com/pedroavv1914" target="_blank" rel="noreferrer" aria-label="GitHub">
                <i className="bi bi-github" aria-hidden="true" />
              </a>
              <span aria-hidden="true">·</span>
              <a href="https://www.linkedin.com/in/pedro-ribeiro-a71300230/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <i className="bi bi-linkedin" aria-hidden="true" />
              </a>
              <span aria-hidden="true">·</span>
              <a href="https://www.instagram.com/_pedroavv/" target="_blank" rel="noreferrer" aria-label="Instagram">
                <i className="bi bi-instagram" aria-hidden="true" />
              </a>
            </div>
          </div>

          <aside className="hero-signal reveal-child" aria-label="Resumo profissional">
            <div className="hero-signal-top">
              <span className="pulse-dot" aria-hidden="true" />
              Disponível para projetos
            </div>
            <div className="hero-code-card">
              <span className="code-muted">pedro.workflow</span>
              <strong>detalhe_final = produto_memorável</strong>
              <p>
                React, Next.js, Node e SQL trabalhando juntos para entregar fluxos rápidos, claros e bem acabados.
              </p>
            </div>
            <div className="hero-metrics">
              <div>
                <strong>3+</strong>
                <span>anos criando produto</span>
              </div>
              <div>
                <strong>12+</strong>
                <span>projetos no portfólio</span>
              </div>
              <div>
                <strong>24h</strong>
                <span>resposta média</span>
              </div>
            </div>
            <div className="hero-stack-strip">
              <span>React</span>
              <span>Next.js</span>
              <span>Node</span>
              <span>PostgreSQL</span>
            </div>
          </aside>
        </div>
      </div>

      <a className="scroll-indicator" href="#sobre" aria-label="Rolar para a seção sobre">
        <span>scroll</span>
      </a>
    </section>
  );
}
