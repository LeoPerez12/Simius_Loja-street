import { useState } from 'react';
import type { MouseEvent } from 'react';
import { useCart } from '../context/CartContext';
import { useToastContext } from '../context/ToastContext';
import { getProduct } from '../data/products';
import { formatPrice, imageUrl } from '../utils/format';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, decreaseQty, addToCart, clearCart, subtotal } = useCart();
  const { showToast } = useToastContext();

  // guarda o índice do item que está pedindo confirmação pra remover, ou null se nenhum
  const [confirmIndex, setConfirmIndex] = useState<number | null>(null);

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    showToast('Pedido simulado com sucesso');
    clearCart();
    onClose();
  };

  const handleConfirmRemove = (index: number) => {
    removeFromCart(index);
    setConfirmIndex(null);
  };

  return (
    <div className={`cart-overlay ${isOpen ? 'is-open' : ''}`} onClick={handleOverlayClick}>
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Sacola de compras">
        <div className="cart-header">
          <h3>Sacola</h3>
          <button className="icon-btn" aria-label="Fechar sacola" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="cart-empty">Sua sacola está vazia.</p>
          ) : (
            cart.map((item, index) => {
              const product = getProduct(item.id);
              if (!product) return null;

              return (
                <div className="cart-item" key={`${item.id}-${item.size}-${item.color}`}>
                  <img src={imageUrl(product.seed, 140, 170)} alt={product.name} />
                  <div className="cart-item-info">
                    <p className="cart-item-name">{product.name}</p>
                    <p className="cart-item-meta">
                      {item.color} · Tam. {item.size}
                    </p>
                    <p className="cart-item-price">{formatPrice(product.price * item.qty)}</p>

                    <div className="cart-item-qty">
                      <button
                        type="button"
                        aria-label="Diminuir quantidade"
                        onClick={() => decreaseQty(index)}
                      >
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button
                        type="button"
                        aria-label="Aumentar quantidade"
                        onClick={() => addToCart(item.id, item.size, item.color, 1)}
                      >
                        +
                      </button>
                    </div>

                    {confirmIndex === index ? (
                      <div className="cart-item-confirm">
                        <span>Certeza que quer remover esse produto?</span>
                        <div className="cart-item-confirm-actions">
                          <button
                            type="button"
                            className="cart-item-confirm-yes"
                            onClick={() => handleConfirmRemove(index)}
                          >
                            Sim, remover
                          </button>
                          <button
                            type="button"
                            className="cart-item-confirm-no"
                            onClick={() => setConfirmIndex(null)}
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="cart-item-remove"
                        onClick={() => setConfirmIndex(index)}
                      >
                        Remover tudo
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-subtotal">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <button className="btn btn-primary btn-block" onClick={handleCheckout}>
            Finalizar compra
          </button>
        </div>
      </aside>
    </div>
  );
}
