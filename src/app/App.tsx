import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Screen, Dir, NavFn } from "@types/navigation";
import { Product } from "@features/products/types";
import { CartItem } from "@features/orders/types";
import { EASE, DUR, VARIANTS } from "@lib/utils/animation";
import { B } from "@styles/theme";

// Import Screens
import { SplashScreen } from "@features/auth/pages/SplashScreen";
import { OnboardingScreen } from "@features/auth/pages/OnboardingScreen";
import { LoginScreen } from "@features/auth/pages/LoginScreen";
import { OTPScreen } from "@features/auth/pages/OTPScreen";
import { HomeScreen } from "@features/dashboard/pages/HomeScreen";
import { StoreScreen } from "@features/dashboard/pages/StoreScreen";
import { MenuScreen } from "@features/menu/pages/MenuScreen";
import { ProductScreen } from "@features/products/pages/ProductScreen";
import { CartScreen } from "@features/orders/pages/CartScreen";
import { CheckoutScreen } from "@features/orders/pages/CheckoutScreen";
import { PaymentScreen } from "@features/orders/pages/PaymentScreen";
import { TrackingScreen } from "@features/orders/pages/TrackingScreen";
import { LoyaltyScreen } from "@features/customers/pages/LoyaltyScreen";
import { FavoritesScreen } from "@features/customers/pages/FavoritesScreen";
import { HistoryScreen } from "@features/orders/pages/HistoryScreen";
import { ProfileScreen } from "@features/customers/pages/ProfileScreen";
import { NotificationsScreen } from "@features/dashboard/pages/NotificationsScreen";

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [direction, setDirection] = useState<Dir>("fade");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([1, 3, 6]);
  const [showProgress, setShowProgress] = useState(false);

  const nav: NavFn = (to, dir = "forward") => {
    setDirection(dir);
    setShowProgress(true);
    setScreen(to);
    setTimeout(() => setShowProgress(false), 550);
  };

  const toggleFavorite = (id: number) =>
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const idx = prev.findIndex(
        i => i.product.id === item.product.id && i.size === item.size
      );
      if (idx >= 0) {
        const n = [...prev];
        n[idx] = { ...n[idx], quantity: n[idx].quantity + item.quantity };
        return n;
      }
      return [...prev, item];
    });
  };

  const quickAdd = (p: Product) =>
    addToCart({
      product: p,
      quantity: 1,
      size: "M",
      sugar: "Normal",
      ice: "Normal",
      toppings: [],
    });

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  const commonProps = {
    nav,
    cartCount,
    favorites,
    onFavorite: toggleFavorite,
    onAdd: quickAdd,
    onProduct: (p: Product) => {
      setSelectedProduct(p);
      nav("product");
    },
  };

  const renderScreen = () => {
    switch (screen) {
      case "splash":
        return <SplashScreen onDone={() => nav("onboarding", "fade")} />;
      case "onboarding":
        return <OnboardingScreen onDone={() => nav("login")} />;
      case "login":
        return <LoginScreen nav={nav} />;
      case "otp":
        return <OTPScreen nav={nav} />;
      case "home":
        return <HomeScreen {...commonProps} />;
      case "store":
        return <StoreScreen nav={nav} />;
      case "menu":
        return <MenuScreen {...commonProps} />;
      case "product":
        return selectedProduct ? (
          <ProductScreen
            product={selectedProduct}
            isFavorite={favorites.includes(selectedProduct.id)}
            nav={nav}
            onFavorite={() => toggleFavorite(selectedProduct.id)}
            onAddToCart={item => {
              addToCart(item);
              nav("cart", "up");
            }}
          />
        ) : null;
      case "cart":
        return (
          <CartScreen
            nav={nav}
            cartItems={cartItems}
            cartCount={cartCount}
            onUpdateQty={(idx, qty) =>
              setCartItems(prev => {
                const n = [...prev];
                n[idx] = { ...n[idx], quantity: qty };
                return n;
              })
            }
            onRemove={idx => setCartItems(prev => prev.filter((_, i) => i !== idx))}
          />
        );
      case "checkout":
        return <CheckoutScreen nav={nav} cartItems={cartItems} />;
      case "payment":
        return <PaymentScreen nav={nav} />;
      case "tracking":
        return <TrackingScreen nav={nav} />;
      case "loyalty":
        return <LoyaltyScreen nav={nav} cartCount={cartCount} />;
      case "favorites":
        return (
          <FavoritesScreen
            nav={nav}
            favorites={favorites}
            onFavorite={toggleFavorite}
            onAdd={quickAdd}
            onProduct={p => {
              setSelectedProduct(p);
              nav("product");
            }}
          />
        );
      case "history":
        return <HistoryScreen nav={nav} />;
      case "profile":
        return <ProfileScreen nav={nav} cartCount={cartCount} />;
      case "notifications":
        return <NotificationsScreen nav={nav} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "linear-gradient(135deg, #CBD5E1 0%, #94A3B8 100%)" }}
    >
      <div className="relative flex-shrink-0" style={{ width: 390, height: 844 }}>
        {/* Phone shell */}
        <div
          className="absolute inset-0 rounded-[44px] shadow-[0_40px_120px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.12)]"
          style={{ background: "#0F172A" }}
        />
        {/* Buttons */}
        <div className="absolute -left-[3px] top-[120px] w-1 h-8 rounded-l-full bg-slate-700" />
        <div className="absolute -left-[3px] top-[160px] w-1 h-12 rounded-l-full bg-slate-700" />
        <div className="absolute -left-[3px] top-[188px] w-1 h-12 rounded-l-full bg-slate-700" />
        <div className="absolute -right-[3px] top-[148px] w-1 h-16 rounded-r-full bg-slate-700" />

        {/* Screen area */}
        <div className="absolute overflow-hidden" style={{ inset: 4, borderRadius: 40, background: B.bg }}>
          {/* Dynamic island */}
          <div
            className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-8 rounded-full z-50"
            style={{ background: "#0F172A" }}
          />

          {/* Top progress bar */}
          <AnimatePresence>
            {showProgress && (
              <motion.div
                key="bar"
                className="absolute top-0 inset-x-0 z-50"
                style={{ height: 2.5, background: B.accent, transformOrigin: "left center" }}
                initial={{ scaleX: 0, opacity: 1 }}
                animate={{ scaleX: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.22 } }}
                transition={{ duration: 0.45, ease: EASE }}
              />
            )}
          </AnimatePresence>

          {/* Animated screen transitions */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={screen}
              className="absolute inset-0 overflow-hidden"
              variants={VARIANTS[direction]}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: DUR, ease: EASE }}
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
