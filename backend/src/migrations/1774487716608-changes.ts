import { MigrationInterface, QueryRunner } from "typeorm";

export class Changes1774487716608 implements MigrationInterface {
    name = 'Changes1774487716608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tenants" DROP CONSTRAINT "FK_tenants_user_id"`);
        await queryRunner.query(`ALTER TABLE "components" DROP CONSTRAINT "FK_components_page"`);
        await queryRunner.query(`ALTER TABLE "pages" ALTER COLUMN "components" SET DEFAULT '{}'::jsonb`);
        await queryRunner.query(`ALTER TABLE "tenants" ALTER COLUMN "settings" SET DEFAULT '{}'::jsonb`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "secret_phrase_hash" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "components" ALTER COLUMN "data" SET DEFAULT '{}'::jsonb`);
        await queryRunner.query(`ALTER TABLE "components" ALTER COLUMN "preference" SET DEFAULT '{}'::jsonb`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD CONSTRAINT "FK_0e2bb90ad27fa92910185792aca" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "components" ADD CONSTRAINT "FK_de521ef5844106d2b2033dd2d8b" FOREIGN KEY ("page_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "components" DROP CONSTRAINT "FK_de521ef5844106d2b2033dd2d8b"`);
        await queryRunner.query(`ALTER TABLE "tenants" DROP CONSTRAINT "FK_0e2bb90ad27fa92910185792aca"`);
        await queryRunner.query(`ALTER TABLE "components" ALTER COLUMN "preference" SET DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "components" ALTER COLUMN "data" SET DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "secret_phrase_hash" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenants" ALTER COLUMN "settings" SET DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "pages" ALTER COLUMN "components" SET DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "components" ADD CONSTRAINT "FK_components_page" FOREIGN KEY ("page_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD CONSTRAINT "FK_tenants_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
