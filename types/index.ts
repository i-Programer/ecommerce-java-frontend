import { components } from "@/src/api/types";

export type ProductResponseDTO = components["schemas"]["ProductResponseDTO"];
export type ProductRequestDTO = components["schemas"]["ProductRequestDTO"];
export type CategoryDTO = components["schemas"]["CategoryDTO"];
export type ProductImageDTO = components["schemas"]["ProductImageDTO"];

export type ProductAttributes = Record<string, unknown>

export interface ProductUI {
  id: string;
  name: string;
  price: number;
  category: string;
  categoryId: string;
  stockQuantity: number;
  status: "active" | "draft";
  description?: string;
  sku: string;
  isActive: boolean;
  images?: ProductImageDTO[];
  attributes?: ProductAttributes;
  createdAt?: string;
  updatedAt?: string;
}

export function mapProductToUI(product: ProductResponseDTO): ProductUI {
  let parsedAttributes: ProductAttributes | undefined = undefined;

  if (typeof product.attributes === "string"){
    try {
      parsedAttributes = JSON.parse(product.attributes)
    } catch{
      parsedAttributes = undefined
    }
  } else if (typeof product.attributes === "object" && product.attributes !== null){
    parsedAttributes = product.attributes as ProductAttributes
  }

  const active = product.isActive ?? false;

  return {
    id: product.id ?? "",
    name: product.name ?? "",
    price: product.price ?? 0,
    category: product.category?.name ?? "Uncategorized",
    categoryId: product.category?.id ?? "",
    stockQuantity: product.stockQuantity ?? 0,
    status: product.isActive ? "active" : "draft",
    description: product.description,
    sku: product.sku ?? "",
    isActive: active,
    images: product.images,
    attributes: parsedAttributes,
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
  status?: "active" | "draft";
  isActive?: boolean;
  images?: ProductImageDTO[];
  attributes?: ProductAttributes;
}

export function mapUIToRequest(data: ProductFormData): ProductRequestDTO {
  const stock = typeof data.stockQuantity === "string" 
    ? parseInt(data.stockQuantity, 10) || 0 
    : data.stockQuantity;

  const price = typeof data.price === "string" 
    ? parseFloat(data.price) || 0 
    : data.price;

  const isActive = data.isActive ?? (data.status === "active")

  return {
    name: data.name,
    sku: data.sku,
    price: price,
    stockQuantity: stock,
    categoryId: data.categoryId,
    description: data.description,
    isActive: isActive,
    images: data.images,
    attributes: data.attributes as ProductRequestDTO["attributes"],
  };
}