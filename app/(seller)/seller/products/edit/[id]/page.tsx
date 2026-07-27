"use client";

import { ProductForm } from "@/components/seller/forms/ProductForm";
import { getProduct, updateProduct } from "@/lib/actions";
import { mapProductToUI, ProductUI } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<ProductUI | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProduct(params.id as string)
        if (data) {
          setProduct(mapProductToUI(data));
        }
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setIsLoading(false)
      }
    }
    loadProduct();
  }, [params.id]);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const result = await updateProduct(params.id as string, data);
      if (result.success) {
        router.push("/products");
        router.refresh();
      } else {
        alert(result.error || "Failed to update product");
      }
    } catch (error) {
      alert("Failed to update product");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600">Product not found</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
        <p className="text-gray-600">Update product information</p>
      </div>
      <ProductForm product={product} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}