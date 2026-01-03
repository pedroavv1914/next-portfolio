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
              <li><span className="footer-skill">React & Next.js & Tailwind CSS</span></li>
              <li><span className="footer-skill">JavaScript & TypeScript & Node.js</span></li>
              <li><span className="footer-skill">Python & C#</span></li>
              <li><span className="footer-skill">PostgreSQL & MongoDB</span></li>
              <li><span className="footer-skill">Docker & AWS & Vercel & Nginx</span></li>
              <li><span className="footer-skill">Git & VS Code & Postman</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <h4 className="footer-nav-title">Contato</h4>
            <div className="footer-contact-info">
              <div className="footer-contact-item">
                <i className="bi bi-envelope"></i>
                <span>pedroribeiro.contato1914@gmail.com</span>
              </div>
              <div className="footer-contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"/>
                  <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"/>
                </svg>
                <span>São Paulo, Brasil</span>
              </div>
              <div className="footer-contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59531 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04207 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z"/>
                </svg>
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
