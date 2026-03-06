import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1772834366143 implements MigrationInterface {
    name = 'Init1772834366143'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tenants" DROP CONSTRAINT "CHK_35eef5418e8cd0d0f4ff84ea8a"`);
        await queryRunner.query(`ALTER TABLE "tenants" DROP CONSTRAINT "UQ_21bb89e012fa5b58532009c1601"`);
        await queryRunner.query(`ALTER TABLE "tenants" DROP COLUMN "subdomain"`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD "subdomain" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD CONSTRAINT "UQ_21bb89e012fa5b58532009c1601" UNIQUE ("subdomain")`);
        await queryRunner.query(`ALTER TABLE "tenants" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenants" ALTER COLUMN "settings" SET DEFAULT '{}'::jsonb`);
        await queryRunner.query(`ALTER TABLE "tenant_events" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "tenant_events" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenant_events" ALTER COLUMN "payload" SET DEFAULT '{}'::jsonb`);
        await queryRunner.query(`ALTER TABLE "pages" DROP CONSTRAINT "pages_unique_per_tenant"`);
        await queryRunner.query(`ALTER TABLE "pages" DROP CONSTRAINT "CHK_3050dbd0af6a5e40c043408516"`);
        await queryRunner.query(`ALTER TABLE "pages" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "pages" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pages" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "pages" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pages" ALTER COLUMN "components" SET DEFAULT '{}'::jsonb`);
        await queryRunner.query(`ALTER TABLE "content_entries" DROP CONSTRAINT "content_entries_unique_per_type"`);
        await queryRunner.query(`ALTER TABLE "content_entries" DROP CONSTRAINT "CHK_0347c061f36032c01292bd1578"`);
        await queryRunner.query(`ALTER TABLE "content_entries" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "content_entries" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "content_entries" ALTER COLUMN "data" SET DEFAULT '{}'::jsonb`);
        await queryRunner.query(`ALTER TABLE "content_definitions" DROP CONSTRAINT "content_definitions_unique_per_tenant"`);
        await queryRunner.query(`ALTER TABLE "content_definitions" DROP CONSTRAINT "CHK_8752224e86324a1a3649499b91"`);
        await queryRunner.query(`ALTER TABLE "content_definitions" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "content_definitions" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "content_definitions" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "content_definitions" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD CONSTRAINT "CHK_35eef5418e8cd0d0f4ff84ea8a" CHECK ("subdomain" NOT IN ('www','app','api','admin','static','assets','cdn','mail'))`);
        await queryRunner.query(`ALTER TABLE "pages" ADD CONSTRAINT "CHK_3050dbd0af6a5e40c043408516" CHECK ("slug" ~ '^[a-z0-9-]+$')`);
        await queryRunner.query(`ALTER TABLE "content_entries" ADD CONSTRAINT "CHK_0347c061f36032c01292bd1578" CHECK ("slug" ~ '^[a-z0-9-]+$')`);
        await queryRunner.query(`ALTER TABLE "content_definitions" ADD CONSTRAINT "CHK_8752224e86324a1a3649499b91" CHECK ("slug" ~ '^[a-z0-9-]+$')`);
        await queryRunner.query(`ALTER TABLE "pages" ADD CONSTRAINT "pages_unique_per_tenant" UNIQUE ("tenant_id", "slug")`);
        await queryRunner.query(`ALTER TABLE "content_entries" ADD CONSTRAINT "content_entries_unique_per_type" UNIQUE ("tenant_id", "definition_id", "slug")`);
        await queryRunner.query(`ALTER TABLE "content_definitions" ADD CONSTRAINT "content_definitions_unique_per_tenant" UNIQUE ("tenant_id", "slug")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "content_definitions" DROP CONSTRAINT "content_definitions_unique_per_tenant"`);
        await queryRunner.query(`ALTER TABLE "content_entries" DROP CONSTRAINT "content_entries_unique_per_type"`);
        await queryRunner.query(`ALTER TABLE "pages" DROP CONSTRAINT "pages_unique_per_tenant"`);
        await queryRunner.query(`ALTER TABLE "content_definitions" DROP CONSTRAINT "CHK_8752224e86324a1a3649499b91"`);
        await queryRunner.query(`ALTER TABLE "content_entries" DROP CONSTRAINT "CHK_0347c061f36032c01292bd1578"`);
        await queryRunner.query(`ALTER TABLE "pages" DROP CONSTRAINT "CHK_3050dbd0af6a5e40c043408516"`);
        await queryRunner.query(`ALTER TABLE "tenants" DROP CONSTRAINT "CHK_35eef5418e8cd0d0f4ff84ea8a"`);
        await queryRunner.query(`ALTER TABLE "content_definitions" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "content_definitions" ADD "name" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "content_definitions" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "content_definitions" ADD "slug" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "content_definitions" ADD CONSTRAINT "CHK_8752224e86324a1a3649499b91" CHECK ((slug ~ '^[a-z0-9-]+$'::text))`);
        await queryRunner.query(`ALTER TABLE "content_definitions" ADD CONSTRAINT "content_definitions_unique_per_tenant" UNIQUE ("tenant_id", "slug")`);
        await queryRunner.query(`ALTER TABLE "content_entries" ALTER COLUMN "data" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "content_entries" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "content_entries" ADD "slug" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "content_entries" ADD CONSTRAINT "CHK_0347c061f36032c01292bd1578" CHECK ((slug ~ '^[a-z0-9-]+$'::text))`);
        await queryRunner.query(`ALTER TABLE "content_entries" ADD CONSTRAINT "content_entries_unique_per_type" UNIQUE ("tenant_id", "definition_id", "slug")`);
        await queryRunner.query(`ALTER TABLE "pages" ALTER COLUMN "components" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "pages" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "pages" ADD "title" text NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "pages" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "pages" ADD "slug" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pages" ADD CONSTRAINT "CHK_3050dbd0af6a5e40c043408516" CHECK ((slug ~ '^[a-z0-9-]+$'::text))`);
        await queryRunner.query(`ALTER TABLE "pages" ADD CONSTRAINT "pages_unique_per_tenant" UNIQUE ("tenant_id", "slug")`);
        await queryRunner.query(`ALTER TABLE "tenant_events" ALTER COLUMN "payload" SET DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "tenant_events" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "tenant_events" ADD "type" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenants" ALTER COLUMN "settings" SET DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "tenants" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD "name" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenants" DROP CONSTRAINT "UQ_21bb89e012fa5b58532009c1601"`);
        await queryRunner.query(`ALTER TABLE "tenants" DROP COLUMN "subdomain"`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD "subdomain" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD CONSTRAINT "UQ_21bb89e012fa5b58532009c1601" UNIQUE ("subdomain")`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD CONSTRAINT "CHK_35eef5418e8cd0d0f4ff84ea8a" CHECK ((subdomain <> ALL (ARRAY['www'::text, 'app'::text, 'api'::text, 'admin'::text, 'static'::text, 'assets'::text, 'cdn'::text, 'mail'::text])))`);
    }

}
