import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropCmsModel1772950000000 implements MigrationInterface {
  name = 'DropCmsModel1772950000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "content_entries"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "content_definitions"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "tenant_events"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "memberships"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "public"."memberships_role_enum"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."memberships_role_enum" AS ENUM('OWNER', 'EDITOR')`,
    );

    await queryRunner.query(
      `CREATE TABLE "memberships" ("user_id" uuid NOT NULL, "tenant_id" uuid NOT NULL, "role" "public"."memberships_role_enum" NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "memberships_unique" UNIQUE ("user_id", "tenant_id"), CONSTRAINT "PK_7496a942c4958ee034f803461e8" PRIMARY KEY ("user_id", "tenant_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "content_definitions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tenant_id" uuid NOT NULL, "slug" character varying NOT NULL, "name" character varying NOT NULL, "schema" jsonb NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "content_definitions_unique_per_tenant" UNIQUE ("tenant_id", "slug"), CONSTRAINT "CHK_8752224e86324a1a3649499b91" CHECK ("slug" ~ '^[a-z0-9-]+$'), CONSTRAINT "PK_b3cdf00afe013c9f05da8f67fbf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_content_definitions_tenant_slug" ON "content_definitions" ("tenant_id", "slug") `,
    );
    await queryRunner.query(
      `CREATE TABLE "content_entries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tenant_id" uuid NOT NULL, "definition_id" uuid NOT NULL, "slug" character varying NOT NULL, "data" jsonb NOT NULL DEFAULT '{}'::jsonb, "is_published" boolean NOT NULL DEFAULT false, "published_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "content_entries_unique_per_type" UNIQUE ("tenant_id", "definition_id", "slug"), CONSTRAINT "CHK_0347c061f36032c01292bd1578" CHECK ("slug" ~ '^[a-z0-9-]+$'), CONSTRAINT "PK_76ad9c3b728294d4dd041613aba" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_content_entries_tenant_def_slug" ON "content_entries" ("tenant_id", "definition_id", "slug") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_content_entries_tenant_def_pub_created" ON "content_entries" ("tenant_id", "definition_id", "is_published", "created_at") `,
    );
    await queryRunner.query(
      `CREATE TABLE "tenant_events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tenant_id" uuid NOT NULL, "actor_user_id" uuid, "type" character varying NOT NULL, "payload" jsonb NOT NULL DEFAULT '{}'::jsonb, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_b504bc6fdc39949314b502ea6a9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_tenant_events_tenant_created" ON "tenant_events" ("tenant_id", "created_at") `,
    );

    await queryRunner.query(
      `ALTER TABLE "memberships" ADD CONSTRAINT "FK_7c1e2fdfed4f6838e0c05ae5051" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "memberships" ADD CONSTRAINT "FK_a9c14741084d57ac0ec0cb52af3" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_definitions" ADD CONSTRAINT "FK_8259688946ee77cf106feef1cdb" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_entries" ADD CONSTRAINT "FK_3e18fc9ee9101fe1775b01d7b0e" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "content_entries" ADD CONSTRAINT "FK_e7c3f62096f201189f60d227287" FOREIGN KEY ("definition_id") REFERENCES "content_definitions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tenant_events" ADD CONSTRAINT "FK_1447abccae7972b304b25fad573" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tenant_events" ADD CONSTRAINT "FK_c9a6e2ab6adea58d7b82ff908bb" FOREIGN KEY ("actor_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }
}
