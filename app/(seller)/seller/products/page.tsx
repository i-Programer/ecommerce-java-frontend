import { ProductTable } from "@/components/seller/dashboard/ProductTable";
import { getProducts } from "@/lib/actions";
import { mapProductToUI } from "@/types";

export default async function ProductsPage() {
  const apiProducts = await getProducts();
  const products = apiProducts.map(mapProductToUI);
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <p className="text-gray-600">Manage your products here.</p>
      </div>
      <ProductTable products={products} />
    </div>
  );
}