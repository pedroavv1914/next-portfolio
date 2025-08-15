export default function Header() {
  return (
    <header className="nav-magic" id="topo">
      <div className="nav-progress" aria-hidden="true" />
      <div className="interface">
        <div className="logo">
          <a href="#inicio">
            <h1>PEDRO RIBEIRO</h1>
            <span>Software Developer</span>
          </a>
        </div>

        <nav className="menu-desktop">
          <ul>
            <li><a href="#inicio">INICIO</a></li>
            <li><a href="#sobre">SOBRE</a></li>
            <li><a href="#especialidades">ESPECIALIDADES</a></li>
            <li><a href="#portifolio">PROJETOS</a></li>
          </ul>
        </nav>

        <div className="btn-enviar btn-enviar-header">
          <a href="#formulario" className="btn-link-as-input">CONTATO</a>
        </div>

        <div className="btn-abrir-menu" id="btn-menu">
          <i className="bi bi-list-nested" />
        </div>

        <div className="menu-mobile" id="menu-mobile">
          <div className="btn-fechar">
            <i className="bi bi-x-lg" />
          </div>
          <nav>
            <ul>
              <li><a href="#inicio">INICIO</a></li>
              <li><a href="#sobre">SOBRE</a></li>
              <li><a href="#especialidades">ESPECIALIDADES</a></li>
              <li><a href="#portifolio">PROJETOS</a></li>
              <li><a href="#formulario">CONTATO</a></li>
            </ul>
          </nav>
        </div>

        <div className="overlay-menu" id="overlay-menu" />
      </div>
    </header>
  );
}
