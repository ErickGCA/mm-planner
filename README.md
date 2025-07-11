# MM Planner

Sistema completo de planejamento de rotas de viagem desenvolvido com Node.js, Express, Prisma, Next.js e React.

Este projeto permite que usuários cadastrem destinos, criem rotas personalizadas, reorganizem destinos através de drag-and-drop, visualizem distâncias e tempos de viagem entre destinos usando a API do Google Maps, e gerenciem suas viagens de forma prática e intuitiva.

## Características Principais

- **Autenticação completa**: Sistema de registro e login com JWT
- **Gerenciamento de destinos**: CRUD completo para destinos de viagem
- **Criação de rotas**: Interface intuitiva para criar rotas personalizadas
- **Drag-and-drop**: Reordenação visual de destinos nas rotas
- **Integração Google Maps**: Cálculo automático de distâncias e tempos
- **Interface responsiva**: Design moderno e adaptável
- **API RESTful**: Backend robusto com validações e tratamento de erros

## Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados principal
- **JWT** - Autenticação
- **Swagger** - Documentação da API
- **TypeScript** - Tipagem estática

### Frontend
- **Next.js 14** - Framework React
- **React** - Biblioteca de interface
- **TypeScript** - Tipagem estática
- **CSS Modules** - Estilização modular
- **Google Maps API** - Integração com mapas

## Estrutura do Projeto

```
mm-planner/
├── backend/                 # API Node.js
│   ├── src/
│   │   ├── controllers/     # Controladores da API
│   │   ├── services/        # Lógica de negócio
│   │   ├── routes/          # Definição de rotas
│   │   ├── middlewares/     # Middlewares (auth, validação)
│   │   ├── models/          # Modelos Prisma
│   │   └── utils/           # Utilitários
│   └── prisma/              # Schema e migrações do banco
├── frontend/
│   └── my-app/              # Aplicação Next.js
│       └── src/
│           ├── app/         # Páginas da aplicação
│           ├── components/  # Componentes React
│           └── services/    # Serviços de API
└── docker-compose.yml       # Configuração Docker
```

## Requisitos do Sistema

- **Node.js** 18.0 ou superior
- **npm** ou **yarn** para gerenciamento de dependências
- **PostgreSQL** 12.0 ou superior (ou SQLite para desenvolvimento)
- **Docker** e **Docker Compose** (opcional)
- **API Key do Google Maps** para funcionalidades de geolocalização

## Configuração e Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/ErickGCA/mm-planner.git
cd mm-planner
```

### 2. Configure as variáveis de ambiente

#### Backend (.env)
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/travel_planner"
JWT_SECRET="sua_chave_secreta_jwt"
GOOGLE_MAPS_API_KEY="sua_api_key_google_maps"
PORT=3001
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=sua_api_key_google_maps
```

### 3. Configuração do banco de dados

#### Opção A: Docker (Recomendado)
```bash
docker-compose up -d
```

#### Opção B: PostgreSQL local
1. Instale e configure PostgreSQL
2. Crie um banco de dados chamado `travel_planner`
3. Configure a URL de conexão no arquivo `.env` do backend

### 4. Instalação e execução

#### Backend
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

O backend estará disponível em: http://localhost:3001

#### Frontend
```bash
cd frontend/my-app
npm install
npm run dev
```

O frontend estará disponível em: http://localhost:3000

## Funcionalidades Detalhadas

### Autenticação
- Registro de novos usuários
- Login com email e senha
- Autenticação JWT
- Proteção de rotas

### Gerenciamento de Destinos
- Cadastro de destinos com nome, descrição e coordenadas
- Listagem de todos os destinos
- Edição de informações dos destinos
- Exclusão de destinos

### Criação e Gerenciamento de Rotas
- Criação de rotas personalizadas
- Adição de múltiplos destinos a uma rota
- Reordenação de destinos através de drag-and-drop
- Cálculo automático de distâncias e tempos de viagem
- Visualização da rota no mapa
- Edição e exclusão de rotas

### Interface do Usuário
- Design responsivo e moderno
- Navegação intuitiva
- Feedback visual para ações do usuário
- Modais de confirmação para ações importantes

## Screenshots da Aplicação

### Tela de Login
![Tela de Login](images/login_page.png)

A tela de login apresenta um formulário limpo e intuitivo onde os usuários podem inserir suas credenciais para acessar o sistema.

### Tela de Registro
![Tela de Registro](images/register_page.png)

A tela de registro permite que novos usuários criem suas contas fornecendo nome, email e senha.

### Dashboard Principal
![Dashboard Principal](images/dashboard.png)

O dashboard principal exibe um resumo das rotas do usuário, com acesso rápido às principais funcionalidades do sistema.

### Criação de Rotas
![Criação de Rotas](images/criar_nova_rota.png)

Interface para criação de novas rotas, permitindo adicionar destinos e configurar detalhes da viagem.

### Detalhes da Rota
![Detalhes da Rota](images/detalhes_rota.png)

Visualização dos detalhes de uma rota específica, incluindo destinos, distâncias e tempos.

### Gerenciar Destinos
![Gerenciar Destinos](images/gerenciar_destino.png)

Formulário para cadastro e gerenciamento de destinos com informações como nome, descrição e localização.

## API Endpoints

### Autenticação
- `POST /auth/register` - Registro de usuário
- `POST /auth/login` - Login de usuário

### Destinos
- `GET /destinations` - Listar destinos
- `POST /destinations` - Criar destino
- `PUT /destinations/:id` - Atualizar destino
- `DELETE /destinations/:id` - Excluir destino

### Rotas
- `GET /routes` - Listar rotas do usuário
- `POST /routes` - Criar rota
- `GET /routes/:id` - Obter detalhes da rota
- `PUT /routes/:id` - Atualizar rota
- `DELETE /routes/:id` - Excluir rota
- `PUT /routes/:id/destinations` - Reordenar destinos da rota

### Swagger 
- `http://localhost:3333/api-docs/`

## Desenvolvimento

### Scripts disponíveis

#### Backend
```bash
npm run dev          # Executa em modo desenvolvimento
npm run build        # Compila o projeto
npm run start        # Executa em produção
npm run test         # Executa testes
```

#### Frontend
```bash
npm run dev          # Executa em modo desenvolvimento
npm run build        # Compila o projeto
npm run start        # Executa em produção
npm run lint         # Executa linter
```

### Estrutura do banco de dados

O projeto utiliza Prisma como ORM com as seguintes entidades principais:

- **User**: Usuários do sistema
- **Destination**: Destinos de viagem
- **Route**: Rotas criadas pelos usuários
- **RouteDestination**: Relacionamento entre rotas e destinos

## Contato

- **Desenvolvedor**: Erick Cabral
- **Email**: [erickgcabral@gmail.com]
- **GitHub**: [https://github.com/ErickGCA]

