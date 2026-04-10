# CarroBom

Sistema web de gerenciamento de veículos (CRUD completo) desenvolvido por **Rodrigo Petrelli Glir**.

Stack: React + Node.js/Express + MySQL.

---

## Requisitos

- Node.js 18+
- MySQL 8+

---

## Configuração do Banco de Dados

1. Abra o MySQL Workbench (ou outro cliente MySQL)
2. Execute o arquivo `database.sql` localizado na raiz do projeto
3. Isso criará o banco `sitecarro` com a tabela `carros` e dados de exemplo

---

## Backend

```bash
cd backend
npm install
```

Crie o arquivo `.env` na pasta `backend/` (copie de `.env.example`):

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=sitecarro
PORT=3001
```

Inicie o servidor:

```bash
npm start
```

O backend ficará disponível em `http://localhost:3001`.

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse em `http://localhost:5173`.

---

## Endpoints da API

| Método | Rota                  | Descrição              |
|--------|-----------------------|------------------------|
| GET    | /api/carros           | Listar carros (paginado) |
| GET    | /api/carros/:id       | Buscar carro por ID    |
| POST   | /api/carros           | Cadastrar novo carro   |
| PUT    | /api/carros/:id       | Atualizar carro        |
| DELETE | /api/carros/:id       | Remover carro          |

---

## Estrutura do Projeto

```
siteCarro/
├── database.sql
├── backend/
│   ├── app.js
│   ├── config/        (db.js, upload.js)
│   ├── models/        (carrosModel.js)
│   ├── controllers/   (carrosController.js)
│   └── routes/        (carros.js)
└── frontend/
    └── src/
        ├── pages/     (ListPage, FormPage, DetailPage, AboutPage)
        ├── components/(Footer, Toast)
        └── services/  (api.js)
```

---

## Funcionalidades

- Listagem de carros com paginação
- Cadastro e edição com validação de campos
- Upload de foto por carro
- Visualização detalhada
- Remoção com confirmação
- Página Sobre com informações do sistema
- Mensagens de erro e sucesso ao usuário
