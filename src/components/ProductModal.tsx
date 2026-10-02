import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import type { Product } from '../types';
import { formatPrice, imageUrl } from '../utils/format';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAdd: (id: number, size: string, qty: number) => void;
}

export default function ProductModal({ product, onClose, onAdd }: ProductModalProps) {
  // mantém o último produto renderizado durante a animação de fechamento
  const [displayProduct, setDisplayProduct] = useState<Product | null>(null);
  const [size, setSize] = useState('');
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) {
      setDisplayProduct(product);
      setSize(product.sizes[0]);
      setQty(1);
    }
  }, [product]);

  const isOpen = product !== null;

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'is-open' : ''}`} onClick={handleOverlayClick}>
      <div className="product-modal" role="dialog" aria-modal="true" aria-label="Detalhes do produto">
        <button className="modal-close" aria-label="Fechar" onClick={onClose}>
          ✕
        </button>

        {displayProduct && (
          <div className="modal-content">
            <div className="modal-image">
              <img src={imageUrl(displayProduct.seed, 700, 700)} alt={displayProduct.name} />
            </div>

            <p className="modal-category">{displayProduct.categoryLabel}</p>
            <h2 className="modal-name">{displayProduct.name}</h2>
            <p className="modal-price">{formatPrice(displayProduct.price)}</p>
            <p className="modal-desc">{displayProduct.description}</p>

            <p className="modal-label">Tamanho</p>
            <div className="size-options">
              {displayProduct.sizes.map((s) => (
                <button
                  key={s}
                  className={`size-chip ${s === size ? 'is-selected' : ''}`}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="qty-row">
              <p className="modal-label" style={{ marginTop: 0 }}>
                Quantidade
              </p>
              <div className="qty-stepper">
                <button aria-label="Diminuir quantidade" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                  −
                </button>
                <span>{qty}</span>
                <button aria-label="Aumentar quantidade" onClick={() => setQty((q) => Math.min(5, q + 1))}>
                  +
                </button>
              </div>
            </div>

            <button
              className="btn btn-primary modal-add"
              onClick={() => onAdd(displayProduct.id, size, qty)}
            >
              Adicionar à sacola
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
