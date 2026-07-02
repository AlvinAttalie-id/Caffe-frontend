import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@lib/axios";
import { queryClient } from "@lib/react-query";

export interface Order {
  id: number;
  order_number: string;
  status: string;
  order_type: string;
  total: number;
  created_at: string;
  notes?: string;
  subtotal: number;
  discount_amount: number;
  tax: number;
  delivery_fee: number;
  service_fee: number;
  items?: Array<{
    id: number;
    product_name?: string;
    product?: { id: number; name: string };
    quantity: number;
    price: number;
    size?: string;
    sugar_level?: string;
    ice_level?: string;
    toppings: string[];
  }>;
  store?: { id: number; name: string };
  address?: {
    id: number;
    receiver_name?: string;
    address_line?: string;
  };
}

export function useOrdersList() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await api.get("/orders");
      // Responding array under data.data
      return (res.data.data || []) as Order[];
    },
  });
}

export function useOrderDetail(orderNumber: string) {
  return useQuery({
    queryKey: ["order", orderNumber],
    queryFn: async () => {
      const res = await api.get(`/orders/${orderNumber}`);
      return res.data.data as Order;
    },
    enabled: !!orderNumber,
  });
}

export function useTracking(orderNumber: string) {
  return useQuery({
    queryKey: ["tracking", orderNumber],
    queryFn: async () => {
      const res = await api.get(`/orders/${orderNumber}/track`);
      return res.data.data as {
        order_number: string;
        status: string;
        order_type: string;
        store: string;
        created_at: string;
        updated_at: string;
      };
    },
    enabled: !!orderNumber,
    refetchInterval: 10000, // poll status every 10 seconds
  });
}

export function useCheckoutMutation() {
  return useMutation({
    mutationFn: async (payload: {
      store_id: number;
      order_type: string;
      address_id?: number | null;
      payment_method: string;
      points_redeemed?: number;
      notes?: string;
    }) => {
      const res = await api.post("/checkout", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useReorderMutation() {
  return useMutation({
    mutationFn: async (orderNumber: string) => {
      const res = await api.post(`/orders/${orderNumber}/reorder`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
