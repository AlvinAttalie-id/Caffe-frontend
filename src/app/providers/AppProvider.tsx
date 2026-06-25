import React, { createContext, useCallback, useContext, useMemo, useRef, useState, type RefObject } from "react";
import { Product } from "@features/products/types";
import { CartItem } from "@features/orders/types";

interface AppContextValue {
  cartItems: CartItem[];
  favorites: number[];
  selectedProduct: Product | null;
  cartCount: number;
  addToCart: (item: CartItem) => void;
  quickAdd: (product: Product) => void;
  toggleFavorite: (id: number) => void;
  setSelectedProduct: (product: Product | null) => void;
  openProduct: (product: Product) => void;
  productNavIdRef: RefObject<number | null>;
  updateCartQty: (idx: number, qty: number) => void;
  removeFromCart: (idx: number) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [selectedProduct, setSelectedProductState] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([1, 3, 6]);
  const productNavIdRef = useRef<number | null>(null);

  const setSelectedProduct = useCallback((product: Product | null) => {
    if (product) {
      productNavIdRef.current = product.id;
    }
    setSelectedProductState(product);
  }, []);

  const toggleFavorite = useCallback((id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  }, []);

  const addToCart = useCallback((item: CartItem) => {
    setCartItems(prev => {
      const idx = prev.findIndex(
        i => i.product.id === item.product.id && i.size === item.size
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + item.quantity };
        return next;
      }
      return [...prev, item];
    });
  }, []);

  const quickAdd = useCallback(
    (product: Product) => {
      addToCart({
        product,
        quantity: 1,
        size: "M",
        sugar: "Normal",
        ice: "Normal",
        toppings: [],
      });
    },
    [addToCart]
  );

  const openProduct = useCallback(
    (product: Product) => {
      setSelectedProduct(product);
    },
    [setSelectedProduct]
  );

  const updateCartQty = useCallback((idx: number, qty: number) => {
    setCartItems(prev => {
      const next = [...prev];
      next[idx] = { ...next[idx], quantity: qty };
      return next;
    });
  }, []);

  const removeFromCart = useCallback((idx: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== idx));
  }, []);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const value = useMemo<AppContextValue>(
    () => ({
      cartItems,
      favorites,
      selectedProduct,
      cartCount,
      addToCart,
      quickAdd,
      toggleFavorite,
      setSelectedProduct,
      openProduct,
      productNavIdRef,
      updateCartQty,
      removeFromCart,
    }),
    [
      cartItems,
      favorites,
      selectedProduct,
      cartCount,
      addToCart,
      quickAdd,
      toggleFavorite,
      setSelectedProduct,
      openProduct,
      updateCartQty,
      removeFromCart,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
