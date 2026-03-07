import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1772923114686 implements MigrationInterface {
    name = 'Init1772923114686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tenants" ALTER COLUMN "settings" SET DEFAULT '{}'::jsonb`);
        await queryRunner.query(`ALTER TABLE "tenant_events" ALTER COLUMN "payload" SET DEFAULT '{}'::jsonb`);
        await queryRunner.query(`ALTER TABLE "pages" ALTER COLUMN "components" SET DEFAULT '{}'::jsonb`);
        await queryRunner.query(`ALTER TABLE "content_entries" ALTER COLUMN "data" SET DEFAULT '{}'::jsonb`);
        await queryRunner.query(`ALTER TABLE "memberships" ADD CONSTRAINT "memberships_unique" UNIQUE ("user_id", "tenant_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "memberships" DROP CONSTRAINT "memberships_unique"`);
        await queryRunner.query(`ALTER TABLE "content_entries" ALTER COLUMN "data" SET DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "pages" ALTER COLUMN "components" SET DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "tenant_events" ALTER COLUMN "payload" SET DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "tenants" ALTER COLUMN "settings" SET DEFAULT '{}'`);
    }

}
