import { useQuery } from "@tanstack/react-query";
import { api } from "@lib/axios";

export interface HomeBanner {
  id: number;
  title: string;
  slug: string;
  image_url: string;
  link_url?: string | null;
  is_active: boolean;
  order: number;
}

export interface HomeData {
  banners: HomeBanner[];
  categories: Array<{ id: number; name: string; slug: string }>;
  featured_products: unknown[];
  recommendations: unknown[];
}

export function useHome() {
  return useQuery({
    queryKey: ["home"],
    queryFn: async () => {
      const res = await api.get("/home");
      return res.data.data as HomeData;
    },
    staleTime: 1000 * 60 * 5,
  });
}
