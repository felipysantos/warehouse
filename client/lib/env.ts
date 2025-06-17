// Environment variables validation
export const env = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  NODE_ENV: process.env.NODE_ENV || "development",
} as const

// Validate required environment variables
export function validateEnv() {
  const required = ["NEXT_PUBLIC_API_URL"] as const
  const missing = required.filter((key) => !process.env[key])

  if (missing.length > 0) {
    console.warn(`Missing environment variables: ${missing.join(", ")}`)
    console.warn("Using default API URL: http://localhost:3000")
  }
}
