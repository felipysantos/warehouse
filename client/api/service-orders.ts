import { API_BASE_URL } from "./config";

export interface ServiceOrderProduct {
  productId: number;
  productName: string;
  requestedQuantity: number;
}

export interface ServiceOrder {
  id: string;
  orderNumber: string;
  requester: string;
  products: ServiceOrderProduct[];
  status: "Pending" | "In Progress" | "Completed" | "Cancelled";
  createdDate: string;
}

export const serviceOrdersApi = {
  async getAll(): Promise<ServiceOrder[]> {
    const response = await fetch(`${API_BASE_URL}/service-order`);
    if (!response.ok) throw new Error("Failed to fetch service orders");
    return response.json();
  },

  async create(serviceOrder: {
    orderNumber: string;
    requester: string;
    products: ServiceOrderProduct[];
    status: ServiceOrder["status"];
  }): Promise<ServiceOrder> {
    const response = await fetch(`${API_BASE_URL}/service-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(serviceOrder),
    });
    if (!response.ok) throw new Error("Failed to create service order");
    return response.json();
  },

  async update(
    id: string,
    serviceOrder: {
      orderNumber: string;
      requester: string;
      products: ServiceOrderProduct[];
      status: ServiceOrder["status"];
    }
  ): Promise<ServiceOrder> {
    const response = await fetch(`${API_BASE_URL}/service-order/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(serviceOrder),
    });
    if (!response.ok) throw new Error("Failed to update service order");
    return response.json();
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/service-order/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete service order");
  },
};
