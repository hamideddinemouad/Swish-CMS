import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeComponentsPageIdUnique1774489000000
  implements MigrationInterface
{
  name = 'MakeComponentsPageIdUnique1774489000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX IF EXISTS "public"."idx_components_page_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "components" ADD CONSTRAINT "UQ_components_page_id" UNIQUE ("page_id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "components" DROP CONSTRAINT "UQ_components_page_id"`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_components_page_id" ON "components" ("page_id") `,
    );
  }
}
