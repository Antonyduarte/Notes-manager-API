# Notes API

Lightweight REST API for managing user notes (Node.js + Express + MySQL).
## Features
- User registration and login (JWT auth)
- Create, read, update, delete notes
- Search notes by text

## Requirements
- Node.js 
- MySQL

## Environment
Create a `.env` file with the following variables:

- DB_HOST
- DB_USER
- DB_PASS
- DB_NAME
- DB_PORT
- SECRET_KEY

## Install & Run
1. npm install
2. Start MySQL and create the database
3. npm start (the server listens on port 3000)


## Endpoints
- POST /register
	```- Body: { "username":"...", "email":"...", "password":"..." }```

- POST /login
	```- Body: { "username":"...", "password":"..." }```
	```- Response: { "token": "<jwt>" }```

All note endpoints require Authorization header: `Authorization: Bearer <token>`
```
- GET /notes — list all notes for authenticated user
- GET /note/:id — get specific note by id
- GET /note/search/:note — search notes by text
- POST /note — create note
	- Body: { "title":"...", "note":"..." }
- PUT /note/:id — update note
	- Body: { "title":"...", "note":"..." }
- DELETE /notes — delete all notes for user
- DELETE /note/:id — delete specific note
```
## Responses
Responses follow a simple JSON wrapper for errors/success plus some endpoints return raw results. HTTP status codes are used appropriately (200, 201, 400, 401, 404, 500).

## Notes
- Passwords in the example implementation are plain text — replace with hashed passwords in production (bcrypt).
- Adjust JWT expiration and secret via SECRET_KEY and code if needed.

---
Minimal, self-contained Notes API. See `api.js` for implementation details.
