// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Product Types
export interface Product {
  id: string
  name: string
  code: string
  quantity: number
  status: "In Stock" | "Low Stock" | "Out of Stock"
  createdAt?: string
  updatedAt?: string
}

export interface CreateProductRequest {
  name: string
  code: string
  quantity: number
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: string
}

// Service Order Types
export interface ServiceOrderProduct {
  productId: string
  productName: string
  productCode: string
  requestedQuantity: number
}

export interface ServiceOrder {
  id: string
  orderNumber: string
  requester: string
  products: ServiceOrderProduct[]
  status: "Pending" | "In Progress" | "Completed" | "Cancelled"
  createdDate: string
  updatedAt?: string
}

export interface CreateServiceOrderRequest {
  orderNumber: string
  requester: string
  products: ServiceOrderProduct[]
  status?: ServiceOrder["status"]
}

export interface UpdateServiceOrderRequest extends Partial<CreateServiceOrderRequest> {
  id: string
}

// Error Types
export interface ApiError {
  message: string
  status: number
  code?: string
}
