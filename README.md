# Swish CMS

Swish CMS is a multi-tenant website builder with a NestJS backend, a Next.js frontend, PostgreSQL storage, and tenant-aware subdomain routing. It supports account onboarding, one workspace per user, template-based site provisioning, structured page editing, and public tenant-facing pages.

## Stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: NestJS, TypeScript, TypeORM
- Database: PostgreSQL
- Auth: JWT access and refresh tokens
- Local container support: Docker Compose

## Repository Layout

- `frontend/`: Next.js application for the public site, editor, dashboard, and API proxy routes
- `backend/`: NestJS API for auth, tenants, pages, setup, components, and users
- `docker-compose.yml`: Optional local Docker setup for app + database
- `product-specs.md`: Product and technical specification

## Main Features

- One workspace per user
- Template-based workspace provisioning by subdomain
- Public tenant website routes for `home`, `about`, `articles`, `categories`, `contact`, and `faq`
- Structured editor flows for content, design, and structure
- Server-managed page/component configuration
- JWT auth with access and refresh tokens
- PostgreSQL-backed tenant data isolation with Row Level Security

## Product Scope

Swish delivers a focused site-building workflow centered on:

- account registration, login, refresh, and logout
- workspace setup with template selection
- subdomain availability and reserved-name validation
- automatic seeding of starter pages and page payloads
- dashboard and profile flows
- tenant page rendering by subdomain

## Prerequisites

- Node.js 22
- npm
- PostgreSQL 16+ recommended

## Environment Variables

Example env files are included:

- [frontend/.env.example](/Users/mouad/Desktop/Fil Rouge/Swish-CMS/frontend/.env.example:1)
- [backend/.env.example](/Users/mouad/Desktop/Fil Rouge/Swish-CMS/backend/.env.example:1)

Create real env files before running locally:

```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

Notes:

- The frontend reads `API`, not `NEXT_PUBLIC_API_URL`.
- The Docker-oriented frontend example uses `http://backend:3000`.
- For non-Docker local development, set `frontend/.env` `API=http://localhost:3000`.

## Local Development

### Option 1: Run without Docker

1. Start PostgreSQL and create the database referenced in `backend/.env`.
2. Install dependencies:

```bash
cd backend && npm ci
cd ../frontend && npm ci
```

3. Start the backend:

```bash
cd backend
npm run start:dev
```

4. In another terminal, start the frontend:

```bash
cd frontend
npm run dev
```

App URLs:

- Frontend: `http://localhost:4000`
- Backend: `http://localhost:3000`

### Option 2: Run with Docker Compose

```bash
docker compose up --build
```

This uses the root `.env` and the service wiring in `docker-compose.yml`.

## Useful Scripts

### Frontend

```bash
npm run dev
npm run build
npm run start
npm run lint
```

### Backend

```bash
npm run start:dev
npm run build
npm run start:prod
npm run migration:run
npm run seed
npm run lint
```

## Backend Modules

The backend is organized around these main modules:

- `auth`
- `tenants`
- `pages`
- `components`
- `setup`
- `users`

## Frontend Areas

The frontend contains:

- Public pages under `app/(public)`
- Tenant-rendered pages under `app/(tenant)`
- Internal API routes under `app/api`
- Editor-specific UI under `app/(public)/editor`

Current tenant page set:

- `home`
- `about`
- `articles`
- `categories`
- `contact`
- `faq`

## Deployment Notes

- The frontend and backend can be deployed separately.
- For Vercel, create two projects from the same repository:
- frontend project with Root Directory `frontend`
- backend project with Root Directory `backend`
- Set the frontend `API` variable to the deployed backend base URL.
- If the backend is deployed on `api.<your-domain>`, set `API=https://api.<your-domain>`.
- Make sure the frontend and backend share the same auth secret values.
- Reserve infrastructure subdomains like `api` and `www` so they are not used as tenant names.
- If you use subdomain-based tenant routing in production, configure your proxy or hosting platform to forward the host/subdomain information correctly.
- The current product model assumes one workspace per user and template-seeded pages.
- Tenant isolation is backed by PostgreSQL Row Level Security migrations in the backend.

## Additional Docs

- Product spec: [product-specs.md](/Users/mouad/Desktop/Fil Rouge/Swish-CMS/product-specs.md:1)
- Frontend notes: [frontend/README.md](/Users/mouad/Desktop/Fil Rouge/Swish-CMS/frontend/README.md:1)
- Backend notes: [backend/README.md](/Users/mouad/Desktop/Fil Rouge/Swish-CMS/backend/README.md:1)
