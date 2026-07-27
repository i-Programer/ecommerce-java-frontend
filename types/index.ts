import { components } from "@/src/api/types";

export type ProductResponseDTO = components["schemas"]["ProductResponseDTO"];
export type ProductRequestDTO = components["schemas"]["ProductRequestDTO"];
export type CategoryDTO = components["schemas"]["CategoryDTO"];
export type ProductImageDTO = components["schemas"]["ProductImageDTO"];

export interface ProductUI {
  id: string;
  name: string;
  price: number;
  category: string;
  categoryId: string;
  stock: number;
  status: "active" | "draft" | "archived";
  description?: string;
  sku: string;
  isActive: boolean;
  images?: ProductImageDTO[];
  createdAt?: string;
  updatedAt?: string;
}

export function mapProductToUI(product: ProductResponseDTO): ProductUI {
  return {
    id: product.id ?? "",
    name: product.name ?? "",
    price: product.price ?? 0,
    category: product.category?.name ?? "Uncategorized",
    categoryId: product.category?.id ?? "",
    stock: product.stockQuantity ?? 0,
    status: product.isActive ? "active" : "draft",
    description: product.description,
    sku: product.sku ?? "",
    isActive: product.isActive ?? false,
    images: product.images,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}

export interface ProductFormData {
  name: string;
  sku: string;
  price: number | string;
  stockQuantity: number | string;
  categoryId: string;
  description?: string;
  status?: "active" | "draft" | "archived";
  isActive?: boolean;
  images?: ProductImageDTO[];
  attributes?: Record<string, Record<string, never>>;
}

export function mapUIToRequest(data: ProductFormData): ProductRequestDTO {
  const stock = typeof data.stockQuantity === "string" 
    ? parseInt(data.stockQuantity, 10) || 0 
    : data.stockQuantity;

  const price = typeof data.price === "string" 
    ? parseFloat(data.price) || 0 
    : data.price;

  return {
    name: data.name,
    sku: data.sku,
    price: price,
    stockQuantity: stock,
    categoryId: data.categoryId,
    description: data.description,
    isActive: data.isActive ?? (data.status === "active"),
    images: data.images,
    attributes: data.attributes,
  };
}