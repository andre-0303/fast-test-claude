# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Fast Tests Platform

Plataforma de questões técnicas para autoavaliação.

## Stack
- Backend: Node.js + Express (porta 3001)
- Frontend: HTML/CSS/JS puro (porta 80)
- Dados: backend/data/questions.json
- Infra: Docker + Docker Compose

## Comandos principais
```bash
docker compose up --build   # sobe tudo
docker compose down          # derruba
node backend/server.js       # dev local sem docker
```

## Arquitetura
- GET /api/tests          → lista categorias disponíveis
- GET /api/tests/:category → retorna 3–4 questões aleatórias
- POST /api/results       → salva resultado (em memória)

## Estrutura do questions.json
Cada categoria tem array de questões com:
  id, pergunta, opcoes[], resposta_correta, explicacao

## Convenções
- Nunca editar questions.json diretamente sem validar o schema
- Usar /validate-json antes de qualquer push de dados
- Containers nomeados: fast-tests-backend, fast-tests-frontend
- Variáveis de ambiente em .env (nunca commitar)

## Categorias de questões
engenharia-software | sql | docker | entrevistas-tech
