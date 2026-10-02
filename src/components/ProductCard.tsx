import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useToastContext } from '../context/ToastContext';
import { formatPrice, imageUrl } from '../utils/format';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { showToast } = useToastContext();

  const handleQuickAdd = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product.id, product.sizes[0], product.colors[0]?.name ?? 'Único', 1);
    showToast(`${product.name} adicionado à sacola`);
  };

  return (
    <article className="product-card">
      <Link to={`/produto/${product.id}`} className="product-media">
        <img src={imageUrl(product.seed, 500, 640)} alt={product.name} loading="lazy" />
        <button
          className="quick-add"
          aria-label={`Adicionar ${product.name} à sacola`}
          onClick={handleQuickAdd}
        >
          +
        </button>
      </Link>
      <div className="product-info">
        <Link to={`/produto/${product.id}`} className="product-name">
          {product.name}
        </Link>
        <div className="product-meta">
          <span className="product-price">{formatPrice(product.price)}</span>
          <span className="product-category">— {product.categoryLabel}</span>
        </div>
      </div>
    </article>
  );
}
