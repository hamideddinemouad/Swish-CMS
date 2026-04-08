# Swish CMS Project Status

Last reviewed: April 8, 2026

## Snapshot

The project already has a solid MVP foundation.

What is working best right now is:

- account registration and login
- cookie-based auth with refresh flow
- protected dashboard/setup/editor routes
- tenant creation with subdomain validation
- automatic starter site provisioning for a new tenant
- subdomain-based public site rendering
- page-based editor for seeded tenant pages
- backend and frontend production builds

This is not yet a full CMS from the original spec, but it is already a usable multi-tenant starter website builder with editable seeded pages.

## Verified During This Review

- `backend`: `npm run build` passed
- `frontend`: `npm run build` passed
- there is one Cypress spec for the public About page

## Working End-to-End Features

### 1. Public app shell

These public routes/pages are present:

- `/`
- `/about`
- `/login`
- `/register`

Current behavior:

- the landing page introduces the product and links to login/register
- the About page exists and has a basic public marketing surface
- shared header/footer are present on the public shell

### 2. Authentication

Working auth flows:

- register a new user with:
  - first name
  - last name
  - email
  - password
  - secret phrase
- login with email and password
- logout by clearing auth cookies
- refresh access/refresh tokens through the Next.js proxy route
- fetch current user info for the frontend session

Current auth architecture:

- frontend calls local `/api/...` routes
- Next.js routes proxy to NestJS backend
- auth state is stored in Redux and persisted in the browser
- protected routes are guarded by middleware plus cookie validation

### 3. Workspace / tenant setup

The setup flow is already usable.

Working options:

- enter a tenant name
- enter a subdomain
- validate subdomain format
- block reserved subdomains like `www`, `app`, `api`, `admin`
- check subdomain availability
- create exactly one tenant for the current user

When a tenant is created, the backend automatically seeds starter pages and their component data.

### 4. Tenant website rendering by subdomain

The multi-tenant public site flow is already in place.

Working behavior:

- the proxy extracts the subdomain from the host
- requests on a tenant subdomain are rewritten to tenant routes
- tenant pages fetch content from the backend using the resolved subdomain
- navigation and footer are pulled from the tenant's home page data

### 5. Seeded pages currently available

Each new tenant currently gets these pages:

- `home`
- `about`
- `articles`
- `categories`
- `contact`
- `faq`

These pages are available both:

- on the tenant website
- inside the editor navigation

### 6. Editor

The editor is already functional for seeded page content.

Working editor behavior:

- protected editor route: `/editor/[pageName]`
- editor loads the current tenant from the authenticated user
- editor fetches the selected page from the backend
- editor shows a live preview next to editable fields
- fields update local state instantly
- content is saved to the backend on blur
- editor navigation lets you move between seeded pages

Current editor limitation:

- it edits page `data`
- it does not yet expose UI controls for component preferences or component disabling
- nav/footer content is intentionally locked in the editor UI

## Working Page Options By Page

### Home

Currently rendered/editable content sections:

- `hero`
- `featuredStories`
- `offerings`
- `testimonials`
- `newsletter`

Rendered but not editable from the current editor UI:

- `nav`
- `footer`

### About

Currently rendered/editable content sections:

- `hero`
- `mission`
- `values`
- `timeline`
- `team`
- `stats`
- `testimonials`

### Articles

Currently rendered/editable content sections:

- `hero`
- `featuredArticles`
- `editorialSeries`
- `categories`
- `trending`
- `authors`
- `newsletter`

### Categories

Currently rendered/editable content sections:

- `hero`
- `categoryGrid`
- `featuredCollections`
- `resourceLinks`
- `newsletter`

### Contact

Currently rendered/editable content sections:

- `hero`
- `contactInfo`
- `locations`
- `form`
- `faq`

### FAQ

Currently rendered/editable content sections:

- `hero`
- `faq`
- `supportLinks`

## Working Backend/API Surface

These areas are implemented enough to support the current frontend:

- `auth`
  - register
  - login
  - refresh
  - me / current user
- `users`
  - current user info for frontend hydration
- `tenants`
  - create tenant
  - check subdomain availability
- `pages`
  - fetch pages by tenant
  - fetch page by subdomain + page name
  - delete page by page name
  - disable page component
- `components`
  - update page content
  - update page preference
- `setup`
  - seed default pages/components during tenant creation

## Present In Code But Not Fully Wired In UI

These pieces exist, but I would treat them as partial rather than finished user features:

- page preference update API exists, but the editor UI does not use it yet
- component disable API exists, but the editor UI does not expose it yet
- `/api/editor/pages` exists, but there is no real page-management screen using it
- auth greeting route exists, but there is no real user-facing page around it
- generic user/component CRUD endpoints exist, but they are not part of the current product flow

## Known Gaps / Not Ready Yet

These are the biggest gaps I found:

- the dashboard is still minimal and only shows a welcome block
- `/profile` and `/explore` are linked in the public header but pages do not exist
- `tenants.findAll`, `findOne`, `update`, and `remove` are still placeholder backend methods
- `/api/setup` returns `404 Not implemented`
- the product-spec content-model/content-entry engine is not implemented yet
- role-based multi-member tenant management from the spec is not implemented yet
- there is no real media/asset workflow yet
- there is no frontend flow for password reset/change
- the backend secret-phrase reset logic should be reviewed before calling it production-ready
- automated test coverage is still very light

## Overall Assessment

Current maturity: early but real MVP progress

Best summary:

- authentication works
- tenant creation works
- default site provisioning works
- tenant public pages work
- content editing for seeded pages works

What is still missing is the deeper CMS layer:

- richer dashboard features
- page management UI
- preference/style editing UI
- component enable/disable UI
- content model/content entry system from the original spec
- broader testing and hardening
