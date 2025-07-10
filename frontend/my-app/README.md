# Travel Planner - Frontend

Aplicação web para planejamento de rotas de viagem.

## Tecnologias
- Next.js 14
- React 18
- TypeScript
- CSS Modules

## Setup

1. Instale as dependências:

    npm install

2. Configure o arquivo `.env.local`:

    NEXT_PUBLIC_API_URL=http://localhost:3333

3. Inicie o frontend:

npm run dev

Acesse em http://localhost:3000

## Estrutura de pastas

    frontend/my-app/
      src/
        app/
          components/
          dashboard/
          destinations/
          routes/
          auth/
          services/
          lib/

## Funcionalidades

- Cadastro e login de usuários
- CRUD de destinos
- CRUD de rotas
- Reordenação de destinos nas rotas (drag-and-drop)
- Visualização de distância e tempo total da rota
- Proteção de rotas (acesso apenas autenticado)

Consulte o README geral na raiz do projeto para instruções completas.
