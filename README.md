
# Warehouse Management System

Sistema de gerenciamento de almoxarifado para uma fábrica de ferramentaria.

## Estrutura do Projeto

```
warehouse/
├── api/       → Backend (NestJS + Prisma + PostgreSQL)
├── client/    → Frontend (NextJS)
├── k8s/       → Manifests do Kubernetes
```

## Funcionalidades

- Gestão de produtos (nome, código, quantidade)
- Criação de ordens de serviço com controle de estoque
- Validação de estoque na emissão da ordem
- API REST segura e robusta
- Frontend desenvolvido em NextJS

## Tecnologias Utilizadas

### Backend (`/api`)

- NestJS
- Prisma ORM
- PostgreSQL
- TypeScript
- pnpm

### Frontend (`/client`)

- NextJS
- TypeScript
- TailwindCSS
- pnpm

### Infraestrutura

- Docker
- Docker Compose
- Kubernetes (K8s)

## Como rodar o projeto

### Rodando com Docker Compose

```bash
docker-compose up --build
```

O backend ficará disponível em `http://localhost:3000`  
O frontend ficará disponível em `http://localhost:4000`

O PostgreSQL roda internamente no container e é automaticamente provisionado.

### Rodando localmente (sem Docker)

#### Backend

```bash
cd api
pnpm install

cp .env.example .env
# Edite as variáveis de ambiente, especialmente o DATABASE_URL

pnpm exec prisma migrate dev
pnpm run seed # opcional

pnpm run start:dev
```

#### Frontend

```bash
cd client
pnpm install

pnpm run dev
```

## Deploy no Kubernetes

### Pré-requisitos

- Minikube, k3d, Kind ou cluster Kubernetes configurado
- kubectl instalado

### Passos

1. Crie os deployments e services

```bash
kubectl apply -f k8s/
```

2. Verifique os pods e serviços

```bash
kubectl get pods
kubectl get svc
```

3. Acesse o frontend utilizando o NodePort informado ou configure um Ingress para uma abordagem mais profissional.

## Rotas da API

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

## Licença

Este projeto está sob a licença MIT.  
Sinta-se livre para utilizá-lo, modificá-lo e distribuí-lo conforme necessário.

## Contato

Desenvolvido por **Felipy Santos**.  
Conecte-se comigo no [LinkedIn](https://www.linkedin.com/in/felipy-santos/) ou em outras redes para trocarmos ideias sobre desenvolvimento, infraestrutura e DevOps.
