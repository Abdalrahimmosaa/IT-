# IT Helpdesk (MVP) — Scaffold

This repository scaffold provides an IT Support / Helpdesk MVP:

- Backend: NestJS (TypeScript), Prisma, PostgreSQL, JWT auth
- Frontend: React + TypeScript (Vite)
- Dev orchestration: Docker Compose

Quickstart (local)
1. Copy files into a directory.
2. Create `.env` files from `.env.example` in `backend/` and `frontend/`.
3. Start containers:
   - If using Docker Compose:
     docker-compose up --build
4. Apply Prisma migrations (inside backend container or locally):
   - npx prisma migrate dev --name init
   - npx prisma generate
5. Backend API: http://localhost:4000
6. Frontend: http://localhost:3000

Default API endpoints (MVP)
- POST /api/auth/register { name, email, password }
- POST /api/auth/login { email, password } -> returns accessToken
- GET /api/users/me (auth)
- GET /api/tickets (auth)
- POST /api/tickets (auth) { title, description }

Environment
- Configure SMTP settings in `backend/.env` to enable email notifications.

Next recommended steps
- Add stronger validation (class-validator) and DTOs.
- Add email ingestion or mail parsing to create tickets from email.
- Add RBAC roles (agent/admin) and ticket assignment flows.
- Add file uploads (S3) and attachment handling.
- Add background worker for SLA/escalation (BullMQ + Redis).

If you want, I can:
- Push this scaffold to a GitHub repo you specify.
- Generate additional features (assets, KB, reports).
- Implement UI components for ticket details, comments, and assignment.
