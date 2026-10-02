import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import cartIcon from '../assets/sacola.png';
import logo from '../assets/logo.png';
import { useCart } from '../context/CartContext';
import { searchProducts } from '../utils/search';
import { formatPrice, imageUrl } from '../utils/format';
import type { Product } from '../types';
import AccountButton from './AccountButton';
import MobileNav from './MobileNav';

interface HeaderProps {
  onCartClick: () => void;
}

export default function Header({ onCartClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);

  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [isBouncing, setIsBouncing] = useState(false);
  const previousTotal = useRef(totalItems);

  // toda vez que a quantidade de itens AUMENTA, dispara o "pulinho"
  useEffect(() => {
    if (totalItems > previousTotal.current) {
      setIsBouncing(true);
      const timer = window.setTimeout(() => setIsBouncing(false), 500);
      previousTotal.current = totalItems;
      return () => window.clearTimeout(timer);
    }
    previousTotal.current = totalItems;
  }, [totalItems]);

  // esconde a logo (só no mobile, via CSS) depois de rolar um pouco a página
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // atualiza as sugestões toda vez que a pessoa digita
  useEffect(() => {
    if (query.trim().length === 0) {
      setSuggestions([]);
      return;
    }
    setSuggestions(searchProducts(query, 5));
  }, [query]);

  const resetSearch = () => {
    setQuery('');
    setSuggestions([]);
    setIsSuggestionsOpen(false);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    navigate(trimmed ? `/?busca=${encodeURIComponent(trimmed)}` : '/');
    resetSearch();
  };

  const handleSuggestionClick = (id: number) => {
    navigate(`/produto/${id}`);
    resetSearch();
  };

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="header-inner">
        <button
          className="nav-toggle"
          aria-label="Abrir menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(true)}
        >
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
            <path d="M0 1H20" stroke="currentColor" strokeWidth="1.5" />
            <path d="M0 7H20" stroke="currentColor" strokeWidth="1.5" />
            <path d="M0 13H20" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>

        <Link
          to="/"
          className="logo"
          onClick={() => {
            if (location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <img src={logo} alt="Loja Street" />
        </Link>

        <div className="header-search-wrapper">
          <form className="header-search" onSubmit={handleSearchSubmit}>
            <button type="submit" className="header-search-submit" aria-label="Buscar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <input
              type="search"
              placeholder="Buscar produtos"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsSuggestionsOpen(true);
              }}
              onFocus={() => setIsSuggestionsOpen(true)}
              // pequeno atraso pra dar tempo do clique na sugestão registrar antes de fechar
              onBlur={() => window.setTimeout(() => setIsSuggestionsOpen(false), 150)}
            />
          </form>

          {isSuggestionsOpen && suggestions.length > 0 && (
            <div className="search-suggestions">
              {suggestions.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  className="search-suggestion"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSuggestionClick(product.id);
                  }}
                >
                  <img src={imageUrl(product.seed, 80, 100)} alt={product.name} />
                  <span className="search-suggestion-info">
                    <span className="search-suggestion-name">{product.name}</span>
                    <span className="search-suggestion-price">{formatPrice(product.price)}</span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="header-actions">
          <AccountButton />

          <button
            className={`icon-btn cart-btn ${isBouncing ? 'is-bouncing' : ''}`}
            aria-label="Abrir sacola"
            onClick={onCartClick}
          >
            <img src={cartIcon} alt="" className="cart-icon-img" />
            <span className="cart-count">{totalItems}</span>
          </button>
        </div>
      </div>

      <MobileNav
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onCartClick={onCartClick}
      />
    </header>
  );
}
