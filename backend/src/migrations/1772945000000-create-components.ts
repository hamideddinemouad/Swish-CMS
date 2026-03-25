import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateComponents1772945000000 implements MigrationInterface {
  name = 'CreateComponents1772945000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "components" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "page_id" uuid NOT NULL, "title" character varying NOT NULL, "data" jsonb NOT NULL DEFAULT '{}'::jsonb, "preference" jsonb NOT NULL DEFAULT '{}'::jsonb, CONSTRAINT "PK_2248d7b4b9c7d3d8dcfc81e8341" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_components_page_id" ON "components" ("page_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "components" ADD CONSTRAINT "FK_components_page" FOREIGN KEY ("page_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "components" DROP CONSTRAINT "FK_components_page"`);
    await queryRunner.query(`DROP INDEX "public"."idx_components_page_id"`);
    await queryRunner.query(`DROP TABLE "components"`);
  }
}
