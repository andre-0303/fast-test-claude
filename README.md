# Projeto - Fast Tests

Plataforma de questões técnicas para autoavaliação em desenvolvimento de software.

## Propósito

Este projeto foi criado como ambiente de aprendizado para explorar:

- **Claude Code**: Uso de agentes e skills para automatizar tarefas
- **Docker & Docker Compose**: Containerização de aplicações
- **Node.js + Express**: Backend API
- **HTML/CSS/JS**: Frontend estático com Nginx

O objetivo é aprender a configurar e usar agentes Claude Code em projetos reais, entender como skills funcionam, e praticar configurações de Docker.

## Stack

- **Backend**: Node.js 18 + Express (porta 3001)
- **Frontend**: HTML/CSS/JS puro + Nginx (porta 8080)
- **Infra**: Docker + Docker Compose
- **Dados**: PostgreSQL (porta 5432)
- **Dados Legado**: arquivo JSON (`backend/data/questions.json`)

## Como Testar

### Com Docker

```bash
# Subir todos os serviços
docker compose up --build

# Acessar aplicação
# Frontend: http://localhost:8080
# Backend API: http://localhost:3001
```

### Sem Docker (desenvolvimento local)

```bash
# Backend
cd backend
npm install
node server.js

# O frontend será servido automaticamente pelo backend
# Acesse: http://localhost:3001
```

## Deploy (GitHub Pages + Render)

### Frontend (GitHub Pages)

1. Habilite o GitHub Pages com **GitHub Actions**.
2. Defina a variável do repositório `PAGES_API_BASE_URL` com a URL pública do backend no Render (ex: `https://fast-test-claude.onrender.com`).
3. O workflow `.github/workflows/pages.yml` publica a pasta `/frontend` quando houver push na branch `main`.
4. URL do frontend: `https://andre-0303.github.io/fast-test-claude`

### Backend (Render via Dockerfile)

1. Crie um **Web Service** no Render apontando para este repositório.
2. Em **Root Directory**, use `backend/` e escolha **Dockerfile**.
3. Crie um banco **PostgreSQL** no Render e conecte ao serviço.
4. Configure as variáveis de ambiente no Render:
   - `PORT` (ex: 3001)
   - `DB_HOST`, `DB_PORT`, `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`
   - `CORS_ORIGIN` (opcional): lista separada por vírgula com origens permitidas. Por padrão inclui `http://localhost:3001`, `http://localhost:8080` e `https://andre-0303.github.io` (CORS usa apenas esquema + host).

### Deploy automático do backend

1. No Render, gere um **Deploy Hook**.
2. Crie o secret `RENDER_DEPLOY_HOOK` no GitHub.
3. O workflow `.github/workflows/render-backend.yml` dispara o hook quando houver push na branch `main` com mudanças em `/backend`.

## Categorias de Questões

- `engenharia-software`: Metodologias ágeis, Scrum, Waterfall
- `sql`: Consultas, funções SQL
- `docker`: Dockerfiles, containers, compose
- `entrevistas-tech`: Preparação para entrevistas
- `python`: Listas, tuplas, dicionários
- `fundamentos-algoritmos`: Complexidade, estruturas de dados

## API Endpoints

- `GET /api/tests` — Lista categorias disponíveis
- `GET /api/tests/:category` — Retorna 3-4 questões aleatórias
- `POST /api/results` — Salva resultado no PostgreSQL

## Estrutura do Projeto

```
/
├── backend/
│   ├── server.js       # Servidor Express
│   ├── Dockerfile     # Container Node.js
│   ├── schema.sql      # Schema PostgreSQL
│   ├── package.json    # Dependências (pg)
│   └── data/
│       └── questions.json  # Legado
├── frontend/
│   ├── index.html     # Interface principal
│   ├── app.js        # Frontend JS
│   ├── Dockerfile    # Container Nginx
│   └── nginx.conf    # Configuração proxy
├── docker-compose.yml
├── .env              # Variáveis de ambiente
└── README.md
```

## Agentes e Skills

O projeto usa agentes Claude Code definidos em `.claude/agents/`:

- `docker-expert`: Configuração e troubleshooting Docker
- `json-validator`: Validação de schema do questions.json
- `ui-ux-designer`: Design de interface e experiência do usuário

Skills disponíveis em `.claude/skills/`:

- `add-question`: Adicionar novas questões
- `validate-json`: Validar questions.json

### Feito por André Bandeira - Software Engineer
