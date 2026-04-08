<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'

const router = useRouter()
const store = useProductStore()

const goToNew = () => router.push('/new')

onMounted(() => {
  store.fetchProducts()
})

const deleteProduct = async (id: string) => {
  if (confirm('Tem certeza que deseja excluir este produto?')) {
    try {
      await store.deleteProduct(id)
      alert('Produto excluído com sucesso!')
    } catch (err) {
      alert('Erro ao excluir o produto.')
    }
  }
}
</script>

<template>
  <div class="container">
    <header class="main-header">
      <div class="header-content">
        <div class="logo">
          <span class="logo-icon">🐾</span>
          <span> Distribuidora Veterinária </span>
        </div>
        <p class="tagline">Gestão de Produtos</p>
      </div>
      <button @click="goToNew" class="btn btn-primary new-btn">
        <span class="plus">+</span> Novo Produto
      </button>
    </header>

    <div class="content">
      <!-- Loading -->
      <div v-if="store.loading" class="loading-state">
        <div class="spinner"></div>
        <p>Carregando produtos...</p>
      </div>

      <!-- Erro -->
      <div v-else-if="store.error" class="error-state">
        <p>{{ store.error }}</p>
        <button @click="store.fetchProducts" class="btn">Tentar novamente</button>
      </div>

      <!-- Lista -->
      <div v-else>
        <div class="list-header">
          <h2>Produtos Cadastrados</h2>
          <span class="count">{{ store.products.length }} itens</span>
        </div>

        <div class="table-wrapper">
          <table class="modern-table">
            <thead>
              <tr>
                <th>Nome do Produto</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Estoque</th>
                <th>Status</th>
                <th class="actions-column">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in store.products" :key="product.id" class="product-row">
                <td class="product-name">{{ product.nome }}</td>
                <td>{{ product.categoria }}</td>
                <td class="price">R$ {{ product.preco.toFixed(2) }}</td>
                <td class="stock">{{ product.estoque }} un</td>
                <td>
                  <span class="status-badge" :class="product.status">
                    {{ product.status === 'ativo' ? 'Ativo' : 'Inativo' }}
                  </span>
                </td>
                <td class="actions">
                  <button @click="router.push(`/edit/${product.id}`)" class="action-btn edit-btn" title="Editar">
                    ✏️
                  </button>
                  <button @click="deleteProduct(product.id)" class="action-btn delete-btn" title="Excluir">
                    🗑️
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #f8fafc;
}

.main-header {
  background: white;
  padding: 1.2rem 2rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.8rem;
  font-weight: 700;
  color: #10b981;
}

.logo-icon {
  font-size: 2rem;
}

.tagline {
  color: #64748b;
  font-size: 1rem;
  margin: 0;
}

.new-btn {
  color: #0e0d11;
  background: #73db96a8;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 24px;
  font-weight: 600;
}

.content {
  padding: 2rem;
  max-width: 1300px;
  margin: 0 auto;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.count {
  background: #ecfdf5;
  color: #10b981;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.95rem;
  font-weight: 500;
}

.table-wrapper {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.modern-table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background: #f8fafc;
  padding: 18px 20px;
  text-align: left;
  font-weight: 600;
  color: #475569;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

td {
  padding: 18px 20px;
  border-bottom: 1px solid #f1f5f9;
}

.product-name {
  font-weight: 600;
  color: #0f172a;
}

.price {
  font-weight: 600;
  color: #0f172a;
}

.stock {
  color: #334155;
}

.status-badge {
  padding: 8px 16px;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-badge.ativo {
  background: #d1fae5;
  color: #10b981;
}

.status-badge.inativo {
  background: #fee2e2;
  color: #ef4444;
}

.actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.edit-btn {
  background: #dbeafe;
  color: #1e40af;
}

.delete-btn {
  background: #fee2e2;
  color: #b91c1c;
}

.action-btn:hover {
  transform: scale(1.1);
}

.loading-state, .error-state {
  text-align: center;
  padding: 80px 20px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #10b981;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>