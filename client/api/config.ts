// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
export const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
}

// API endpoints
export const ENDPOINTS = {
  products: "/product",
  serviceOrders: "/service-orders",
} as const
