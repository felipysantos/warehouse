# 🏗️ Warehouse Management System

Sistema de gerenciamento de almoxarifado de uma fábrica de ferramentaria.

## 📂 Estrutura do Projeto

```
warehouse/
├── api/       → Backend (NestJS + Prisma + PostgreSQL)
├── client/    → Frontend (Angular)
```

## 🚀 Funcionalidades

- 📦 Gestão de Produtos (nome, código, quantidade)
- 📝 Criação de Ordens de Serviço com controle de estoque
- ✅ Validação de estoque na emissão da ordem
- 🔒 API REST segura e robusta
- 🔧 Frontend em Angular

## 🏗️ Tecnologias Utilizadas

### Backend (`/api`)

- NestJS
- Prisma ORM
- PostgreSQL
- TypeScript
- pnpm

### Frontend (`/client`)

- NextJs
- TypeScript
- Tailwind

## 🛠️ Como rodar o projeto

### 🔗 Pré-requisitos

- Node.js
- pnpm
- PostgreSQL

### 🚩 Backend

```bash
# Acesse a pasta do backend
cd api

# Instale as dependências
pnpm install

# Configure o banco
cp .env.example .env
# Edite as variáveis do banco no .env

# Crie o banco e rode as migrations
pnpm exec prisma migrate dev

# Rode os seeds (opcional)
pnpm exec prisma db seed

# Inicie o backend
pnpm run start:dev
```

### 🎨 Frontend (Angular)

```bash
# Acesse a pasta do frontend
cd client

# Instale as dependências
pnpm install

# Rode o servidor de desenvolvimento
pnpm dev
```

## 🗺️ Rotas da API

| Método | Endpoint             | Descrição                  |
| ------ | -------------------- | -------------------------- |
| POST   | `/product`           | Criar produto              |
| GET    | `/product`           | Listar produtos            |
| PATCH  | `/product/:id`       | Atualizar produto          |
| DELETE | `/product/:id`       | Deletar produto            |
| POST   | `/service-order`     | Criar ordem de serviço     |
| GET    | `/service-order`     | Listar ordens de serviço   |
| PATCH  | `/service-order/:id` | Atualizar ordem de serviço |
| DELETE | `/service-order/:id` | Deletar ordem de serviço   |

## 🔐 Licença

Este projeto está sob a licença **MIT**.  
Sinta-se livre para usá-lo, modificá-lo e distribuí-lo.

## 🤝 Contato

Feito com honra e bravura por **Mestre Lypozo** ⚔️  
Entre em contato pelos reinos digitais!
