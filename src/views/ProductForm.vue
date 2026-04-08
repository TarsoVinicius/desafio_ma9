<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProductStore } from '@/stores/productStore'

const router = useRouter()
const route = useRoute()
const store = useProductStore()

const isEditing = ref(false)
const loading = ref(false)

const form = ref({
  nome: '',
  categoria: '',
  preco: 0,
  estoque: 0,
  status: 'ativo' as 'ativo' | 'inativo',
  descricao: ''
})

const productId = route.params.id as string | undefined

onMounted(() => {
  if (productId) {
    isEditing.value = true
    const product = store.getProductById(productId)
    if (product) {
      form.value = {
        nome: product.nome,
        categoria: product.categoria,
        preco: product.preco,
        estoque: product.estoque,
        status: product.status,
        descricao: product.descricao || ''
      }
    } else {
      alert('Produto não encontrado!')
      router.push('/')
    }
  }
})

const saveProduct = async () => {
  if (!form.value.nome.trim() || !form.value.categoria || form.value.preco <= 0) {
    alert('Por favor, preencha os campos obrigatórios!')
    return
  }

  loading.value = true

  const productData = {
    nome: form.value.nome.trim(),
    categoria: form.value.categoria,
    preco: Number(form.value.preco),
    estoque: Number(form.value.estoque) || 0,
    status: form.value.status,
    descricao: form.value.descricao.trim()
  }

  try {
    if (isEditing.value && productId) {
      await store.updateProduct({ ...productData, id: productId } as any)
      alert('✅ Produto atualizado com sucesso!')
    } else {
      await store.addProduct(productData)
      alert('✅ Produto cadastrado com sucesso!')
    }
    router.push('/')
  } catch (err) {
    alert('❌ Erro ao salvar o produto.')
  } finally {
    loading.value = false
  }
}

const cancel = () => router.push('/')
</script>

<template>
  <div class="form-page">
    <div class="form-card">
      <div class="form-header">
        <h1>{{ isEditing ? '✏️ Editar Produto' : '🐾 Novo Produto' }}</h1>
        <p class="form-subtitle">
          {{ isEditing ? 'Atualize as informações abaixo' : 'Preencha os dados do novo produto' }}
        </p>
      </div>

      <form @submit.prevent="saveProduct" class="form-content">
        <div class="form-grid">
          <div class="form-group">
            <label>Nome do Produto <span class="required">*</span></label>
            <input v-model="form.nome" type="text" required placeholder="Ex: Ração Royal Canin Adulto" />
          </div>

          <div class="form-group">
            <label>Categoria <span class="required">*</span></label>
            <select v-model="form.categoria" required>
              <option value="" disabled>Selecione uma categoria</option>
              <option v-for="cat in store.CATEGORIAS" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>

          <div class="form-group">
            <label>Preço (R$) <span class="required">*</span></label>
            <input v-model="form.preco" type="number" step="0.01" min="0.01" required />
          </div>

          <div class="form-group">
            <label>Estoque (unidades)</label>
            <input v-model="form.estoque" type="number" min="0" />
          </div>

          <div class="form-group">
            <label>Status</label>
            <select v-model="form.status">
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>
        </div>

        <div class="form-group full">
          <label>Descrição</label>
          <textarea v-model="form.descricao" rows="5" placeholder="Informações adicionais sobre o produto..."></textarea>
        </div>

        <div class="form-actions">
          <button type="button" @click="cancel" class="btn btn-outline">Cancelar</button>
          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? 'Salvando...' : isEditing ? 'Atualizar Produto' : 'Cadastrar Produto' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-page {
  padding: 2rem 1.5rem;
  max-width: 780px;
  margin: 0 auto;
}

.form-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.form-header {
  padding: 2.5rem 2.5rem 1.5rem;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

h1 {
  margin: 0 0 8px 0;
  font-size: 2.1rem;
}

.form-subtitle {
  margin: 0;
  opacity: 0.9;
  font-size: 1.05rem;
}

.form-content {
  padding: 2.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.8rem;
  margin-bottom: 1.8rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.full {
  grid-column: 1 / -1;
}

label {
  font-weight: 600;
  color: #374151;
  font-size: 0.95rem;
}

.required {
  color: #ef4444;
}

input, select, textarea {
  padding: 14px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.2s;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
}

textarea {
  resize: vertical;
  min-height: 130px;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f3f4f6;
}

.btn {
  padding: 14px 32px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.05rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #10b981;
  color: white;
  border: none;
}

.btn-primary:hover:not(:disabled) {
  background: #059669;
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  border: 2px solid #d1d5db;
  color: #4b5563;
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>