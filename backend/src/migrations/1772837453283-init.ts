import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1772837453283 implements MigrationInterface {
    name = 'Init1772837453283'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."memberships_role_enum" AS ENUM('OWNER', 'EDITOR')`);
        await queryRunner.query(`CREATE TABLE "memberships" ("user_id" uuid NOT NULL, "tenant_id" uuid NOT NULL, "role" "public"."memberships_role_enum" NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "memberships_unique" UNIQUE ("user_id", "tenant_id"), CONSTRAINT "PK_7496a942c4958ee034f803461e8" PRIMARY KEY ("user_id", "tenant_id"))`);
        await queryRunner.query(`ALTER TABLE "tenants" ALTER COLUMN "settings" SET DEFAULT '{}'::jsonb`);
        await queryRunner.query(`ALTER TABLE "tenant_events" ALTER COLUMN "payload" SET DEFAULT '{}'::jsonb`);
        await queryRunner.query(`ALTER TABLE "pages" ALTER COLUMN "components" SET DEFAULT '{}'::jsonb`);
        await queryRunner.query(`ALTER TABLE "content_entries" ALTER COLUMN "data" SET DEFAULT '{}'::jsonb`);
        await queryRunner.query(`CREATE INDEX "idx_tenant_events_tenant_created" ON "tenant_events" ("tenant_id", "created_at") `);
        await queryRunner.query(`CREATE INDEX "idx_pages_tenant_slug" ON "pages" ("tenant_id", "slug") `);
        await queryRunner.query(`CREATE INDEX "idx_content_entries_tenant_def_slug" ON "content_entries" ("tenant_id", "definition_id", "slug") `);
        await queryRunner.query(`CREATE INDEX "idx_content_entries_tenant_def_pub_created" ON "content_entries" ("tenant_id", "definition_id", "is_published", "created_at") `);
        await queryRunner.query(`CREATE INDEX "idx_content_definitions_tenant_slug" ON "content_definitions" ("tenant_id", "slug") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_content_definitions_tenant_slug"`);
        await queryRunner.query(`DROP INDEX "public"."idx_content_entries_tenant_def_pub_created"`);
        await queryRunner.query(`DROP INDEX "public"."idx_content_entries_tenant_def_slug"`);
        await queryRunner.query(`DROP INDEX "public"."idx_pages_tenant_slug"`);
        await queryRunner.query(`DROP INDEX "public"."idx_tenant_events_tenant_created"`);
        await queryRunner.query(`ALTER TABLE "content_entries" ALTER COLUMN "data" SET DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "pages" ALTER COLUMN "components" SET DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "tenant_events" ALTER COLUMN "payload" SET DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "tenants" ALTER COLUMN "settings" SET DEFAULT '{}'`);
        await queryRunner.query(`DROP TABLE "memberships"`);
        await queryRunner.query(`DROP TYPE "public"."memberships_role_enum"`);
    }

}
