import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "cassxclass_cart_v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const lineKey = (id, variant) => `${id}::${JSON.stringify(variant || {})}`;

  const addItem = (product, variant = {}, qty = 1) => {
    setItems((prev) => {
      const key = lineKey(product.id, variant);
      const existing = prev.find((i) => lineKey(i.id, i.variant) === key);
      if (existing) {
        return prev.map((i) =>
          lineKey(i.id, i.variant) === key ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images?.[0],
          variant,
          qty,
        },
      ];
    });
    setIsOpen(true);
  };

  const removeItem = (id, variant) => {
    setItems((prev) => prev.filter((i) => lineKey(i.id, i.variant) !== lineKey(id, variant)));
  };

  const updateQty = (id, variant, qty) => {
    if (qty < 1) return removeItem(id, variant);
    setItems((prev) =>
      prev.map((i) => (lineKey(i.id, i.variant) === lineKey(id, variant) ? { ...i, qty } : i))
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);
  const totalPrice = useMemo(() => items.reduce((sum, i) => sum + i.qty * i.price, 0), [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        totalItems,
        totalPrice,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
