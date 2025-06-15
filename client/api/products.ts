import { API_BASE_URL } from "./config";

export interface Product {
  id: string;
  name: string;
  code: string;
  quantity: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

export const productsApi = {
  async getAll(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/product`);
    if (!response.ok) throw new Error("Failed to fetch products");
    return response.json();
  },

  async create(product: {
    name: string;
    code: string;
    quantity: number;
  }): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/product`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error("Failed to create product");
    return response.json();
  },

  async update(
    id: string,
    product: { name: string; code: string; quantity: number }
  ): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/product/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error("Failed to update product");
    return response.json();
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/product/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete product");
  },
};
