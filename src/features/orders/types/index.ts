import { Product } from "@features/products/types";

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  sugar: string;
  ice: string;
  toppings: string[];
}
