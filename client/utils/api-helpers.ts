import { toast } from "sonner"
import { ApiClientError } from "@/api/client"

// Helper function to handle API errors with user-friendly messages
export function handleApiError(error: unknown, defaultMessage = "An error occurred") {
  if (error instanceof ApiClientError) {
    const message = error.status === 0 ? "Network error. Please check your connection." : error.message

    toast.error(message)
    return message
  }

  toast.error(defaultMessage)
  return defaultMessage
}

// Helper function to show success messages
export function handleApiSuccess(message: string) {
  toast.success(message)
}

// Helper function to format API validation errors
export function formatValidationErrors(errors: Record<string, string[]>): string {
  return Object.entries(errors)
    .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
    .join("\n")
}

// Helper function to retry API calls
export async function retryApiCall<T>(apiCall: () => Promise<T>, maxRetries = 3, delay = 1000): Promise<T> {
  let lastError: unknown

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall()
    } catch (error) {
      lastError = error

      if (attempt === maxRetries) {
        throw error
      }

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay * attempt))
    }
  }

  throw lastError
}
