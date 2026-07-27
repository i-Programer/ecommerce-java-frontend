
"use client";

import { ProductForm } from "@/components/seller/forms/ProductForm";
import { createProduct } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function CreateProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      const result = await createProduct(data)
      if(result.success) {
        router.push("/products")
        router.refresh();
      } else {
        alert(result.error || "Failed to create product")
      }
    } catch (error) {
      alert("Failed to create product")
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create Product</h1>
        <p className="text-gray-600">Add a new product to your inventory</p>
      </div>
      <ProductForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}