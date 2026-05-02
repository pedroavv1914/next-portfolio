export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="interface">
        <div className="footer-grid">
          <div>
            <p className="footer-logo">PR<span>.</span></p>
            <p>Full-stack developer focado em performance, arquitetura limpa e produtos memoráveis.</p>
            <p className="status-line">
              <span className="pulse-dot" aria-hidden="true" />
              Disponível para projetos
            </p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <h3>Navegação</h3>
            <ul>
              <li><a href="#sobre">Sobre</a></li>
              <li><a href="#especialidades">Skills</a></li>
              <li><a href="#portifolio">Projetos</a></li>
              <li><a href="#formulario">Contato</a></li>
            </ul>
          </nav>

          <div>
            <h3>Tecnologias</h3>
            <ul>
              <li>React · Next.js · TypeScript</li>
              <li>Node.js · Express · Prisma</li>
              <li>PostgreSQL · MongoDB</li>
              <li>Docker · AWS · Vercel</li>
            </ul>
          </div>

          <div>
            <h3>Contato</h3>
            <ul>
              <li><a href="mailto:pedroribeiro.contato1914@gmail.com">Email</a></li>
              <li><a href="https://github.com/pedroavv1914" target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/pedro-ribeiro-a71300230/" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li>Franco da Rocha, SP</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          © 2025 Pedro Ribeiro · Feito com <span>obsessão por detalhes</span> · Franco da Rocha, SP
        </div>
      </div>
    </footer>
  );
}
