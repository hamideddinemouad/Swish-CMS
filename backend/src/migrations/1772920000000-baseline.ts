import { MigrationInterface, QueryRunner } from "typeorm";

export class Baseline1772920000000 implements MigrationInterface {
    name = 'Baseline1772920000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "password_hash" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tenants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subdomain" character varying NOT NULL, "name" character varying NOT NULL, "settings" jsonb NOT NULL DEFAULT '{}'::jsonb, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_21bb89e012fa5b58532009c1601" UNIQUE ("subdomain"), CONSTRAINT "CHK_35eef5418e8cd0d0f4ff84ea8a" CHECK ("subdomain" NOT IN ('www','app','api','admin','static','assets','cdn','mail')), CONSTRAINT "CHK_40068fce7cf39d77a852c74a1e" CHECK ("subdomain" ~ '^[a-z0-9-]+$'), CONSTRAINT "PK_53be67a04681c66b87ee27c9321" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tenant_events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tenant_id" uuid NOT NULL, "actor_user_id" uuid, "type" character varying NOT NULL, "payload" jsonb NOT NULL DEFAULT '{}'::jsonb, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_b504bc6fdc39949314b502ea6a9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_tenant_events_tenant_created" ON "tenant_events" ("tenant_id", "created_at") `);
        await queryRunner.query(`CREATE TABLE "pages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tenant_id" uuid NOT NULL, "slug" character varying NOT NULL, "title" character varying NOT NULL, "components" jsonb NOT NULL DEFAULT '{}'::jsonb, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "pages_unique_per_tenant" UNIQUE ("tenant_id", "slug"), CONSTRAINT "CHK_3050dbd0af6a5e40c043408516" CHECK ("slug" ~ '^[a-z0-9-]+$'), CONSTRAINT "PK_8f21ed625aa34c8391d636b7d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_pages_tenant_slug" ON "pages" ("tenant_id", "slug") `);
        await queryRunner.query(`CREATE TYPE "public"."memberships_role_enum" AS ENUM('OWNER', 'EDITOR')`);
        await queryRunner.query(`CREATE TABLE "memberships" ("user_id" uuid NOT NULL, "tenant_id" uuid NOT NULL, "role" "public"."memberships_role_enum" NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "memberships_unique" UNIQUE ("user_id", "tenant_id"), CONSTRAINT "PK_7496a942c4958ee034f803461e8" PRIMARY KEY ("user_id", "tenant_id"))`);
        await queryRunner.query(`CREATE TABLE "content_entries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tenant_id" uuid NOT NULL, "definition_id" uuid NOT NULL, "slug" character varying NOT NULL, "data" jsonb NOT NULL DEFAULT '{}'::jsonb, "is_published" boolean NOT NULL DEFAULT false, "published_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "content_entries_unique_per_type" UNIQUE ("tenant_id", "definition_id", "slug"), CONSTRAINT "CHK_0347c061f36032c01292bd1578" CHECK ("slug" ~ '^[a-z0-9-]+$'), CONSTRAINT "PK_76ad9c3b728294d4dd041613aba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_content_entries_tenant_def_slug" ON "content_entries" ("tenant_id", "definition_id", "slug") `);
        await queryRunner.query(`CREATE INDEX "idx_content_entries_tenant_def_pub_created" ON "content_entries" ("tenant_id", "definition_id", "is_published", "created_at") `);
        await queryRunner.query(`CREATE TABLE "content_definitions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tenant_id" uuid NOT NULL, "slug" character varying NOT NULL, "name" character varying NOT NULL, "schema" jsonb NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "content_definitions_unique_per_tenant" UNIQUE ("tenant_id", "slug"), CONSTRAINT "CHK_8752224e86324a1a3649499b91" CHECK ("slug" ~ '^[a-z0-9-]+$'), CONSTRAINT "PK_b3cdf00afe013c9f05da8f67fbf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_content_definitions_tenant_slug" ON "content_definitions" ("tenant_id", "slug") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_content_definitions_tenant_slug"`);
        await queryRunner.query(`DROP TABLE "content_definitions"`);
        await queryRunner.query(`DROP INDEX "public"."idx_content_entries_tenant_def_pub_created"`);
        await queryRunner.query(`DROP INDEX "public"."idx_content_entries_tenant_def_slug"`);
        await queryRunner.query(`DROP TABLE "content_entries"`);
        await queryRunner.query(`DROP TABLE "memberships"`);
        await queryRunner.query(`DROP TYPE "public"."memberships_role_enum"`);
        await queryRunner.query(`DROP INDEX "public"."idx_pages_tenant_slug"`);
        await queryRunner.query(`DROP TABLE "pages"`);
        await queryRunner.query(`DROP INDEX "public"."idx_tenant_events_tenant_created"`);
        await queryRunner.query(`DROP TABLE "tenant_events"`);
        await queryRunner.query(`DROP TABLE "tenants"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
