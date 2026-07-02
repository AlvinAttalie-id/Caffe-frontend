import { useQuery } from "@tanstack/react-query";
import { api } from "@lib/axios";
import { Product } from "../types";

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export const normalizeProduct = (p: any): Product & Record<string, any> => ({
  id: p.id,
  name: p.name,
  price: Number(p.price),
  rating: p.rating || 4.8,
  reviews: p.reviews_count || p.reviews?.length || 180,
  image: p.image_url || "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop&auto=format",
  category: p.category?.slug || "",
  description: p.description || "",
  calories: p.calories || 120,
  badge: p.is_featured ? "Featured" : undefined,
  slug: p.slug,
  sizes: p.sizes || [],
  sugar_levels: p.sugar_levels || [],
  ice_levels: p.ice_levels || [],
  toppings: p.toppings || [],
});

export function useProducts(filters: { search?: string; category_slug?: string; is_featured?: boolean } = {}) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: async () => {
      const params: Record<string, any> = {};
      if (filters.search) params.search = filters.search;
      if (filters.category_slug && filters.category_slug !== "all") {
        params.category_slug = filters.category_slug;
      }
      if (filters.is_featured !== undefined) {
        params.is_featured = filters.is_featured ? 1 : 0;
      }
      
      const res = await api.get("/products", { params });
      // The endpoint returns pagination data. The list is under data.data
      const rawProducts = res.data.data || [];
      return rawProducts.map(normalizeProduct);
    },
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get("/categories");
      return (res.data.data || []) as Category[];
    },
  });
}

export function useProductDetail(slugOrId: string | number) {
  return useQuery({
    queryKey: ["product", slugOrId],
    queryFn: async () => {
      const res = await api.get(`/products/${slugOrId}`);
      return normalizeProduct(res.data.data);
    },
    enabled: !!slugOrId,
  });
}
