export default function Contato() {
  return (
    <section className="formulario" id="formulario">
      <div className="interface">
        <h2 className="titulo">FALA <span>COMIGO.</span></h2>
        <form className="form" noValidate>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="nome">Seu nome</label>
              <input id="nome" name="nome" type="text" placeholder="Seu nome" required aria-required="true" />
              <span className="error" role="alert" aria-live="polite" />
            </div>

            <div className="form-field">
              <label htmlFor="email">Seu e-mail</label>
              <input id="email" name="email" type="email" placeholder="seu@email.com" required aria-required="true" />
              <span className="error" role="alert" aria-live="polite" />
            </div>

            <div className="form-field">
              <label htmlFor="telefone">Seu telefone</label>
              <input id="telefone" name="telefone" type="tel" placeholder="(00) 00000-0000" />
              <span className="error" role="alert" aria-live="polite" />
            </div>

            <div className="form-field form-field--full">
              <label htmlFor="mensagem">Sua mensagem</label>
              <textarea id="mensagem" name="mensagem" placeholder="Como posso te ajudar?" rows={6} required aria-required="true" />
              <span className="error" role="alert" aria-live="polite" />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              <i className="bi bi-send" /> Enviar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
