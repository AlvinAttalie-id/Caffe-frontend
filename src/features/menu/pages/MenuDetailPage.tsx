import { useEffect } from "react";
import { useParams } from "react-router";
import { useAppContext } from "@app/providers/AppProvider";
import { ComingSoon } from "@features/common/components/ComingSoon";
import { ProductScreen } from "@features/products/pages/ProductScreen";
import { PRODUCTS } from "@data/mockData";

export function MenuDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { selectedProduct, setSelectedProduct } = useAppContext();

  useEffect(() => {
    if (!selectedProduct && id) {
      const product = PRODUCTS.find(p => p.id === Number(id));
      if (product) {
        setSelectedProduct(product);
      }
    }
  }, [id, selectedProduct, setSelectedProduct]);

  const product =
    selectedProduct ?? (id ? PRODUCTS.find(p => p.id === Number(id)) ?? null : null);

  if (!product) {
    return <ComingSoon title="Menu Item" description="This menu item could not be found." />;
  }

  return <ProductScreen />;
}
