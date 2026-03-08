import dataSource from '../data-source';

const sharedStatements = [
  `
    INSERT INTO users (id, first_name, last_name, email, password_hash)
    VALUES
      ('11111111-1111-1111-1111-111111111111', 'Acme', 'Owner', 'owner@acme.com', '$2b$10$fakehash_owner'),
      ('22222222-2222-2222-2222-222222222222', 'Acme', 'Editor', 'editor@acme.com', '$2b$10$fakehash_editor'),
      ('33333333-3333-3333-3333-333333333333', 'Bravo', 'Owner', 'owner@bravo.com', '$2b$10$fakehash_owner2'),
      ('44444444-4444-4444-4444-444444444444', 'Bravo', 'Editor', 'editor@bravo.com', '$2b$10$fakehash_editor2')
    ON CONFLICT (email) DO UPDATE
    SET
      first_name = EXCLUDED.first_name,
      last_name = EXCLUDED.last_name,
      password_hash = EXCLUDED.password_hash
  `,
  `
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
            { "title": "About", "slug": "about" },
            { "title": "Blog", "slug": "blog" },
            { "title": "Contact", "slug": "contact" }
          ],
          "flags": { "blogEnabled": true, "caseStudiesEnabled": true }
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
            { "title": "About", "slug": "about" },
            { "title": "Work", "slug": "work" }
          ],
          "flags": { "blogEnabled": true, "projectsEnabled": true }
        }'::jsonb
      )
    ON CONFLICT (subdomain) DO UPDATE
    SET
      name = EXCLUDED.name,
      settings = EXCLUDED.settings
  `,
  `
    INSERT INTO memberships (user_id, tenant_id, role)
    VALUES
      ('11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'OWNER'),
      ('22222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'EDITOR'),
      ('33333333-3333-3333-3333-333333333333', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'OWNER'),
      ('44444444-4444-4444-4444-444444444444', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'EDITOR')
    ON CONFLICT (user_id, tenant_id) DO UPDATE
    SET role = EXCLUDED.role
  `,
] as const;

const acmeStatements = [
  `
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
            "title": { "type": "string", "minLength": 1, "maxLength": 140 },
            "excerpt": { "type": "string", "minLength": 1, "maxLength": 300 },
            "bodyHtml": { "type": "string", "minLength": 1, "maxLength": 20000 },
            "coverImageUrl": { "type": "string", "maxLength": 2048 }
          },
          "additionalProperties": false
        }'::jsonb
      ),
      (
        'c0c0c0c0-0000-0000-0000-000000000011',
        'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        'case-studies',
        'Case Study',
        '{
          "type": "object",
          "required": ["title", "summary", "bodyHtml", "client"],
          "properties": {
            "title": { "type": "string", "minLength": 1, "maxLength": 140 },
            "summary": { "type": "string", "minLength": 1, "maxLength": 300 },
            "client": { "type": "string", "minLength": 1, "maxLength": 140 },
            "bodyHtml": { "type": "string", "minLength": 1, "maxLength": 20000 },
            "metrics": {
              "type": "array",
              "items": {
                "type": "object",
                "required": ["label", "value"],
                "properties": {
                  "label": { "type": "string" },
                  "value": { "type": "string" }
                },
                "additionalProperties": false
              }
            }
          },
          "additionalProperties": false
        }'::jsonb
      )
    ON CONFLICT (tenant_id, slug) DO UPDATE
    SET
      name = EXCLUDED.name,
      schema = EXCLUDED.schema
  `,
  `
    INSERT INTO content_entries (id, tenant_id, definition_id, slug, data, is_published, published_at)
    VALUES
      (
        'e0e0e0e0-0000-0000-0000-000000000001',
        'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        'c0c0c0c0-0000-0000-0000-000000000001',
        'hello-world',
        '{
          "title": "Hello World",
          "excerpt": "Welcome to the new Acme Swish site.",
          "bodyHtml": "<p>This is the first post on Acme. You can edit content from the tenant dashboard.</p>",
          "coverImageUrl": "/images/hello-world.jpg"
        }'::jsonb,
        TRUE,
        now()
      ),
      (
        'e0e0e0e0-0000-0000-0000-000000000002',
        'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        'c0c0c0c0-0000-0000-0000-000000000001',
        'roadmap',
        '{
          "title": "Roadmap",
          "excerpt": "What we are building next.",
          "bodyHtml": "<p>This is a draft post. Publish it when ready.</p>"
        }'::jsonb,
        FALSE,
        NULL
      ),
      (
        'e0e0e0e0-0000-0000-0000-000000000004',
        'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        'c0c0c0c0-0000-0000-0000-000000000001',
        'launch-checklist',
        '{
          "title": "Launch Checklist",
          "excerpt": "A repeatable list for shipping new tenant sites.",
          "bodyHtml": "<p>Review content, verify SEO metadata, confirm published pages, and run smoke tests before launch.</p>",
          "coverImageUrl": "/images/launch-checklist.jpg"
        }'::jsonb,
        TRUE,
        now()
      ),
      (
        'e0e0e0e0-0000-0000-0000-000000000011',
        'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        'c0c0c0c0-0000-0000-0000-000000000011',
        'rocket-redesign',
        '{
          "title": "Rocket Redesign",
          "summary": "How Acme refreshed its launch funnel in two weeks.",
          "client": "Acme Internal Ventures",
          "bodyHtml": "<p>The redesign improved conversions by simplifying navigation and moving proof points above the fold.</p>",
          "metrics": [
            { "label": "Conversion lift", "value": "+18%" },
            { "label": "Build time", "value": "2 weeks" }
          ]
        }'::jsonb,
        TRUE,
        now()
      )
    ON CONFLICT (tenant_id, definition_id, slug) DO UPDATE
    SET
      data = EXCLUDED.data,
      is_published = EXCLUDED.is_published,
      published_at = EXCLUDED.published_at
  `,
  `
    INSERT INTO pages (id, tenant_id, slug, title, components)
    VALUES
      (
        'f0f0f0f0-0000-0000-0000-000000000001',
        'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        'home',
        'Home',
        '[
          { "type": "Hero", "props": { "title": "Acme Co", "subtitle": "Built with Swish", "imageUrl": "/hero/acme.png" } },
          { "type": "StatStrip", "props": { "items": [
            { "label": "Sites launched", "value": "24" },
            { "label": "Avg. publish time", "value": "8 min" },
            { "label": "Tenant uptime", "value": "99.9%" }
          ] } },
          { "type": "PostGrid", "props": { "contentTypeSlug": "posts", "limit": 6, "sort": "newest" } }
        ]'::jsonb
      ),
      (
        'f0f0f0f0-0000-0000-0000-000000000002',
        'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        'about',
        'About',
        '[
          { "type": "Hero", "props": { "title": "About Acme", "subtitle": "We ship quality widgets.", "imageUrl": "/hero/about.png" } },
          { "type": "RichText", "props": { "html": "<p>Acme is a fictional company used for demos.</p>" } },
          { "type": "FeatureList", "props": { "items": [
            { "icon": "sparkles", "title": "Fast", "text": "Launch in minutes." },
            { "icon": "shield", "title": "Safe", "text": "RLS-enforced tenant isolation." },
            { "icon": "layout", "title": "Flexible", "text": "JSON component-based pages." }
          ] } }
        ]'::jsonb
      ),
      (
        'f0f0f0f0-0000-0000-0000-000000000004',
        'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        'blog',
        'Blog',
        '[
          { "type": "SectionHeading", "props": { "title": "Latest Writing", "eyebrow": "Journal" } },
          { "type": "PostGrid", "props": { "contentTypeSlug": "posts", "limit": 12, "sort": "newest" } }
        ]'::jsonb
      ),
      (
        'f0f0f0f0-0000-0000-0000-000000000005',
        'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        'contact',
        'Contact',
        '[
          { "type": "Hero", "props": { "title": "Talk to Acme", "subtitle": "Questions, demos, or support requests.", "imageUrl": "/hero/contact.png" } },
          { "type": "ContactCard", "props": { "email": "hello@acme.com", "phone": "+1-555-0100", "hours": "Mon-Fri 09:00-17:00" } }
        ]'::jsonb
      )
    ON CONFLICT (tenant_id, slug) DO UPDATE
    SET
      title = EXCLUDED.title,
      components = EXCLUDED.components
  `,
  `
    INSERT INTO tenant_events (id, tenant_id, actor_user_id, type, payload)
    VALUES
      (
        'd0d0d0d0-0000-0000-0000-000000000001',
        'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        '11111111-1111-1111-1111-111111111111',
        'TENANT_CREATED',
        '{"subdomain":"acme"}'::jsonb
      ),
      (
        'd0d0d0d0-0000-0000-0000-000000000002',
        'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        '11111111-1111-1111-1111-111111111111',
        'CONTENT_PUBLISHED',
        '{"type":"posts","slug":"hello-world"}'::jsonb
      ),
      (
        'd0d0d0d0-0000-0000-0000-000000000003',
        'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        '22222222-2222-2222-2222-222222222222',
        'MEMBER_ADDED',
        '{"userEmail":"editor@acme.com","role":"EDITOR"}'::jsonb
      ),
      (
        'd0d0d0d0-0000-0000-0000-000000000004',
        'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        '11111111-1111-1111-1111-111111111111',
        'PAGE_UPDATED',
        '{"slug":"home","components":["Hero","StatStrip","PostGrid"]}'::jsonb
      )
    ON CONFLICT (id) DO UPDATE
    SET
      type = EXCLUDED.type,
      payload = EXCLUDED.payload,
      actor_user_id = EXCLUDED.actor_user_id
  `,
] as const;

const bravoStatements = [
  `
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
            "bodyHtml": { "type": "string", "minLength": 1, "maxLength": 20000 },
            "coverImageUrl": { "type": "string", "maxLength": 2048 }
          },
          "additionalProperties": false
        }'::jsonb
      ),
      (
        'c0c0c0c0-0000-0000-0000-000000000022',
        'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        'projects',
        'Project',
        '{
          "type": "object",
          "required": ["title", "summary", "services"],
          "properties": {
            "title": { "type": "string", "minLength": 1, "maxLength": 140 },
            "summary": { "type": "string", "minLength": 1, "maxLength": 300 },
            "services": {
              "type": "array",
              "items": { "type": "string" }
            },
            "bodyHtml": { "type": "string", "maxLength": 20000 }
          },
          "additionalProperties": false
        }'::jsonb
      )
    ON CONFLICT (tenant_id, slug) DO UPDATE
    SET
      name = EXCLUDED.name,
      schema = EXCLUDED.schema
  `,
  `
    INSERT INTO content_entries (id, tenant_id, definition_id, slug, data, is_published, published_at)
    VALUES
      (
        'e0e0e0e0-0000-0000-0000-000000000003',
        'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        'c0c0c0c0-0000-0000-0000-000000000002',
        'welcome',
        '{
          "title": "Welcome to Bravo",
          "bodyHtml": "<p>Bravo Studio launches their new site on Swish.</p>",
          "coverImageUrl": "/images/bravo-welcome.jpg"
        }'::jsonb,
        TRUE,
        now()
      ),
      (
        'e0e0e0e0-0000-0000-0000-000000000005',
        'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        'c0c0c0c0-0000-0000-0000-000000000002',
        'spring-release',
        '{
          "title": "Spring Release",
          "bodyHtml": "<p>Bravo shipped a refreshed design system and a faster editorial workflow.</p>",
          "coverImageUrl": "/images/spring-release.jpg"
        }'::jsonb,
        TRUE,
        now()
      ),
      (
        'e0e0e0e0-0000-0000-0000-000000000022',
        'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        'c0c0c0c0-0000-0000-0000-000000000022',
        'neon-rebrand',
        '{
          "title": "Neon Rebrand",
          "summary": "A crisp identity system for a product launch.",
          "services": ["Brand", "Web", "Motion"],
          "bodyHtml": "<p>The team delivered a modular launch site with reusable campaign sections and editor-friendly content models.</p>"
        }'::jsonb,
        TRUE,
        now()
      )
    ON CONFLICT (tenant_id, definition_id, slug) DO UPDATE
    SET
      data = EXCLUDED.data,
      is_published = EXCLUDED.is_published,
      published_at = EXCLUDED.published_at
  `,
  `
    INSERT INTO pages (id, tenant_id, slug, title, components)
    VALUES
      (
        'f0f0f0f0-0000-0000-0000-000000000003',
        'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        'home',
        'Home',
        '[
          { "type": "Hero", "props": { "title": "Bravo Studio", "subtitle": "Design. Build. Launch.", "imageUrl": "/hero/bravo.png" } },
          { "type": "PostGrid", "props": { "contentTypeSlug": "posts", "limit": 3, "sort": "newest" } },
          { "type": "LogoCloud", "props": { "items": ["Northstar", "Parallel", "Elm", "Cinder"] } }
        ]'::jsonb
      ),
      (
        'f0f0f0f0-0000-0000-0000-000000000006',
        'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        'about',
        'About',
        '[
          { "type": "Hero", "props": { "title": "Small team, sharp execution", "subtitle": "Product-minded design and engineering.", "imageUrl": "/hero/bravo-about.png" } },
          { "type": "TeamList", "props": { "members": [
            { "name": "Lina", "role": "Creative Director" },
            { "name": "Noah", "role": "Lead Engineer" },
            { "name": "Ava", "role": "Producer" }
          ] } }
        ]'::jsonb
      ),
      (
        'f0f0f0f0-0000-0000-0000-000000000007',
        'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        'work',
        'Work',
        '[
          { "type": "SectionHeading", "props": { "title": "Selected Projects", "eyebrow": "Portfolio" } },
          { "type": "CollectionGrid", "props": { "contentTypeSlug": "projects", "limit": 6, "sort": "newest" } }
        ]'::jsonb
      )
    ON CONFLICT (tenant_id, slug) DO UPDATE
    SET
      title = EXCLUDED.title,
      components = EXCLUDED.components
  `,
  `
    INSERT INTO tenant_events (id, tenant_id, actor_user_id, type, payload)
    VALUES
      (
        'd0d0d0d0-0000-0000-0000-000000000011',
        'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        '33333333-3333-3333-3333-333333333333',
        'TENANT_CREATED',
        '{"subdomain":"bravo"}'::jsonb
      ),
      (
        'd0d0d0d0-0000-0000-0000-000000000012',
        'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        '33333333-3333-3333-3333-333333333333',
        'CONTENT_PUBLISHED',
        '{"type":"posts","slug":"welcome"}'::jsonb
      ),
      (
        'd0d0d0d0-0000-0000-0000-000000000013',
        'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        '44444444-4444-4444-4444-444444444444',
        'MEMBER_ADDED',
        '{"userEmail":"editor@bravo.com","role":"EDITOR"}'::jsonb
      ),
      (
        'd0d0d0d0-0000-0000-0000-000000000014',
        'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        '33333333-3333-3333-3333-333333333333',
        'CONTENT_PUBLISHED',
        '{"type":"projects","slug":"neon-rebrand"}'::jsonb
      )
    ON CONFLICT (id) DO UPDATE
    SET
      type = EXCLUDED.type,
      payload = EXCLUDED.payload,
      actor_user_id = EXCLUDED.actor_user_id
  `,
] as const;

async function runStatements() {
  const queryRunner = dataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    for (const statement of sharedStatements) {
      await queryRunner.query(statement);
    }

    await queryRunner.query(
      `SET LOCAL app.tenant_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'`,
    );
    for (const statement of acmeStatements) {
      await queryRunner.query(statement);
    }

    await queryRunner.query(
      `SET LOCAL app.tenant_id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'`,
    );
    for (const statement of bravoStatements) {
      await queryRunner.query(statement);
    }

    await queryRunner.commitTransaction();
    console.log(
      'Seed complete: users, tenants, memberships, content, pages, and events.',
    );
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
}

async function bootstrap() {
  await dataSource.initialize();

  try {
    await runStatements();
  } finally {
    await dataSource.destroy();
  }
}

bootstrap().catch((error: unknown) => {
  console.error('Seed failed.');
  console.error(error);
  process.exit(1);
});
