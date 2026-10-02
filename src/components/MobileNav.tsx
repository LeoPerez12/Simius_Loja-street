import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onCartClick: () => void;
}

export default function MobileNav({ isOpen, onClose, onCartClick }: MobileNavProps) {
  const { isAuthenticated, user, openAuth } = useAuth();
  const { totalItems } = useCart();

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  const handleAccountClick = () => {
    openAuth('login');
    onClose();
  };

  const handleCartClick = () => {
    onCartClick();
    onClose();
  };

  return (
    <div className={`mobilenav-overlay ${isOpen ? 'is-open' : ''}`} onClick={handleOverlayClick}>
      <aside className="mobilenav-panel" role="dialog" aria-modal="true" aria-label="Menu">
        <div className="mobilenav-header">
          <span className="mobilenav-title">Menu</span>
          <button className="icon-btn" aria-label="Fechar menu" onClick={onClose}>
            ✕
          </button>
        </div>

        <button type="button" className="mobilenav-cart" onClick={handleCartClick}>
          <span>Sacola</span>
          <span className="mobilenav-cart-count">{totalItems}</span>
        </button>

        <nav className="mobilenav-links">
          <Link to="/" onClick={onClose}>
            Início
          </Link>
          <a href="/#categorias" onClick={onClose}>
            Categorias
          </a>
          <a href="/#colecao" onClick={onClose}>
            Coleção
          </a>
          <a href="/#sobre" onClick={onClose}>
            Sobre
          </a>
        </nav>

        <button type="button" className="mobilenav-account" onClick={handleAccountClick}>
          {isAuthenticated ? `Minha conta — ${user?.name}` : 'Entrar ou criar conta'}
        </button>
      </aside>
    </div>
  );
}
    