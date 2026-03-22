# GENIA Phase 1 Architecture

## Goals
- Establish a backend-first foundation for authentication and multi-tenant company management.
- Model users, companies, memberships, and sessions in Prisma.
- Keep the app modular so HTTP handlers and business workflows can be layered on in later phases.

## Proposed Layers
1. **Configuration layer**: environment parsing and invariant checks.
2. **Infrastructure layer**: Prisma client, crypto helpers, token helpers.
3. **Domain modules**:
   - `auth`: sign-up, sign-in, token issuance, session persistence.
   - `companies`: tenant creation and membership management.
   - `users`: user profile lookups and company-scoped access.
4. **Application/API layer (next phase)**: controllers, route adapters, request validation, and authorization middleware.

## Tenant Model
- A `Company` is the tenant root.
- `CompanyMembership` maps users to companies with role-based access.
- All future tenant-owned records should contain `companyId` and be queried through membership-aware services.

## Auth Model
- Email/password authentication in Phase 1.
- Passwords are hashed with bcrypt.
- JWT access tokens include `sub`, `sessionId`, and active `companyId`.
- `AuthSession` stores revocable sessions and enables audit-friendly token tracking.

## Seed Strategy
- Create two companies, three users, role-based memberships, and one demo session.
- Seed data gives immediate test fixtures for later API and UI work.

## What should come next
1. Add an HTTP framework and route handlers.
2. Add request validation and auth middleware.
3. Implement invitation flows and company switching endpoints.
4. Add audit logging and finer-grained permissions.
5. Add automated tests around auth and tenant isolation.
