# Travel Planner

Aplicação de planejamento de viagens com API REST e interface web.

## 🚀 Tecnologias

- **Backend**: Node.js, Express, TypeScript, Prisma
- **Database**: PostgreSQL
- **Frontend**: React (em desenvolvimento)
- **Documentação**: Swagger UI
- **Containerização**: Docker & Docker Compose

## 📋 Pré-requisitos

- Docker
- Docker Compose

## 🛠️ Como executar

1. Clone o repositório
2. Configure as variáveis de ambiente (crie um arquivo `.env` na raiz)
3. Execute o projeto:

```bash
docker compose up
```

## 🔗 Endpoints

- **API**: http://localhost:3333
- **Health Check**: http://localhost:3333/health
- **Documentação**: http://localhost:3333/api-docs

## 📁 Estrutura do Projeto

```
travel-planner/
├── backend/          # API REST com Node.js/Express
├── frontend/         # Interface React (em desenvolvimento)
└── docker-compose.yml
```

## 🚧 Status

- ✅ Backend API funcionando
- ✅ Banco de dados configurado
- ✅ Documentação Swagger
- 🚧 Frontend em desenvolvimento 