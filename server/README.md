# Aeson Auth API

Minimal Express + MongoDB authentication API (email + password) using HTTP-only cookie sessions.

## Local setup

1. Copy environment file:

```sh
cp .env.example .env
```

2. Fill in `.env`:

- `MONGODB_URI`: Your MongoDB Atlas connection string.
- `JWT_SECRET`: Long random string (use a password manager or `openssl rand -base64 48`).
- `CLIENT_ORIGIN`: Vite dev server origin (default `http://localhost:5173`).

3. Install dependencies and run the API:

```sh
npm install
npm run dev
```

The API runs on `http://localhost:5175` by default.

## Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

## Notes

- Passwords are hashed with bcrypt.
- Auth cookie is HTTP-only with `SameSite=Lax`.
