# 🐾 Distribuidora Veterinária

Aplicação web para gerenciamento de produtos de uma distribuidora veterinária, desenvolvida como desafio técnico.

## ✨ Funcionalidades

- Listagem de produtos com filtros avançados (categoria, faixa de preço e status)
- Cadastro, edição e exclusão de produtos
- Consumo de API REST utilizando json-server
- Interface moderna, clean e totalmente responsiva
- Validação básica de formulários

## 🛠️ Tecnologias Utilizadas

- **Vue 3** + Composition API + `<script setup>`
- **TypeScript**
- **SCSS** para estilização
- **Pinia** (gerenciamento de estado)
- **Axios** (consumo de API)
- **Vite** (build tool)
- **json-server** (API mock REST)

## 🚀 Como Rodar o Projeto Localmente

### Pré-requisitos
- Node.js (versão 18 ou superior)

### Passos

1. **Clone o repositório**

```bash
git clone https://github.com/TarsoVinicius/desafio_ma9.git
cd desafio_ma9

2. **Instale as dependências**

npm install

3. **Inicie o Backend**
- No terminal execute: 

npx json-server --watch db/db.json --port 3001

4. **Inicie o Frontend**

- Abra outro terminal e execute:

npm run dev

5. **Acesse a aplicação em: http://localhost:5173**
