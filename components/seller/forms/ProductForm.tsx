"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProductFormData, ProductUI, mapUIToRequest, ProductAttributes } from "@/types";
import { CategoryDTO } from "@/types";
import { getCategories } from "@/lib/actions";

interface ProductFormProps {
  product?: ProductUI;
  onSubmit: (data: any) => void;
  isSubmitting?: boolean;
}

interface AttributePair {
  key: string;
  value: string;
}

export function ProductForm({ product, onSubmit, isSubmitting = false }: ProductFormProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [attributePairs, setAttributePairs] = useState<AttributePair[]>(() => {
    if (!product?.attributes) return [];
    return Object.entries(product.attributes).map(([key, value]) => ({
      key,
      value: String(value ?? ""),
    }));
  });

  const [formData, setFormData] = useState<ProductFormData>({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    stockQuantity: product?.stockQuantity ?? 0,
    categoryId: product?.categoryId || "",
    sku: product?.sku || "",
    status: product ? (product.isActive ? "active" : "draft") : "draft",
    attributes: product?.attributes,
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };
    loadCategories();
  }, []);

  const handleAddAttribute = () => {
    setAttributePairs((prev) => [...prev, { key: "", value: "" }]);
  };

  const handleRemoveAttribute = (index: number) => {
    setAttributePairs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAttributeChange = (
    index: number,
    field: "key" | "value",
    val: string
  ) => {
    setAttributePairs((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: val };
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const attributesMap: ProductAttributes = {};
    attributePairs.forEach(({ key, value }) => {
      const trimmedKey = key.trim();
      if (trimmedKey) {
        attributesMap[trimmedKey] = value;
      }
    });

    // Merge the latest attributes map into formData
    const finalFormData: ProductFormData = {
      ...formData,
      attributes: Object.keys(attributesMap).length > 0 ? attributesMap : undefined,
    };
    
    const requestData = mapUIToRequest(finalFormData);
    onSubmit(requestData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg border border-gray-200">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Name *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none text-gray-900 focus:ring-2 focus:ring-gray-200"
          placeholder="Enter product name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={formData.description || ""}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none text-gray-900 focus:ring-2 focus:ring-gray-200"
          placeholder="Enter product description"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price ($) *
          </label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none text-gray-900 focus:ring-2 focus:ring-gray-200"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stock Quantity *
          </label>
          <input
            type="number"
            required
            min="0"
            step="1"
            value={formData.stockQuantity}
            onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none text-gray-900 focus:ring-2 focus:ring-gray-200"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SKU *
          </label>
          <input
            type="text"
            required
            value={formData.sku}
            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none text-gray-900 focus:ring-2 focus:ring-gray-200"
            placeholder="Enter SKU"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category *
        </label>
        <select
          required
          value={formData.categoryId}
          onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none text-gray-900 focus:ring-2 focus:ring-gray-200"
          disabled={loadingCategories}
        >
          <option value="">
            {loadingCategories ? "Loading categories..." : "Select category"}
          </option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Product Attributes</h3>
            <p className="text-xs text-gray-500">Add custom key-value specifications (e.g., Color: Blue, Size: XL)</p>
          </div>
          <button
            type="button"
            onClick={handleAddAttribute}
            className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300"
          >
            + Add Attribute
          </button>
        </div>

        {attributePairs.length > 0 ? (
          <div className="space-y-3">
            {attributePairs.map((pair, index) => (
              <div key={index} className="flex gap-3 items-center">
                <input
                  type="text"
                  placeholder="Attribute name (e.g., Material)"
                  value={pair.key}
                  onChange={(e) => handleAttributeChange(index, "key", e.target.value)}
                  className="w-1/2 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none text-gray-900 focus:ring-2 focus:ring-gray-200"
                />
                <input
                  type="text"
                  placeholder="Value (e.g., Cotton)"
                  value={pair.value}
                  onChange={(e) => handleAttributeChange(index, "value", e.target.value)}
                  className="w-1/2 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none text-gray-900 focus:ring-2 focus:ring-gray-200"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveAttribute(index)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="Remove Attribute"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400 italic">No custom attributes added yet.</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "draft" })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none text-gray-900 focus:ring-2 focus:ring-gray-200"
        >
          <option value="draft">Draft</option>
          <option value="active">Active</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">Active products will be visible to customers</p>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting || loadingCategories}
          className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
        >
          {isSubmitting 
            ? "Saving..." 
            : product 
              ? "Update Product" 
              : "Create Product"
          }
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}