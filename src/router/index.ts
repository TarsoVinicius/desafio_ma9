import { createRouter, createWebHistory } from 'vue-router'
import ProductsList from '@/views/ProductsList.vue'
import ProductForm from '@/views/ProductForm.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'products-list',
      component: ProductsList
    },
    {
      path: '/new',
      name: 'product-new',
      component: ProductForm
    },
    {
      path: '/edit/:id',
      name: 'product-edit',
      component: ProductForm,
      props: true
    }
  ]
})

export default router