# Travel Planner

Sistema de planejamento de rotas de viagem.

Este projeto permite que usuários cadastrem destinos, criem rotas personalizadas, reorganizem destinos, visualizem distâncias e tempos de viagem entre destinos usando a API do Google Maps, e gerenciem suas viagens de forma prática.

## Estrutura do Projeto

- `backend/` - API Node.js (Express + Prisma)
- `frontend/` - Aplicação web (Next.js + React)

## Requisitos

- Node.js 18+
- Docker (opcional, para rodar com docker-compose)
- API Key do Google Maps 
- Banco de dados PostgreSQL (ou SQLite para testes)

## Como rodar o projeto

### 1. Clone o repositório

    git clone https://github.com/ErickGCA/travel-planner.git
    cd travel-planner

### 2. Configure as variáveis de ambiente

Crie os arquivos `.env` em `backend/` e `frontend/my-app/` conforme os exemplos fornecidos.

### 3. Suba o banco de dados (opcional)

    docker-compose up -d

### 4. Rode o backend

    cd backend
    npm install
    npx prisma migrate dev
    npm run dev

### 5. Rode o frontend

    cd frontend/my-app
    npm install
    npm run dev

Acesse o frontend em http://localhost:3000

## Funcionalidades principais

- Cadastro e login de usuários
- CRUD de destinos
- CRUD de rotas
- Reordenação de destinos nas rotas (drag-and-drop)
- Cálculo de distância e tempo total da rota (Google Maps API)
- Visualização e gerenciamento de rotas e destinos

## Estrutura de pastas

    travel-planner/
      backend/      # API Node.js
      frontend/     # Frontend Next.js

Consulte os READMEs de cada subpasta para detalhes específicos. 