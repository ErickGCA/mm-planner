# Travel Planner - Backend

API REST para gerenciamento de rotas e destinos de viagem.

## Tecnologias
- Node.js + Express
- Prisma ORM
- PostgreSQL (ou SQLite para testes)
- JWT para autenticação
- Google Maps API 

## Setup

1. Instale as dependências:

    npm install

2. Configure o arquivo `.env`:

    DATABASE_URL=postgresql://user:password@localhost:5432/travelplanner
    JWT_SECRET=sua_chave_jwt
    GOOGLE_MAPS_API_KEY=sua_api_key_google

3. Rode as migrations:

    npx prisma migrate dev

4. Inicie o servidor:

    npm run dev

## Principais comandos

- `npm run dev` - Inicia o servidor em modo desenvolvimento
- `npx prisma studio` - Interface visual para o banco de dados

## Estrutura de pastas

    backend/
      src/
        controllers/
        services/
        middlewares/
        utils/
        config/
        models/

## Endpoints principais

- `/auth/register` - Cadastro de usuário
- `/auth/login` - Login
- `/destinations` - CRUD de destinos
- `/routes` - CRUD de rotas
- `/routes/:id/distance` - Cálculo de distância/tempo da rota

Consulte o código para detalhes de cada endpoint e parâmetros.
