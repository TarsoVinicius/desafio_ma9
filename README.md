# 🐾 Distribuidora Veterinária

Aplicação web para gerenciamento de produtos de uma distribuidora veterinária, desenvolvida como desafio técnico.

## ✨ Funcionalidades

- Listagem de produtos com filtros avançados (categoria, faixa de preço e status)
- Cadastro, edição e exclusão de produtos
- Consumo de API REST utilizando json-server
- Interface moderna, limpa e totalmente responsiva
- Validação de formulários

## 🛠️ Tecnologias Utilizadas

- **Vue 3** + API
- **TypeScript**
- **SCSS** para estilização
- **Pinia** (gerenciamento de estado)
- **Axios** (consumo de API)
- **Vite** (ferramenta de build)
- **json-server** (API)

## 🚀 Como Rodar o Projeto Localmente

### Pré-requisitos
- Node.js

### Passos

1. **Clone o repositório**

git clone https://github.com/SEU_USUARIO/distribuidora-veterinaria.git
cd distribuidora-veterinaria

2. **Instale as dependências**
npm install

3. **Inicie o Backend (json-server)**

npx json-server --watch db/db.json --port 3001

4.**Inicie o Frontend**

npm run dev

5 . **Acesse a aplicação em: http://localhost:5173**

## 📋 Decisões Técnicas

-Escolhi Vue 3 com TypeScript por ser a stack mais moderna.
-Utilizei Pinia como gerenciador de estado, por ser leve, intuitivo e a solução oficial do ecossistema Vue.
-Separei a camada de API em src/api/ para manter o código organizado e escalável.
