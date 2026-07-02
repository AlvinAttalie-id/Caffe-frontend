import { useQuery } from "@tanstack/react-query";
import { api } from "@lib/axios";

export interface Store {
  id: number;
  name: string;
  code: string;
  slug: string;
  address: string;
  latitude: string;
  longitude: string;
  status: string;
  is_active: boolean;
  distance?: number | null;
}

export function isStoreOpen(store: Store): boolean {
  return store.is_active && store.status === "active";
}

export function formatStoreDistance(store: Store): string {
  if (store.distance != null) return `${store.distance} km`;
  return "Nearby";
}

export function storePickupLabel(store: Store): string {
  return isStoreOpen(store) ? "5 min pickup" : "Temporarily closed";
}

export function useStores() {
  return useQuery({
    queryKey: ["stores"],
    queryFn: async () => {
      const res = await api.get("/stores");
      return (res.data.data || []) as Store[];
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useNearbyStores(latitude?: number, longitude?: number) {
  return useQuery({
    queryKey: ["stores", "nearby", latitude, longitude],
    queryFn: async () => {
      const res = await api.get("/stores/nearby", {
        params: { latitude, longitude },
      });
      return (res.data.data || []) as Store[];
    },
    enabled: latitude != null && longitude != null,
    staleTime: 1000 * 60 * 5,
  });
}
