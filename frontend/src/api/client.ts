const BASE_URL = 'http://localhost:3000/api/v1'

export const apiClient = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${BASE_URL}${endpoint}`)

  if (!response.ok) {
    const error = await response.json().catch(() => null)
    throw new Error(error?.message ?? `Request failed with status ${response.status}`)
  }

  return response.json() as Promise<T>
}
