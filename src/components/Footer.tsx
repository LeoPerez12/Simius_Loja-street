import type { FormEvent } from 'react';
import { useToastContext } from '../context/ToastContext';
import { WHATSAPP_DISPLAY, WHATSAPP_LINK } from '../config';

export default function Footer() {
  const { showToast } = useToastContext();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    showToast('E-mail cadastrado com sucesso');
    event.currentTarget.reset();
  };

  return (
    <footer className="site-footer" id="sobre">
      <div className="footer-top">
        <div className="footer-brand">
          <p className="footer-word">Simius</p>
          <p className="footer-tagline">Streetwear feito em São Paulo.</p>
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="footer-whatsapp">
            WhatsApp: {WHATSAPP_DISPLAY}
          </a>
        </div>

        <div className="footer-cols">
          <div className="footer-col">
            <h3>Ajuda</h3>
            <a href="#">Trocas e devoluções</a>
            <a href="#">Guia de tamanhos</a>
            <a href="#">Frete e entrega</a>
          </div>
          <div className="footer-col">
            <h3>Empresa</h3>
            <a href="#">Sobre a Simius</a>
            <a href="#">Lookbook</a>
            <a href="#">Trabalhe conosco</a>
          </div>
          <div className="footer-col">
            <h3>Fique por dentro</h3>
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input type="email" placeholder="Seu e-mail" required aria-label="Seu e-mail" />
              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Simius. Todos os direitos reservados.</span>
        <div className="footer-social">
          <a href="#">Instagram</a>
          <a href="#">TikTok</a>
        </div>
      </div>
    </footer>
  );
}
