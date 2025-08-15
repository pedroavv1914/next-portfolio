export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="interface">
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-greeting">Olá, eu sou</span>
            <h1 className="hero-title">Pedro <span>Ribeiro</span></h1>
            <div className="hero-subtitle">
              <span className="typing-text">Desenvolvedor Full Stack</span>
              <span className="cursor">|</span>
            </div>
            <p className="hero-description">Transformando ideias em soluções digitais inovadoras com código limpo e design responsivo.</p>
            <div className="hero-buttons">
              <a href="#portifolio" className="btn-primary">Meus Projetos</a>
              <a href="#formulario" className="btn-secondary">Fale Comigo</a>
            </div>
          </div>
          <div className="hero-social">
            <a href="https://www.linkedin.com/in/pedro-ribeiro-a71300230/" target="_blank" className="social-icon" aria-label="LinkedIn"><i className="bi bi-linkedin" /></a>
            <a href="https://github.com/pedroavv1914" target="_blank" className="social-icon" aria-label="GitHub"><i className="bi bi-github" /></a>
            <a href="https://www.instagram.com/_pedroavv/" target="_blank" className="social-icon" aria-label="Instagram"><i className="bi bi-instagram" /></a>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Role para baixo</span>
          <i className="bi bi-arrow-down" />
        </div>
      </div>
      <div id="particles-js" />
    </section>
  );
}
