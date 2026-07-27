"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, Trash2, Plus } from "lucide-react";
import { deleteProduct, deleteProducts } from "@/lib/actions";
import { ProductUI } from "@/types";

interface ProductTableProps {
  products: ProductUI[];
}

export function ProductTable({ products }: ProductTableProps) {
  const router = useRouter();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product ?")) return;

    setIsDeleting(true);

    try {
      await deleteProduct(id)
      router.refresh
    } catch (error) {
      alert("Failed to delete product")
    } finally {
      setIsDeleting(false)
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm("Delete ${selectedProducts.length} products ?")) return;

    setIsDeleting(true);
    try{
      await deleteProducts(selectedProducts);
      setSelectedProducts([]);
      router.refresh
    } catch (error) {
      alert("Failed to delete products")
    } finally {
      setIsDeleting(false);
    }
    
  };

  const getStatusColor = (status: ProductUI["status"]) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "draft": return "bg-yellow-100 text-yellow-800";
      case "archived": return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          {selectedProducts.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
            >
              Delete Selected ({selectedProducts.length})
            </button>
          )}
        </div>
        <button
          onClick={() => router.push("/products/create")}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedProducts(products.map(p => p.id));
                    } else {
                      setSelectedProducts([]);
                    }
                  }}
                  checked={selectedProducts.length === products.length && products.length > 0}
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Product</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Category</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Price</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Stock</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedProducts([...selectedProducts, product.id]);
                      } else {
                        setSelectedProducts(selectedProducts.filter(id => id !== product.id));
                      }
                    }}
                  />
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {product.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {product.category}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {product.stock}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(product.status)}`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => router.push(`/products/${product.id}/edit`)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Edit className="h-4 w-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}