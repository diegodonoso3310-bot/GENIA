# GENIA

Phase 1 scaffolds the backend foundations for a multi-tenant product:

- Modular backend architecture documented in `docs/architecture.md`
- Prisma schema for users, companies, memberships, and auth sessions
- Email/password auth service with JWT issuance
- Company-first multi-tenant ownership model
- Seed script for local demo data

## Quick start

1. Copy `.env.example` to `.env`
2. Install dependencies with `npm install`
3. Generate Prisma client with `npm run prisma:generate`
4. Create the database with `npx prisma db push`
5. Seed demo data with `npm run prisma:seed`
6. Type-check with `npm run check`

## Demo seed users

- `alice@acme.test` / `Password123!`
- `bob@acme.test` / `Password123!`
- `chris@globex.test` / `Password123!`
