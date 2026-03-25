import dataSource from '../data-source';

const sharedStatements = [
  `
    INSERT INTO users (id, first_name, last_name, email, password_hash)
    VALUES
      ('11111111-1111-1111-1111-111111111111', 'Acme', 'Owner', 'owner@acme.com', '$2b$10$Eqxz2bWJPWMHgDraffq97uM28RBYVcTb8G2DXJQl.l8bMP4zUQ0iO'),
      ('22222222-2222-2222-2222-222222222222', 'Acme', 'Editor', 'editor@acme.com', '$2b$10$D7sGwIFd4cdAUtl39XYJhugKu5ji7D03TVhPSevGzvLLGUawOy1zG'),
      ('33333333-3333-3333-3333-333333333333', 'Bravo', 'Owner', 'owner@bravo.com', '$2b$10$ggGLl6iiMk0jqoiitey4wesbW.Pzs8hrbMx.scPdcmrOmvduPzpPC'),
      ('44444444-4444-4444-4444-444444444444', 'Bravo', 'Editor', 'editor@bravo.com', '$2b$10$MYNVYawyQbCJrMbf7lCYgeJRY48Byi/v0LNHrfao46ablm50Gpc..')
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
] as const;

const acmeStatements = [
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
          { "type": "PostGrid", "props": { "items": [
            { "title": "Hello World", "excerpt": "Welcome to the new Acme Swish site." },
            { "title": "Roadmap", "excerpt": "What we are building next." },
            { "title": "Launch Checklist", "excerpt": "A repeatable list for shipping new tenant sites." }
          ] } }
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
          { "type": "PostGrid", "props": { "items": [
            { "title": "Hello World", "excerpt": "Welcome to the new Acme Swish site." },
            { "title": "Launch Checklist", "excerpt": "A repeatable list for shipping new tenant sites." }
          ] } }
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
] as const;

const bravoStatements = [
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
          { "type": "PostGrid", "props": { "items": [
            { "title": "Welcome to Bravo", "excerpt": "Bravo Studio launches their new site on Swish." },
            { "title": "Spring Release", "excerpt": "Bravo shipped a refreshed design system and a faster editorial workflow." }
          ] } },
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
          { "type": "CollectionGrid", "props": { "items": [
            { "title": "Neon Rebrand", "summary": "A crisp identity system for a product launch." }
          ] } }
        ]'::jsonb
      )
    ON CONFLICT (tenant_id, slug) DO UPDATE
    SET
      title = EXCLUDED.title,
      components = EXCLUDED.components
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
    console.log('Seed complete: users, tenants, pages, and components.');
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
