import { components } from "@/src/api/types";

export type ProductResponseDTO = components["schemas"]["ProductResponseDTO"];
export type ProductRequestDTO = components["schemas"]["ProductRequestDTO"];
export type CategoryDTO = components["schemas"]["CategoryDTO"];

export interface ProductUI {
  id: string;
  name: string;
  price: number;
  category: string;
  categoryId: string;
  stock: number; // You might need to add this to your API
  status: "active" | "draft" | "archived";
  description?: string;
  sku?: string;
  isActive: boolean;
}

export function mapProductToUI(product: ProductResponseDTO): ProductUI {
  return {
    id: product.id || "",
    name: product.name || "",
    price: product.price || 0,
    category: product.category?.name || "Uncategorized",
    categoryId: product.category?.id || "",
    stock: 0, // Add stock from API if available
    status: product.isActive ? "active" : "draft",
    description: product.description,
    sku: product.sku,
    isActive: product.isActive || false,
  };
}

// Helper to convert UI form to API request
export function mapUIToRequest(data: any): ProductRequestDTO {
  return {
    name: data.name,
    description: data.description,
    price: parseFloat(data.price),
    categoryId: data.categoryId,
    sku: data.sku,
    isActive: data.status === "active",
  };
}