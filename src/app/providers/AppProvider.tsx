import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@lib/axios";
import { queryClient } from "@lib/react-query";
import { useAuth } from "@features/auth/hooks/useAuth";
import { Store, useStores } from "@features/dashboard/hooks/useStores";
import { Product } from "@features/products/types";
import { CartItem } from "@features/orders/types";

const SELECTED_STORE_KEY = "caffe_brew_selected_store";

interface AppContextValue {
  cartItems: CartItem[];
  favorites: number[];
  selectedProduct: Product | null;
  selectedStore: Store | null;
  cartCount: number;
  addToCart: (item: CartItem) => Promise<void>;
  quickAdd: (product: Product) => Promise<void>;
  toggleFavorite: (id: number) => Promise<void>;
  setSelectedProduct: (product: Product | null) => void;
  setSelectedStore: (store: Store) => void;
  openProduct: (product: Product) => void;
  productNavIdRef: RefObject<number | null>;
  updateCartQty: (idx: number, qty: number) => Promise<void>;
  removeFromCart: (idx: number) => Promise<void>;
  voucher: any;
  summary: {
    subtotal: number;
    discount: number;
    delivery_fee: number;
    service_fee: number;
    tax: number;
    total: number;
  };
  applyVoucher: (code: string) => Promise<void>;
  removeVoucher: () => Promise<void>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [selectedProduct, setSelectedProductState] = useState<Product | null>(null);
  const [selectedStore, setSelectedStoreState] = useState<Store | null>(() => {
    try {
      const raw = localStorage.getItem(SELECTED_STORE_KEY);
      return raw ? (JSON.parse(raw) as Store) : null;
    } catch {
      return null;
    }
  });
  const productNavIdRef = useRef<number | null>(null);
  const { isAuthenticated } = useAuth();
  const { data: stores = [] } = useStores();

  useEffect(() => {
    if (!selectedStore && stores.length > 0) {
      setSelectedStoreState(stores[0]);
      localStorage.setItem(SELECTED_STORE_KEY, JSON.stringify(stores[0]));
    }
  }, [stores, selectedStore]);

  // Query to fetch cart from backend
  const { data: apiCart } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await api.get("/cart");
      return res.data.data;
    },
    enabled: isAuthenticated,
  });

  // Query to fetch favorites from backend
  const { data: apiFavorites } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const res = await api.get("/favorites");
      return res.data.data;
    },
    enabled: isAuthenticated,
  });

  // Map API Cart to frontend CartItem structure
  const cartItems = useMemo<CartItem[]>(() => {
    if (!apiCart || !apiCart.items) return [];
    return apiCart.items.map((item: any) => ({
      id: item.id, // backend cart item id
      product: {
        id: item.product.id,
        name: item.product.name,
        price: Number(item.product.base_price),
        rating: 4.8,
        reviews: 180,
        image: item.product.image_url || "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop&auto=format",
        category: item.product.slug,
        description: "",
        calories: 120,
      },
      quantity: item.quantity,
      size: item.size?.name || "Regular",
      sugar: item.sugar_level?.name || "Normal Sugar",
      ice: item.ice_level?.name || "Normal Ice",
      toppings: item.toppings?.map((t: any) => t.name) || [],
      // Storing mapped extra values for updating
      product_size_id: item.size?.id,
      product_sugar_level_id: item.sugar_level?.id,
      product_ice_level_id: item.ice_level?.id,
      topping_ids: item.toppings?.map((t: any) => t.id) || [],
      notes: item.notes || "",
    }));
  }, [apiCart]);

  // Extract totals summary from API Cart summary response
  const summary = useMemo(() => {
    if (!apiCart || !apiCart.summary) {
      return { subtotal: 0, discount: 0, delivery_fee: 0, service_fee: 0, tax: 0, total: 0 };
    }
    return {
      subtotal: Number(apiCart.summary.subtotal || 0),
      discount: Number(apiCart.summary.discount || 0),
      delivery_fee: Number(apiCart.summary.delivery_fee || 0),
      service_fee: Number(apiCart.summary.service_fee || 0),
      tax: Number(apiCart.summary.tax || 0),
      total: Number(apiCart.summary.total || 0),
    };
  }, [apiCart]);

  const voucher = apiCart?.voucher || null;

  // Map API Favorites to simple array of numbers
  const favorites = useMemo<number[]>(() => {
    if (!apiFavorites) return [];
    return apiFavorites.map((p: any) => p.id);
  }, [apiFavorites]);

  const setSelectedProduct = useCallback((product: Product | null) => {
    if (product) {
      productNavIdRef.current = product.id;
    }
    setSelectedProductState(product);
  }, []);

  const setSelectedStore = useCallback((store: Store) => {
    setSelectedStoreState(store);
    localStorage.setItem(SELECTED_STORE_KEY, JSON.stringify(store));
  }, []);

  const toggleFavorite = useCallback(async (id: number) => {
    try {
      await api.post(`/favorites/products/${id}/toggle`);
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    } catch (err) {
      console.error("Failed to toggle favorite", err);
    }
  }, []);

  const addToCart = useCallback(async (item: CartItem & Record<string, any>) => {
    try {
      // Find IDs for options dynamically from selectedProduct detail if not present
      let sizeId = item.product_size_id || null;
      let sugarId = item.product_sugar_level_id || null;
      let iceId = item.product_ice_level_id || null;
      let toppingIds = item.topping_ids || [];

      // Fallback matching by name from the current selectedProduct
      const pDetail = selectedProduct as any;
      if (pDetail && pDetail.id === item.product.id) {
        if (!sizeId && item.size) {
          sizeId = pDetail.sizes?.find((s: any) => s.name === item.size)?.id || null;
        }
        if (!sugarId && item.sugar) {
          sugarId = pDetail.sugar_levels?.find((s: any) => s.name === item.sugar)?.id || null;
        }
        if (!iceId && item.ice) {
          iceId = pDetail.ice_levels?.find((i: any) => i.name === item.ice)?.id || null;
        }
        if (toppingIds.length === 0 && item.toppings && item.toppings.length > 0) {
          toppingIds = pDetail.toppings?.filter((t: any) => item.toppings.includes(t.name)).map((t: any) => t.id) || [];
        }
      }

      await api.post("/cart", {
        product_id: item.product.id,
        product_size_id: sizeId,
        product_sugar_level_id: sugarId,
        product_ice_level_id: iceId,
        quantity: item.quantity,
        notes: item.notes || "",
        toppings: toppingIds,
      });

      queryClient.invalidateQueries({ queryKey: ["cart"] });
    } catch (err) {
      console.error("Failed to add item to cart", err);
      throw err;
    }
  }, [selectedProduct]);

  const quickAdd = useCallback(
    async (product: Product & Record<string, any>) => {
      try {
        // Quick add uses the first size, sugar level, and ice level if available
        const sizeId = product.sizes?.[0]?.id || null;
        const sugarId = product.sugar_levels?.[0]?.id || null;
        const iceId = product.ice_levels?.[0]?.id || null;

        await api.post("/cart", {
          product_id: product.id,
          product_size_id: sizeId,
          product_sugar_level_id: sugarId,
          product_ice_level_id: iceId,
          quantity: 1,
          toppings: [],
        });

        queryClient.invalidateQueries({ queryKey: ["cart"] });
      } catch (err) {
        console.error("Failed to quick add item to cart", err);
      }
    },
    []
  );

  const openProduct = useCallback(
    (product: Product) => {
      setSelectedProduct(product);
    },
    [setSelectedProduct]
  );

  const updateCartQty = useCallback(async (idx: number, qty: number) => {
    try {
      const item = cartItems[idx] as any;
      if (item && item.id) {
        await api.put(`/cart/items/${item.id}`, { quantity: qty });
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      }
    } catch (err) {
      console.error("Failed to update cart quantity", err);
    }
  }, [cartItems]);

  const removeFromCart = useCallback(async (idx: number) => {
    try {
      const item = cartItems[idx] as any;
      if (item && item.id) {
        await api.delete(`/cart/items/${item.id}`);
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      }
    } catch (err) {
      console.error("Failed to remove item from cart", err);
    }
  }, [cartItems]);

  const applyVoucher = useCallback(async (code: string) => {
    await api.post("/cart/voucher", { voucher_code: code });
    queryClient.invalidateQueries({ queryKey: ["cart"] });
  }, []);

  const removeVoucher = useCallback(async () => {
    await api.delete("/cart/voucher");
    queryClient.invalidateQueries({ queryKey: ["cart"] });
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
      selectedStore,
      cartCount,
      addToCart,
      quickAdd,
      toggleFavorite,
      setSelectedProduct,
      setSelectedStore,
      openProduct,
      productNavIdRef,
      updateCartQty,
      removeFromCart,
      voucher,
      summary,
      applyVoucher,
      removeVoucher,
    }),
    [
      cartItems,
      favorites,
      selectedProduct,
      selectedStore,
      cartCount,
      addToCart,
      quickAdd,
      toggleFavorite,
      setSelectedProduct,
      setSelectedStore,
      openProduct,
      updateCartQty,
      removeFromCart,
      voucher,
      summary,
      applyVoucher,
      removeVoucher,
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
