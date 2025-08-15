export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="interface">
        <p>© {year} Pedro Ribeiro. Todos os direitos reservados.</p>
        <div className="footer-social">
          <a href="https://www.linkedin.com/in/pedro-ribeiro-a71300230/" target="_blank" aria-label="LinkedIn"><i className="bi bi-linkedin" /></a>
          <a href="https://github.com/pedroavv1914" target="_blank" aria-label="GitHub"><i className="bi bi-github" /></a>
          <a href="https://www.instagram.com/_pedroavv/" target="_blank" aria-label="Instagram"><i className="bi bi-instagram" /></a>
        </div>
      </div>
    </footer>
  );
}
