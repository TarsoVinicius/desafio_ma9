import { defineStore } from 'pinia'
import { ref } from 'vue'
import { productApi } from '@/api/products'
import type { Product } from '@/types/product'

export const CATEGORIAS = [
  'Rações', 'Medicamentos', 'Suplementos', 'Higiene e Limpeza',
  'Acessórios', 'Brinquedos', 'Vacinas'
] as const

export const useProductStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Buscar todos os produtos
  const fetchProducts = async () => {
    loading.value = true
    error.value = null
    try {
      products.value = await productApi.getAll()
    } catch (err: any) {
      error.value = 'Erro ao conectar com o servidor. Verifique se o json-server está rodando.'
      console.error(err)
      products.value = []
    } finally {
      loading.value = false
    }
  }

  // Adicionar produto
  const addProduct = async (product: Omit<Product, 'id'>) => {
    const newProduct = await productApi.create(product)
    products.value.push(newProduct)
    return newProduct
  }

  // Atualizar produto
  const updateProduct = async (updatedProduct: Product) => {
    const updated = await productApi.update(updatedProduct.id, updatedProduct)
    const index = products.value.findIndex(p => p.id === updated.id)
    if (index !== -1) {
      products.value[index] = updated
    }
    return updated
  }

  // Deletar produto
  const deleteProduct = async (id: string) => {
    await productApi.delete(id)
    products.value = products.value.filter(p => p.id !== id)
  }

  const getProductById = (id: string): Product | undefined => {
    return products.value.find(p => p.id === id)
  }

  // Carregar produtos automaticamente
  fetchProducts()

  return {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    CATEGORIAS
  }
})