export interface Product {
  id: string
  nome: string
  categoria: string
  preco: number
  estoque: number
  status: 'ativo' | 'inativo'
  descricao?: string
}

export const CATEGORIAS = [
  'Rações',
  'Medicamentos',
  'Suplementos',
  'Higiene e Limpeza',
  'Acessórios',
  'Brinquedos',
  'Vacinas'
] as const