import { MigrationInterface, QueryRunner } from 'typeorm';

const RESERVED_SUBDOMAINS = [
  'www',
  'app',
  'api',
  'admin',
  'static',
  'assets',
  'cdn',
  'mail',
  'swish',
  'root',
  'support',
  'help',
  'docs',
  'status',
  'login',
  'auth',
  'signup',
  'register',
  'dashboard',
  'portal',
  'account',
  'accounts',
  'billing',
  'payments',
  'checkout',
  'secure',
  'webmail',
  'ftp',
  'smtp',
  'imap',
  'pop',
  'mx',
  'dns',
  'ns1',
  'ns2',
  'dev',
  'test',
  'staging',
  'stage',
  'prod',
  'production',
  'beta',
  'preview',
  'demo',
  'internal',
  'console',
  'manage',
  'management',
  'system',
  'core',
  'proxy',
  'gateway',
  'edge',
  'origin',
  'cache',
  'monitor',
  'metrics',
  'logs',
  'telemetry',
  'analytics',
  'images',
  'media',
  'files',
  'uploads',
  'storage',
  'db',
  'database',
] as const;

export class ExpandReservedTenantSubdomains1774552200000
  implements MigrationInterface
{
  name = 'ExpandReservedTenantSubdomains1774552200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const conflictingTenants = await queryRunner.query(
      `
        SELECT id, subdomain
        FROM "tenants"
        WHERE subdomain = ANY($1)
        ORDER BY subdomain ASC, id ASC
      `,
      [RESERVED_SUBDOMAINS],
    );

    if (conflictingTenants.length > 0) {
      const details = conflictingTenants
        .map((tenant: { id: string; subdomain: string }) => `${tenant.subdomain} (${tenant.id})`)
        .join(', ');

      throw new Error(
        `Cannot reserve new tenant subdomains until existing tenants are renamed. Conflicts: ${details}`,
      );
    }

    await queryRunner.query(`
      ALTER TABLE "tenants"
      DROP CONSTRAINT IF EXISTS "CHK_35eef5418e8cd0d0f4ff84ea8a"
    `);
    await queryRunner.query(`
      ALTER TABLE "tenants"
      DROP CONSTRAINT IF EXISTS "CHK_tenants_reserved_subdomains"
    `);
    await queryRunner.query(`
      ALTER TABLE "tenants"
      ADD CONSTRAINT "CHK_tenants_reserved_subdomains"
      CHECK (
        "subdomain" NOT IN (${RESERVED_SUBDOMAINS.map((value) => `'${value}'`).join(',')})
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "tenants"
      DROP CONSTRAINT IF EXISTS "CHK_tenants_reserved_subdomains"
    `);
    await queryRunner.query(`
      ALTER TABLE "tenants"
      ADD CONSTRAINT "CHK_35eef5418e8cd0d0f4ff84ea8a"
      CHECK (
        "subdomain" NOT IN ('www','app','api','admin','static','assets','cdn','mail')
      )
    `);
  }
}
