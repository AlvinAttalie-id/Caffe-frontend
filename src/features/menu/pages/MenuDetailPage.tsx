import { useEffect } from "react";
import { useParams } from "react-router";
import { useAppContext } from "@app/providers/AppProvider";
import { ComingSoon } from "@features/common/components/ComingSoon";
import { ProductScreen } from "@features/products/pages/ProductScreen";
import { useProductDetail } from "@features/products/hooks/useProducts";
import { Spinner } from "@components/ui/spinner";
import { B } from "@styles/theme";

export function MenuDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { selectedProduct, setSelectedProduct } = useAppContext();
  const { data: fetchedProduct, isLoading } = useProductDetail(id || "");

  useEffect(() => {
    if (!selectedProduct && fetchedProduct) {
      setSelectedProduct(fetchedProduct);
    }
  }, [fetchedProduct, selectedProduct, setSelectedProduct]);

  const product = selectedProduct ?? fetchedProduct ?? null;

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center" style={{ background: B.bg }}>
        <Spinner size="w-8 h-8" border="border-slate-200 border-t-slate-600" />
      </div>
    );
  }

  if (!product) {
    return <ComingSoon title="Menu Item" description="This menu item could not be found." />;
  }

  return <ProductScreen />;
}
