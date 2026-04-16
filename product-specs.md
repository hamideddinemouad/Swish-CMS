# Swish CMS
## Product Specification

**Document Type:** Product + Technical Specification  
**Architecture:** Multi-tenant SaaS site builder  
**Current Scope:** Implemented product behavior in this repository  
**Status:** In active development  
**Last Updated:** April 14, 2026 (Africa/Casablanca)

## 1. Executive Summary

Swish CMS is a multi-tenant website builder that lets a user create a branded workspace under a unique subdomain, provision a starter site from a template, and edit that site through a structured visual editor.

In the current implementation, Swish focuses on:

- Account registration and login
- One workspace per user
- Template-driven site provisioning
- Multi-page tenant websites resolved by subdomain
- Structured page editing for content, design, and layout
- Shared backend and shared database tenancy with tenant-aware data access

## 2. Product Positioning

Swish is intended for fast workspace/site creation with a guided setup experience rather than open-ended content modeling.

The current product emphasizes:

- Fast onboarding
- Opinionated starter templates
- Editable page sections
- Simple dashboard visibility
- Public-facing tenant pages

## 3. Core Product Concepts

- **User:** A registered account with profile details and login credentials.
- **Tenant / Workspace:** A single site workspace tied to a user and identified by subdomain.
- **Subdomain:** The unique workspace address used to resolve the public site.
- **Template:** A starter site preset used during setup to seed default pages and page data.
- **Page:** A tenant-owned route such as `home`, `about`, or `contact`.
- **Page Components:** Structured section definitions stored on the page and rendered by the frontend.
- **Page Data:** JSON content payload for a page.
- **Page Preference:** JSON design/theme configuration for a page.

## 4. Current Product Scope

### 4.1 Implemented Goals

- Allow a user to register, log in, and maintain a session with access and refresh tokens.
- Allow a signed-in user without a workspace to create one through setup.
- Validate subdomain format and availability before workspace creation.
- Allow the user to choose a starter template during setup.
- Seed a default multi-page website for the tenant automatically.
- Render public tenant pages based on subdomain.
- Provide editor experiences for content, design, and structure updates.
- Provide a simple dashboard and profile experience for the signed-in user.

## 5. Functional Overview

### 5.1 Authentication

Swish supports:

- User registration
- User login
- Access token issuance
- Refresh token issuance and renewal
- Authenticated "me" lookups
- Logout

The frontend stores authentication in cookies and uses backend-backed API routes to maintain the session.

### 5.2 Workspace Setup

After sign-in, a user without a workspace is redirected to setup.

The setup flow currently supports:

- Selecting a template
- Entering a subdomain
- Validating subdomain format
- Checking reserved names
- Checking subdomain availability
- Creating a tenant/workspace
- Automatically provisioning starter pages and starter content

### 5.3 Dashboard

The current dashboard is an account-level workspace overview.

It currently shows:

- Number of pages
- Number of visible sections
- Current template label
- Workspace/subdomain label
- Basic editor readiness state

### 5.4 Profile

The profile page currently supports:

- Viewing user information
- Updating first name and last name
- Viewing email
- Viewing workspace and template context

### 5.5 Public Tenant Website

Tenant pages are resolved by subdomain and rendered dynamically.

Current public page set:

- `home`
- `about`
- `articles`
- `categories`
- `contact`
- `faq`

The frontend reads the incoming subdomain from request headers and fetches the tenant page payload from the backend.

### 5.6 Editor

The current editor is a structured page editor.

It supports editing:

- Content
- Design preferences
- Structure and section visibility

The editor operates on known page payloads and known section/component keys.

## 6. Tenant Model

The current tenant model is intentionally simple:

- One user may own one tenant/workspace
- A tenant belongs to one user
- A tenant has a unique subdomain
- Tenant settings are stored as JSON

The tenant model is streamlined around a direct user-to-workspace relationship.

## 7. Template System

Workspace creation is template-driven.

Current templates:

- `studio`
- `magazine`
- `consulting`
- `minimal`

Each template maps to seeded page definitions that create the initial site structure. The default template is `studio`.

## 8. Page Model

Each page currently includes:

- `slug`
- `title`
- `components`

The page record defines the route and the list of sections/components that should render on that route.

Current seeded page keys:

- `home`
- `about`
- `articles`
- `categories`
- `contact`
- `faq`

## 9. Component/Data Model

Each page has one associated component payload record containing:

- `title`
- `data`
- `preference`

Where:

- `data` holds the page content payload
- `preference` holds design/theme choices

This gives the system a structured editing model built around page-specific content and design payloads.

## 10. Current Editing Model

The editor currently assumes:

- Known page slugs
- Known component keys per page
- Known data structures for each page type
- Known design preference presets and style tokens

Available backend editing operations include:

- Update page content
- Update page preferences
- Disable a page component
- Remove a component
- Delete a page by name

This is a controlled editing surface optimized for predictable page composition and editing.

## 11. Subdomain Rules

Workspace subdomains:

- Must be lowercase
- May contain letters, numbers, and hyphens
- Must be unique
- Must not use reserved names

Reserved names currently include:

- `www`
- `app`
- `api`
- `admin`
- `static`
- `assets`
- `cdn`
- `mail`
- `swish`
- `root`
- `support`
- `help`
- `docs`
- `status`
- `login`
- `auth`
- `signup`
- `register`
- `dashboard`
- `portal`
- `account`
- `accounts`
- `billing`
- `payments`
- `checkout`
- `secure`
- `webmail`
- `ftp`
- `smtp`
- `imap`
- `pop`
- `mx`
- `dns`
- `ns1`
- `ns2`
- `dev`
- `test`
- `staging`
- `stage`
- `prod`
- `production`
- `beta`
- `preview`
- `demo`
- `internal`
- `console`
- `manage`
- `management`
- `system`
- `core`
- `proxy`
- `gateway`
- `edge`
- `origin`
- `cache`
- `monitor`
- `metrics`
- `logs`
- `telemetry`
- `analytics`
- `images`
- `media`
- `files`
- `uploads`
- `storage`
- `db`
- `database`

## 12. Architecture Overview

Swish uses a shared application and shared database architecture.

- **Frontend:** Next.js App Router, React, TypeScript, Tailwind CSS
- **Backend:** NestJS, TypeScript, TypeORM
- **Database:** PostgreSQL
- **Auth:** JWT access and refresh tokens
- **Optional local infra:** Docker Compose

The frontend and backend can run separately in deployment, with the frontend configured to point to the backend base URL.

## 13. Data Isolation

Tenant separation is enforced through tenant-aware application queries and PostgreSQL Row Level Security.

The backend includes RLS migrations, forced RLS policies, and an application role configured with `NOBYPASSRLS` so tenant-scoped data remains isolated across workspace boundaries.

Operational expectations:

- Public page reads are scoped by subdomain
- Authenticated editor actions are scoped by tenant
- Tenant-specific pages and component payloads are looked up with tenant context

## 14. API Surface (Current Product Areas)

The current backend/frontend API surface is centered around:

- Auth
- Users
- Tenants
- Setup
- Pages
- Components

Representative implemented flows include:

- Register/login/refresh/logout
- Tenant availability checks
- Tenant creation with setup provisioning
- Read pages by tenant or subdomain
- Update page content and preferences
- Read and update current user information

## 15. UX Flow

### Signed-out flow

1. User opens the site.
2. User registers or logs in.
3. Auth cookies are created.

### First-time signed-in flow

1. User reaches setup if no workspace exists.
2. User selects a starter template.
3. User chooses a subdomain.
4. System validates availability.
5. Tenant/workspace is created.
6. Starter site pages are seeded.
7. User is redirected to the dashboard.

### Ongoing signed-in flow

1. User visits dashboard.
2. User opens the editor for a page.
3. User updates page content, design, or structure.
4. Public tenant pages reflect the configured content model for that workspace.

## 16. Product Characteristics

- The product uses known templates and known page structures.
- The editing experience is structured across content, design, and structure.
- The system models one workspace per user.
- Tenant data is isolated with application-level scoping and PostgreSQL RLS.

## 17. Future Expansion Directions

Possible future product directions include:

- Multi-workspace ownership
- Membership and collaboration roles
- Dynamic content collections
- Richer section/component libraries
- Publishing workflow states
- Media management
- Search and categorization enhancements

These are future opportunities, not current guaranteed product capabilities.
