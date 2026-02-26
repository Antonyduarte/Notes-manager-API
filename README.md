# 🧠 Notes Manager API

API RESTful para gerenciamento de notas com autenticação de usuários utilizando JWT.

Projeto desenvolvido com foco em aprendizado de backend com Node.js, Express e MySQL, aplicando boas práticas de organização, rotas protegidas e estrutura REST.

---

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- MySQL
- JSON Web Token (JWT)
- dotenv

---

## 📌 Funcionalidades

- Registro de usuários
- Login com geração de token JWT
- CRUD completo de notas
- Busca de notas por ID
- Busca de notas por texto
- Exclusão individual de nota
- Exclusão de todas as notas do usuário
- Rotas protegidas por autenticação

---

## ⚙️ Pré-requisitos

Antes de rodar o projeto, você precisa ter:

- Node.js (v14 ou superior)
- MySQL instalado e rodando
- Um banco de dados criado

---

## 🔧 Configuração

Crie um arquivo `.env` na raiz do projeto:

DB_HOST=localhost  
DB_USER=seu_usuario  
DB_PASS=sua_senha  
DB_NAME=nome_do_banco  
DB_PORT=3306  
SECRET_KEY=sua_chave_secreta  

⚠️ A SECRET_KEY é usada para assinar e validar o JWT.

---

## 🗄️ Estrutura do Banco de Dados

### Tabela `users`

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
```

### Tabela `notes`

```sql
CREATE TABLE notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  note TEXT NOT NULL,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 📦 Instalação

Clone o repositório:

```bash
git clone https://github.com/Antonyduarte/Notes-manager-API.git
cd Notes-manager-API
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
npm start
```

Servidor rodando em:

http://localhost:3000

---

## 🔐 Autenticação

Rotas protegidas exigem o envio do token no header:

Authorization: Bearer SEU_TOKEN_AQUI

---

## 📡 Endpoints

### 🧑 Autenticação

#### POST `/register`

```json
{
  "username": "usuario",
  "email": "email@mail.com",
  "password": "senha"
}
```

#### POST `/login`

```json
{
  "username": "usuario",
  "password": "senha"
}
```

Retorno:

```json
{
  "token": "jwt_token_aqui"
}
```

---

### 📝 Notas (Rotas protegidas)

#### GET `/notes`
Lista todas as notas do usuário autenticado.

#### GET `/note/:id`
Retorna uma nota específica pelo ID.

#### GET `/note/search/:note`
Busca notas que contenham o texto informado.

#### POST `/note`
Cria uma nova nota.

```json
{
  "title": "Título da nota",
  "note": "Conteúdo da nota"
}
```

#### PUT `/note/:id`
Atualiza uma nota existente.

```json
{
  "title": "Novo título",
  "note": "Novo conteúdo"
}
```

#### DELETE `/note/:id`
Remove uma nota específica.

#### DELETE `/notes`
Remove todas as notas do usuário autenticado.

---

## 📂 Estrutura do Projeto

```
src/
 ├── controllers/
 ├── routes/
 ├── middlewares/
 ├── config/
 └── index.js
.env
package.json
```

---

## 🧠 Conceitos Aplicados

- Estruturação de API REST
- Middleware de autenticação
- Manipulação de banco de dados relacional
- Organização de código backend
- Uso correto de status HTTP

---

## 📌 Melhorias Futuras

- Hash de senha com bcrypt
- Refresh Token
- Paginação
- Testes automatizados
- Docker
- Documentação com Swagger/OpenAPI
- Deploy em ambiente de produção

---

## 📄 Licença

Este projeto é open-source e pode ser utilizado para fins de estudo e aprimoramento.