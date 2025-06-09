# Honey Learn Backend

This is a Node.js/Express backend using TypeScript, Prisma ORM, and PostgreSQL for authentication, parent/student management, and course/lesson APIs.

## Features

- User registration & login with JWT authentication
- Parent and student profiles
- Course, lesson, and lesson section management
- Refresh token endpoint
- Secure password hashing (bcrypt)
- Request validation (zod)
- Prisma ORM with PostgreSQL

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/GuruSangha88/honeylearn_backend.git
cd honeylearn_backend
```

### 2. Install dependencies

```sh
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```
DATABASE_URL=postgresql://user:password@localhost:5432/yourdb
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

### 4. Run migrations

```sh
npx prisma migrate dev --name init
```

### 5. Start the development server

```sh
npx ts-node-dev src/server.ts
```

## API Endpoints

- `POST /register` — Register a new user (parent or admin)
- `POST /login` — Login and receive JWT tokens
- `POST /refresh` — Refresh access/refresh tokens
- `GET /parent/profile` — Get authenticated parent profile (requires JWT)
- More endpoints for courses, lessons, students, etc.

## Project Structure

```
src/
  controllers/
  middleware/
  routes/
  services/
  utils/
  prisma/
prisma/
  schema.prisma
.gitignore
.env
```

## Scripts

- `npm run dev` — Start development server
- `npx prisma studio` — Open Prisma Studio (DB GUI)
- `npx prisma migrate dev` — Run migrations

## License

MIT

---

**Note:**  
- Do not commit your `.env` or database files.
- Update the GitHub repo URL in this README after creating your repository.
