# Warehouse API

API para gestão de almoxarifado de uma fábrica de ferramentaria, desenvolvida com NestJS, Prisma e PostgreSQL.

## 🏗️ Funcionalidades

- CRUD de usuários
- CRUD de produtos
- CRUD de ordens de serviço
- Validação de estoque no momento da criação da ordem de serviço
- Atualização automática da quantidade disponível no estoque
- Relacionamento entre produtos e ordens de serviço

## 🚀 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [pnpm](https://pnpm.io/)

## 🗺️ Estrutura do Projeto

```
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── user/
│   ├── product/
│   ├── serviceOrder/
│   ├── prisma/
│   └── app.module.ts
├── .env
├── package.json
├── README.md
```

## ⚙️ Como Rodar o Projeto

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/warehouse-api.git
```

2. Instale as dependências:

```bash
pnpm install
```

3. Configure o banco no arquivo `.env`:

```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/warehouse"
```

4. Execute as migrations e gere o client do Prisma:

```bash
pnpm exec prisma migrate dev --name init
pnpm exec prisma generate
```

5. Rode o seed para popular produtos:

```bash
pnpm exec tsx prisma/seed.ts
```

6. Inicie o projeto:

```bash
pnpm run start:dev
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
