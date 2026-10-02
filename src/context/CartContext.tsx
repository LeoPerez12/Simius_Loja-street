import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { CartItem } from '../types';
import { getProduct } from '../data/products';

interface CartContextValue {
  cart: CartItem[];
  addToCart: (id: number, size: string, color: string, qty: number) => void;
  removeFromCart: (index: number) => void;
  decreaseQty: (index: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (id: number, size: string, color: string, qty: number) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === id && item.size === size && item.color === color
      );
      if (existingIndex >= 0) {
        return prev.map((item, index) =>
          index === existingIndex ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { id, size, color, qty }];
    });
  };

  // remove o item inteiro, não importa a quantidade
  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // tira 1 unidade; se já tiver só 1, remove o item inteiro
  const decreaseQty = (index: number) => {
    setCart((prev) => {
      const item = prev[index];
      if (!item) return prev;
      if (item.qty <= 1) {
        return prev.filter((_, i) => i !== index);
      }
      return prev.map((cartItem, i) => (i === index ? { ...cartItem, qty: cartItem.qty - 1 } : cartItem));
    });
  };

  const clearCart = () => setCart([]);

  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + (getProduct(item.id)?.price ?? 0) * item.qty, 0),
    [cart]
  );

  const value: CartContextValue = {
    cart,
    addToCart,
    removeFromCart,
    decreaseQty,
    clearCart,
    totalItems,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart precisa ser usado dentro de um CartProvider');
  return ctx;
}
