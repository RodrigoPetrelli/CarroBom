# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**siteCarro** — a car listing/dealership website with a Node.js/Express backend and React frontend, backed by MySQL.

## Architecture

This is a full-stack project split into two directories:

- `backend/` — :Implemente os endpoints: GET (listar), POST (cadastrar), PUT (atualizar) e DELETE (remover).Configure o CORS para permitir a conexão com o frontend.Organize o código de forma modular (pastas separadas para routes, controllers e models).
- `frontend/` —Implemente as seguintes telas:Listagem: Exibição dos carros com paginação ou rolagem infinita.Cadastro/Edição: Formulários com validações de dados.Detalhes: Visualização completa de um veículo específico.Identificação: Insira meu nome "[Seu Nome Aqui]" de forma visível no rodapé de todas as telas.
### Backend

Entry point: `backend/app.js`  
Stack: Express 5, `mysql` (or `mysql2`), `cors`, `nodemon` (dev)  
Database helper pattern (see `../teste/reacttesao/src/db.js` for reference): a `mysql2/promise` pool with generic CRUD helpers (`executarQuery`, `obterTodos`, `obterPorId`, `inserir`, `atualizar`, `deletar`).

### Frontend

Entry point: `frontend/src/index.js`, root component `frontend/src/App.js`  
Stack: React 19, Create React App scripts

## Commands

### Backend

```bash
cd backend
npm install       # install dependencies
npm start         # start with nodemon (auto-reload)
node app.js       # start without auto-reload
```

### Frontend

```bash
cd frontend
npm install
npm start         # dev server on http://localhost:3000
npm run build     # production build
npm test          # run tests
```

## Database

Crie uma tabela chamada carros com, no mínimo, os seguintes campos: id, modelo, marca, ano, preco, quilometragem e descricao. Gere também o arquivo database.sql para exportação
MySQL is required locally. Configure connection via environment variables:

| Variable       | Default         |
|---------------|-----------------|
| `DB_HOST`     | `localhost`     |
| `DB_PORT`     | `3306`          |
| `DB_USER`     | `root`          |
| `DB_PASSWORD` | _(empty)_       |
| `DB_NAME`     | your database   |

Use a `.env` file with `dotenv` in the backend to set these locally.

## CORS

The backend enables CORS for local React dev (`http://localhost:3000`). Adjust the `cors()` config in `app.js` when deploying.
