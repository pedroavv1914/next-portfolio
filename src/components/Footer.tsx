'use client';

export default function Footer() {
  const year = new Date().getFullYear();
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="modern-footer">
      <div className="footer-bg"></div>
      
      <div className="footer-content">
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-brand">
            <h3 className="footer-logo">Pedro Ribeiro</h3>
            <p className="footer-tagline">
              Desenvolvedor Full Stack apaixonado por criar soluções inovadoras e experiências digitais excepcionais.
            </p>
            <div className="footer-social">
              <a href="https://www.linkedin.com/in/pedro-ribeiro-a71300230/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="https://github.com/pedroavv1914" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <i className="bi bi-github"></i>
              </a>
              <a href="https://www.instagram.com/_pedroavv/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-nav">
            <h4 className="footer-nav-title">Navegação</h4>
            <ul className="footer-nav-list">
              <li><button onClick={() => scrollToSection('inicio')} className="footer-link">Início</button></li>
              <li><button onClick={() => scrollToSection('sobre')} className="footer-link">Sobre</button></li>
              <li><button onClick={() => scrollToSection('especialidades')} className="footer-link">Especialidades</button></li>
              <li><button onClick={() => scrollToSection('portfolio')} className="footer-link">Portfólio</button></li>
              <li><button onClick={() => scrollToSection('contato')} className="footer-link">Contato</button></li>
            </ul>
          </div>

          {/* Skills */}
          <div className="footer-skills">
            <h4 className="footer-nav-title">Tecnologias</h4>
            <ul className="footer-nav-list">
              <li><span className="footer-skill">React & Next.js</span></li>
              <li><span className="footer-skill">Node.js & Python</span></li>
              <li><span className="footer-skill">TypeScript</span></li>
              <li><span className="footer-skill">Tailwind CSS</span></li>
              <li><span className="footer-skill">PostgreSQL & MongoDB</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <h4 className="footer-nav-title">Contato</h4>
            <div className="footer-contact-info">
              <div className="footer-contact-item">
                <i className="bi bi-envelope"></i>
                <span>pedroavv1914@gmail.com</span>
              </div>
              <div className="footer-contact-item">
                <i className="bi bi-geo-alt"></i>
                <span>São Paulo, Brasil</span>
              </div>
              <div className="footer-contact-item">
                <i className="bi bi-phone"></i>
                <span>Disponível para projetos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {year} Pedro Ribeiro. Todos os direitos reservados.
            </p>
            <div className="footer-bottom-links">
              <span className="footer-bottom-link">Desenvolvido com ❤️ e Next.js</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
