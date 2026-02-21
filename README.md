## Project Structure

```
Notes/
├── src/
│   ├── cfg.js          # Database configuration
│   └── responses.js    # Response definitions
├── db/
│   └── schema.sql      # Database schema
├── api.js              # Main API server
└── README.md           # Project documentation
```

## Database Schema

The `notes` table includes:
- `id` - Auto-increment primary key
- `title` - Note title (required, max 255 characters)
- `note` - Note content (optional)
- `created_at` - Timestamp of creation
- `modified_at` - Timestamp of last modification

## Environment Variables

Create a `.env` file with the following variables:
```
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=notes_db
DB_PORT=3306
```

## Endpoint Details

### GET `/notes`
Returns all notes from the database.

### GET `/note/:id`
Retrieve a specific note by ID. Returns 404 if not found.

### GET `/note/search/:note`
Search notes by content using pattern matching.

### POST `/note`
Create a new note. Requires `title` and `note` in request body.

### PUT `/note/:id`
Update a note's content. Requires `title` and `note` in request body.

### DELETE `/note/:id`
Delete a specific note by ID.

### DELETE `/note/deleteAll`
Delete all notes from the database.

# Notes API

Lightweight Express.js REST API for creating and managing notes with MySQL persistence.

## Quick Start

- Prerequisites: Node.js (14+), MySQL
- Install dependencies:

```bash
npm install
```

- Copy the example environment file and update credentials:

```bash
cp env.example .env
# edit .env to set DB credentials and JWT secret
```

- Import the database schema:

```sql
-- run the SQL in db/schema.sql (or src/db/schema.sql) to create tables
```

- Start the server:

```bash
node api.js
```

The API listens on http://localhost:3000 by default.

## Configuration

- Database configuration is read from `src/cfg.js` (and `.env`).
- Application secret for JWT is in `src/secret.js` or via environment variables.

## Database

Schema is provided in `db/schema.sql` and `src/db/schema.sql`. The primary table is `notes` with these columns:

- `id` (INT, PK, AUTO_INCREMENT)
- `title` (VARCHAR)
- `note` (TEXT)
- `created_at` (DATETIME)
- `modified_at` (DATETIME)

## API Endpoints

All requests and responses use JSON.

- POST `/register` — Register a new user. Body: `{ "username", "email", "password" }`.
- POST `/login` — Authenticate and receive a JWT. Body: `{ "username", "password" }`.

- GET `/notes` — Get all notes.
- GET `/note/:id` — Get a single note by ID.
- GET `/note/search/:note` — Search notes by text (pattern match).
- POST `/note` — Create a new note. Body: `{ "title", "note" }`.
- PUT `/note/:id` — Update a note. Body: `{ "title", "note" }`.
- DELETE `/note/:id` — Delete a note by ID.
- DELETE `/notes` — Delete all notes.

Example: create a note with curl

```bash
curl -X POST http://localhost:3000/note \
  -H "Content-Type: application/json" \
  -d '{"title":"Shopping","note":"Buy milk"}'
```

Authentication: the project uses JWTs. Include `Authorization: Bearer <token>` for protected endpoints when applicable.

## Files of interest

- `api.js` — main server and route definitions
- `src/cfg.js` — DB configuration
- `src/secret.js` — JWT secret
- `db/schema.sql` and `src/db/schema.sql` — SQL schema

## Troubleshooting

- If you get connection errors, verify `.env` credentials and that MySQL is running.
- For duplicate user/email on registration, the DB will reject the insert; ensure unique constraints are handled.

## Next steps

- Add validation and password hashing (e.g., `bcrypt`) for production readiness.
- Protect endpoints with the provided `authToken` middleware where required.

---

If you'd like, I can also:

- run the server locally and smoke-test endpoints
- add a quick Postman collection or example requests file

