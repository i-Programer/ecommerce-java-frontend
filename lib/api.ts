
import { components } from "@/src/api/types";

type ProductResponseDTO = components["schemas"]["ProductResponseDTO"];
type ProductRequestDTO = components["schemas"]["ProductRequestDTO"];
type CategoryResponseDTO = components["schemas"]["CategoryResponseDTO"];

const getBaseUrl = () => {
    if (typeof window === "undefined") {
        return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    }

    return '';
}

export const productApi = {
    getAll: async (): Promise<ProductResponseDTO[]> => {
        const baseUrl = getBaseUrl();
        const url = baseUrl ? `${baseUrl}/api/seller/products` : "/api/seller/products"

        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Failed to fetch products");
        }
        return res.json();
    },

    getById: async (id: string): Promise<ProductResponseDTO> => {
        const baseUrl = getBaseUrl();
        const url = baseUrl ? `${baseUrl}/api/seller/products/${id}` : `/api/seller/products/${id}`

        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Failed to fetch product with id ${id}`);
        }
        return res.json();
    },

    create: async (product: ProductRequestDTO): Promise<ProductResponseDTO> => {
        const baseUrl = getBaseUrl();
        const url = baseUrl ? `${baseUrl}/api/seller/products` : '/api/seller/products';

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });
        if (!res.ok) {
            throw new Error("Failed to create product");
        }
        return res.json();
    },

    update: async (id: string, data: ProductRequestDTO): Promise<ProductResponseDTO> => {
        const baseUrl = getBaseUrl();
        const url = baseUrl ? `${baseUrl}/api/seller/products/${id}` : `/api/seller/products/${id}`

        const res = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            throw new Error(`Failed to update product with id ${id}`);
        }
        return res.json();
    },

    delete: async (id: string): Promise<void> => {
        const baseUrl = getBaseUrl();
        const url = baseUrl ? `${baseUrl}/api/seller/products/${id}` : `/api/seller/products/${id}`

        const rest = await fetch(url, {
            method: "DELETE",
        });

        if (!rest.ok) {
            throw new Error (`Failed to delete product with id ${id}`);
        }
    }
};

export const categoryApi = {
    getAll: async (): Promise<CategoryResponseDTO[]> => {
        const baseUrl = getBaseUrl();
        const url = baseUrl ? `${baseUrl}/api/seller/categories` : '/api/seller/categories';

        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Failed to fetch categories");
        }
        return res.json(); 
    }
};
