import apiClient from './client'
import type { Product } from '@/types/product'

export const productApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await apiClient.get('/products')
    return response.data
  },

  getById: async (id: string): Promise<Product> => {
    const response = await apiClient.get(`/products/${id}`)
    return response.data
  },

  create: async (product: Omit<Product, 'id'>): Promise<Product> => {
    const response = await apiClient.post('/products', product)
    return response.data
  },

  update: async (id: string, product: Partial<Product>): Promise<Product> => {
    const response = await apiClient.put(`/products/${id}`, product)
    return response.data
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/products/${id}`)
  }
}