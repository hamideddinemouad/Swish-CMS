-- Swish CMS (v1.0) — PostgreSQL 15+ schema + RLS + seed data
-- Multi-tenant (shared DB/shared schema) using app.tenant_id session variable

BEGIN;

-- ------------------------------------------------------------
-- Extensions
-- ------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS pgcrypto; -- for gen_random_uuid()

-- ------------------------------------------------------------
-- Roles (optional but recommended)
-- - swish_owner: owns tables/migrations/policies
-- - swish_app: runtime app role (MUST NOT have BYPASSRLS)
-- ------------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'swish_owner') THEN
    CREATE ROLE swish_owner LOGIN;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'swish_app') THEN
    CREATE ROLE swish_app LOGIN;
  END IF;
END$$;

-- Ensure runtime role does NOT bypass RLS
ALTER ROLE swish_app NOBYPASSRLS;

-- ------------------------------------------------------------
-- Enum types
-- ------------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'membership_role') THEN
    CREATE TYPE membership_role AS ENUM ('OWNER', 'EDITOR');
  END IF;
END$$;

-- ------------------------------------------------------------
-- Global (system-level) tables (NO RLS)
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

modify entity tenants should have theses columns
 id           UUID PRIMARY KEY DEFAULT
  subdomain  TEXT UNIQUE NOT NULL,
  tenants_subdomain_dns_safe  follow this regex '^[a-z0-9-]+$' 
  and tenants_subdomain_reserved should not be any of these 
  ('www','app','api','admin','static','assets','cdn','mail')
  name       TEXT NOT NULL,
  settings   JSONB NOT NULL DEFAULT '{}'
  created_at 
  updated_at 
  tenants_subdomain_dns_safe  follow this regex '^[a-z0-9-]+$' 
  and tenants_subdomain_reserved should not be any of these ('www','app','api','admin','static','assets','cdn','mail')
CREATE TABLE IF NOT EXISTS tenants (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subdomain  TEXT UNIQUE NOT NULL,
  name       TEXT NOT NULL,
  settings   JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT tenants_subdomain_dns_safe CHECK (subdomain ~ '^[a-z0-9-]+$'),
  CONSTRAINT tenants_subdomain_reserved CHECK (
    subdomain NOT IN ('www','app','api','admin','static','assets','cdn','mail')
  )
);

CREATE TABLE IF NOT EXISTS memberships (
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tenant_id  UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  role       membership_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, tenant_id),
  CONSTRAINT memberships_unique UNIQUE (user_id, tenant_id)
);

-- ------------------------------------------------------------
-- Tenant-scoped tables (RLS protected)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS content_definitions (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id  UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  slug       TEXT NOT NULL,
  name       TEXT NOT NULL,
  schema     JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT content_definitions_slug_format CHECK (slug ~ '^[a-z0-9-]+$'),
  CONSTRAINT content_definitions_unique_per_tenant UNIQUE (tenant_id, slug)
);

CREATE TABLE IF NOT EXISTS content_entries (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id    UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  definition_id UUID NOT NULL REFERENCES content_definitions(id) ON DELETE CASCADE,
  slug         TEXT NOT NULL,
  data         JSONB NOT NULL,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  published_at TIMESTAMPTZ NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT content_entries_slug_format CHECK (slug ~ '^[a-z0-9-]+$'),
  CONSTRAINT content_entries_unique_per_type UNIQUE (tenant_id, definition_id, slug)
);

CREATE TABLE IF NOT EXISTS pages (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id  UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  slug       TEXT NOT NULL,
  title      TEXT NOT NULL DEFAULT '',
  components JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT pages_slug_format CHECK (slug ~ '^[a-z0-9-]+$'),
  CONSTRAINT pages_unique_per_tenant UNIQUE (tenant_id, slug)
);

CREATE TABLE IF NOT EXISTS tenant_events (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id     UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  actor_user_id UUID NULL REFERENCES users(id) ON DELETE SET NULL,
  type          TEXT NOT NULL,
  payload       JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------
-- Indexes (required + helpful)
-- ------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_content_entries_tenant_def_pub_created
  ON content_entries (tenant_id, definition_id, is_published, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_content_entries_tenant_def_slug
  ON content_entries (tenant_id, definition_id, slug);

CREATE INDEX IF NOT EXISTS idx_content_definitions_tenant_slug
  ON content_definitions (tenant_id, slug);

CREATE INDEX IF NOT EXISTS idx_pages_tenant_slug
  ON pages (tenant_id, slug);

CREATE INDEX IF NOT EXISTS idx_tenant_events_tenant_created
  ON tenant_events (tenant_id, created_at DESC);

-- ------------------------------------------------------------
-- RLS setup
-- app.tenant_id must be set per request:
--   BEGIN;
--   SET LOCAL app.tenant_id = '<tenant-uuid>';
--   ...queries...
--   COMMIT;
-- ------------------------------------------------------------
ALTER TABLE content_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_entries    ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages              ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_events      ENABLE ROW LEVEL SECURITY;

-- Force RLS even for table owner (prevents accidental bypass)
ALTER TABLE content_definitions FORCE ROW LEVEL SECURITY;
ALTER TABLE content_entries    FORCE ROW LEVEL SECURITY;
ALTER TABLE pages              FORCE ROW LEVEL SECURITY;
ALTER TABLE tenant_events      FORCE ROW LEVEL SECURITY;

-- Drop existing policies (idempotent-ish)
DO $$
BEGIN
  -- content_definitions
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='content_definitions') THEN
    EXECUTE 'DROP POLICY IF EXISTS tenant_isolation_select ON content_definitions';
    EXECUTE 'DROP POLICY IF EXISTS tenant_isolation_insert ON content_definitions';
    EXECUTE 'DROP POLICY IF EXISTS tenant_isolation_update ON content_definitions';
    EXECUTE 'DROP POLICY IF EXISTS tenant_isolation_delete ON content_definitions';
  END IF;

  -- content_entries
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='content_entries') THEN
    EXECUTE 'DROP POLICY IF EXISTS tenant_isolation_select ON content_entries';
    EXECUTE 'DROP POLICY IF EXISTS tenant_isolation_insert ON content_entries';
    EXECUTE 'DROP POLICY IF EXISTS tenant_isolation_update ON content_entries';
    EXECUTE 'DROP POLICY IF EXISTS tenant_isolation_delete ON content_entries';
  END IF;

  -- pages
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='pages') THEN
    EXECUTE 'DROP POLICY IF EXISTS tenant_isolation_select ON pages';
    EXECUTE 'DROP POLICY IF EXISTS tenant_isolation_insert ON pages';
    EXECUTE 'DROP POLICY IF EXISTS tenant_isolation_update ON pages';
    EXECUTE 'DROP POLICY IF EXISTS tenant_isolation_delete ON pages';
  END IF;

  -- tenant_events
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='tenant_events') THEN
    EXECUTE 'DROP POLICY IF EXISTS tenant_isolation_select ON tenant_events';
    EXECUTE 'DROP POLICY IF EXISTS tenant_isolation_insert ON tenant_events';
    EXECUTE 'DROP POLICY IF EXISTS tenant_isolation_update ON tenant_events';
    EXECUTE 'DROP POLICY IF EXISTS tenant_isolation_delete ON tenant_events';
  END IF;
END$$;
shoud  tenant_events pages content_entries content_definitions be entities in nestjs
-- Helper expression used in policies:
-- tenant_id = current_setting('app.tenant_id', true)::uuid
-- If setting is NULL, comparison yields NULL -> treated as false.

-- content_definitions policies
CREATE POLICY tenant_isolation_select ON content_definitions
  FOR SELECT USING (tenant_id = current_setting('app.tenant_id', true)::uuid);

CREATE POLICY tenant_isolation_insert ON content_definitions
  FOR INSERT WITH CHECK (tenant_id = current_setting('app.tenant_id', true)::uuid);

CREATE POLICY tenant_isolation_update ON content_definitions
  FOR UPDATE USING (tenant_id = current_setting('app.tenant_id', true)::uuid)
  WITH CHECK (tenant_id = current_setting('app.tenant_id', true)::uuid);

CREATE POLICY tenant_isolation_delete ON content_definitions
  FOR DELETE USING (tenant_id = current_setting('app.tenant_id', true)::uuid);

-- content_entries policies
CREATE POLICY tenant_isolation_select ON content_entries
  FOR SELECT USING (tenant_id = current_setting('app.tenant_id', true)::uuid);

CREATE POLICY tenant_isolation_insert ON content_entries
  FOR INSERT WITH CHECK (tenant_id = current_setting('app.tenant_id', true)::uuid);

CREATE POLICY tenant_isolation_update ON content_entries
  FOR UPDATE USING (tenant_id = current_setting('app.tenant_id', true)::uuid)
  WITH CHECK (tenant_id = current_setting('app.tenant_id', true)::uuid);

CREATE POLICY tenant_isolation_delete ON content_entries
  FOR DELETE USING (tenant_id = current_setting('app.tenant_id', true)::uuid);

-- pages policies
CREATE POLICY tenant_isolation_select ON pages
  FOR SELECT USING (tenant_id = current_setting('app.tenant_id', true)::uuid);

CREATE POLICY tenant_isolation_insert ON pages
  FOR INSERT WITH CHECK (tenant_id = current_setting('app.tenant_id', true)::uuid);

CREATE POLICY tenant_isolation_update ON pages
  FOR UPDATE USING (tenant_id = current_setting('app.tenant_id', true)::uuid)
  WITH CHECK (tenant_id = current_setting('app.tenant_id', true)::uuid);

CREATE POLICY tenant_isolation_delete ON pages
  FOR DELETE USING (tenant_id = current_setting('app.tenant_id', true)::uuid);

-- tenant_events policies
CREATE POLICY tenant_isolation_select ON tenant_events
  FOR SELECT USING (tenant_id = current_setting('app.tenant_id', true)::uuid);

CREATE POLICY tenant_isolation_insert ON tenant_events
  FOR INSERT WITH CHECK (tenant_id = current_setting('app.tenant_id', true)::uuid);

CREATE POLICY tenant_isolation_update ON tenant_events
  FOR UPDATE USING (tenant_id = current_setting('app.tenant_id', true)::uuid)
  WITH CHECK (tenant_id = current_setting('app.tenant_id', true)::uuid);

CREATE POLICY tenant_isolation_delete ON tenant_events
  FOR DELETE USING (tenant_id = current_setting('app.tenant_id', true)::uuid);

-- ------------------------------------------------------------
-- Ownership + Grants (optional)
-- ------------------------------------------------------------
ALTER TABLE users              OWNER TO swish_owner;
ALTER TABLE tenants            OWNER TO swish_owner;
ALTER TABLE memberships        OWNER TO swish_owner;
ALTER TABLE content_definitions OWNER TO swish_owner;
ALTER TABLE content_entries    OWNER TO swish_owner;
ALTER TABLE pages              OWNER TO swish_owner;
ALTER TABLE tenant_events      OWNER TO swish_owner;

GRANT USAGE ON SCHEMA public TO swish_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON users TO swish_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON tenants TO swish_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON memberships TO swish_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON content_definitions TO swish_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON content_entries TO swish_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON pages TO swish_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON tenant_events TO swish_app;

-- ------------------------------------------------------------
-- Seed data (arbitrary)
-- Note: Because tenant tables FORCE RLS, we set app.tenant_id
-- per-tenant in transactions to seed safely.
-- ------------------------------------------------------------

-- Users
INSERT INTO users (id, email, password_hash)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'owner@acme.com',   '$2b$10$fakehash_owner'),
  ('22222222-2222-2222-2222-222222222222', 'editor@acme.com',  '$2b$10$fakehash_editor'),
  ('33333333-3333-3333-3333-333333333333', 'owner@bravo.com',  '$2b$10$fakehash_owner2')
ON CONFLICT (email) DO NOTHING;

-- Tenants
INSERT INTO tenants (id, subdomain, name, settings)
VALUES
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'acme',
    'Acme Co',
    '{
      "logo": "/logos/acme.svg",
      "brand": { "primaryColor": "#111827", "font": "inter" },
      "navigation": [
        { "title": "Home", "slug": "home" },
        { "title": "About", "slug": "about" }
      ],
      "flags": { "blogEnabled": true }
    }'::jsonb
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'bravo',
    'Bravo Studio',
    '{
      "logo": "/logos/bravo.svg",
      "brand": { "primaryColor": "#0f172a", "font": "inter" },
      "navigation": [
        { "title": "Home", "slug": "home" },
        { "title": "About", "slug": "about" }
      ],
      "flags": { "blogEnabled": true }
    }'::jsonb
  )
ON CONFLICT (subdomain) DO NOTHING;

-- Memberships
INSERT INTO memberships (user_id, tenant_id, role)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'OWNER'),
  ('22222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'EDITOR'),
  ('33333333-3333-3333-3333-333333333333', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'OWNER')
ON CONFLICT (user_id, tenant_id) DO NOTHING;

-- ------------------------------------------------------------
-- Tenant: ACME (seed posts content type, entries, pages, events)
-- ------------------------------------------------------------
DO $$
BEGIN
  -- Seed content_definitions within tenant context (RLS requires it)
END$$;

BEGIN;
  SET LOCAL app.tenant_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

  -- Content definition: posts
  INSERT INTO content_definitions (id, tenant_id, slug, name, schema)
  VALUES
  (
    'c0c0c0c0-0000-0000-0000-000000000001',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'posts',
    'Post',
    '{
      "type": "object",
      "required": ["title", "excerpt", "bodyHtml"],
      "properties": {
        "title":    { "type": "string", "minLength": 1, "maxLength": 140 },
        "excerpt":  { "type": "string", "minLength": 1, "maxLength": 300 },
        "bodyHtml": { "type": "string", "minLength": 1, "maxLength": 20000 },
        "coverImageUrl": { "type": "string", "maxLength": 2048 }
      },
      "additionalProperties": false
    }'::jsonb
  )
  ON CONFLICT (tenant_id, slug) DO NOTHING;

  -- Published entry: hello-world
  INSERT INTO content_entries (id, tenant_id, definition_id, slug, data, is_published, published_at)
  VALUES
  (
    'e0e0e0e0-0000-0000-0000-000000000001',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'c0c0c0c0-0000-0000-0000-000000000001',
    'hello-world',
    '{
      "title": "Hello World",
      "excerpt": "Welcome to Acme’s brand new Swish site.",
      "bodyHtml": "<p>This is the first post on Acme. You can edit content from the tenant dashboard.</p>",
      "coverImageUrl": "/images/hello-world.jpg"
    }'::jsonb,
    TRUE,
    now()
  )
  ON CONFLICT (tenant_id, definition_id, slug) DO NOTHING;

  -- Draft entry
  INSERT INTO content_entries (id, tenant_id, definition_id, slug, data, is_published, published_at)
  VALUES
  (
    'e0e0e0e0-0000-0000-0000-000000000002',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'c0c0c0c0-0000-0000-0000-000000000001',
    'roadmap',
    '{
      "title": "Roadmap",
      "excerpt": "What we’re building next.",
      "bodyHtml": "<p>This is a draft post. Publish it when ready.</p>"
    }'::jsonb,
    FALSE,
    NULL
  )
  ON CONFLICT (tenant_id, definition_id, slug) DO NOTHING;

  -- Pages
  INSERT INTO pages (id, tenant_id, slug, title, components)
  VALUES
  (
    'p0p0p0p0-0000-0000-0000-000000000001',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'home',
    'Home',
    '[
      { "type": "Hero", "props": { "title": "Acme Co", "subtitle": "Built with Swish", "imageUrl": "/hero/acme.png" } },
      { "type": "PostGrid", "props": { "contentTypeSlug": "posts", "limit": 6, "sort": "newest" } }
    ]'::jsonb
  ),
  (
    'p0p0p0p0-0000-0000-0000-000000000002',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'about',
    'About',
    '[
      { "type": "Hero", "props": { "title": "About Acme", "subtitle": "We ship quality widgets.", "imageUrl": "/hero/about.png" } },
      { "type": "RichText", "props": { "html": "<p>Acme is a fictional company used for demos.</p>" } },
      { "type": "FeatureList", "props": { "items": [
        { "icon": "sparkles", "title": "Fast", "text": "Launch in minutes." },
        { "icon": "shield",   "title": "Safe", "text": "RLS-enforced tenant isolation." },
        { "icon": "layout",   "title": "Flexible", "text": "JSON component-based pages." }
      ] } }
    ]'::jsonb
  )
  ON CONFLICT (tenant_id, slug) DO NOTHING;

  -- Events
  INSERT INTO tenant_events (tenant_id, actor_user_id, type, payload)
  VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'TENANT_CREATED', '{"subdomain":"acme"}'::jsonb),
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'CONTENT_PUBLISHED', '{"type":"posts","slug":"hello-world"}'::jsonb),
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-2222-2222-2222-222222222222', 'MEMBER_ADDED', '{"userEmail":"editor@acme.com","role":"EDITOR"}'::jsonb);

COMMIT;

-- ------------------------------------------------------------
-- Tenant: BRAVO (seed posts, entry, home page)
-- ------------------------------------------------------------
BEGIN;
  SET LOCAL app.tenant_id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';

  INSERT INTO content_definitions (id, tenant_id, slug, name, schema)
  VALUES
  (
    'c0c0c0c0-0000-0000-0000-000000000002',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'posts',
    'Post',
    '{
      "type": "object",
      "required": ["title", "bodyHtml"],
      "properties": {
        "title": { "type": "string", "minLength": 1, "maxLength": 140 },
        "bodyHtml": { "type": "string", "minLength": 1, "maxLength": 20000 }
      },
      "additionalProperties": false
    }'::jsonb
  )
  ON CONFLICT (tenant_id, slug) DO NOTHING;

  INSERT INTO content_entries (id, tenant_id, definition_id, slug, data, is_published, published_at)
  VALUES
  (
    'e0e0e0e0-0000-0000-0000-000000000003',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'c0c0c0c0-0000-0000-0000-000000000002',
    'welcome',
    '{
      "title": "Welcome to Bravo",
      "bodyHtml": "<p>Bravo Studio launches their new site on Swish.</p>"
    }'::jsonb,
    TRUE,
    now()
  )
  ON CONFLICT (tenant_id, definition_id, slug) DO NOTHING;

  INSERT INTO pages (id, tenant_id, slug, title, components)
  VALUES
  (
    'p0p0p0p0-0000-0000-0000-000000000003',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'home',
    'Home',
    '[
      { "type": "Hero", "props": { "title": "Bravo Studio", "subtitle": "Design. Build. Launch.", "imageUrl": "/hero/bravo.png" } },
      { "type": "PostGrid", "props": { "contentTypeSlug": "posts", "limit": 3, "sort": "newest" } }
    ]'::jsonb
  )
  ON CONFLICT (tenant_id, slug) DO NOTHING;

  INSERT INTO tenant_events (tenant_id, actor_user_id, type, payload)
  VALUES
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '33333333-3333-3333-3333-333333333333', 'TENANT_CREATED', '{"subdomain":"bravo"}'::jsonb),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '33333333-3333-3333-3333-333333333333', 'CONTENT_PUBLISHED', '{"type":"posts","slug":"welcome"}'::jsonb);

COMMIT;

-- ------------------------------------------------------------
-- Quick sanity checks (optional examples)
-- ------------------------------------------------------------
-- Expect 0 rows if tenant context is not set:
--   RESET app.tenant_id;
--   SELECT * FROM pages;  -- returns 0 due to RLS

-- Expect only ACME rows when app.tenant_id is ACME:
--   BEGIN;
--   SET LOCAL app.tenant_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
--   SELECT tenant_id, slug FROM pages ORDER BY slug; -- only acme pages
--   COMMIT;

COMMIT;