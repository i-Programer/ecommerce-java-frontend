"use server";

import {categoryApi, productApi} from "@/lib/api";
import { revalidatePath } from "next/cache";
import { components } from "@/src/api/types";

type ProductRequestDTO = components["schemas"]["ProductRequestDTO"];

export async function getProducts() {
    try {
        return await productApi.getAll();
    } catch (error) {
        console.log("Error fetching products:", error);
        return [];
    }
}

export async function getProduct(id: string){
    try {
        return await productApi.getById(id);
    } catch (error) {
        console.log(`Error fetching product with id ${id}:`, error);
    }
}

export async function createProduct(data: ProductRequestDTO){
    try {
        const result = await productApi.create(data);
        revalidatePath("/product");
        return { success: true, data: result };
    } catch (error) {
        return {success: false, error: "Failed to create product"};
    }
}

export async function updateProduct(id:string, data: ProductRequestDTO) {
    try {
        const result = await productApi.update(id, data);
        revalidatePath("/products");
        return { success: true, data: result}
    } catch (error) {
       return { success: false, error: "Failed to update product"} 
    }
}

export async function deleteProduct(id: string) {
    try {
        await productApi.delete(id);
        revalidatePath("/products");
        return { success: true }
    } catch (error) {
       return {success: false, error: "Failed to delete product"} 
    }
}

export async function deleteProducts(ids: string[]) {
    try {
        await Promise.all(ids.map(id => productApi.delete(id)));
        revalidatePath("/products");
        return { success: true };
    } catch (error) {
       return { success: false, error: "Failed to delete products" } ;
    }
}

export async function getCategories() {
    try {
        return await categoryApi.getAll();
    } catch (error) {
        console.log("Error fetching categories:", error);
        return [];
    }
}