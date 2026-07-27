import { getProducts } from "@/lib/actions";
import { mapProductToUI } from "@/types";
import { Package, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  const apiProducts = await getProducts();
  const products = apiProducts.map(mapProductToUI);
  
  const stats = {
    totalProducts: products.length,
    totalValue: products.reduce((sum, p) => sum + p.price, 0),
    activeProducts: products.filter(p => p.status === "active").length,
    outOfStock: products.filter(p => p.stock === 0).length,
  };

  const statCards = [
    { title: "Total Products", value: stats.totalProducts, icon: Package },
    { title: "Total Value", value: `$${stats.totalValue.toFixed(2)}`, icon: DollarSign },
    { title: "Active Products", value: stats.activeProducts, icon: ShoppingCart },
    { title: "Out of Stock", value: stats.outOfStock, icon: TrendingUp },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here your overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <stat.icon className="h-8 w-8 text-gray-400" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Products</h2>
        <div className="space-y-3">
          {products.slice(0, 5).map((product) => (
            <div key={product.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
              <div>
                <span className="font-medium">{product.name}</span>
                {product.sku && (
                  <span className="text-sm text-gray-500 ml-2">SKU: {product.sku}</span>
                )}
              </div>
              <span className="text-gray-600">${product.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}