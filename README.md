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
