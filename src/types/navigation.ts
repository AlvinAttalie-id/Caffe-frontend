export type Screen =
  | "splash" | "onboarding" | "login" | "otp"
  | "home" | "store" | "menu" | "product"
  | "cart" | "checkout" | "payment" | "tracking"
  | "loyalty" | "favorites" | "history" | "profile" | "notifications";

export type Dir = "forward" | "back" | "up" | "down" | "fade";
export type NavFn = (to: Screen, dir?: Dir) => void;
