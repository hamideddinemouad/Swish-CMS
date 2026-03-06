import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1772835410309 implements MigrationInterface {
    name = 'Init1772835410309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tenants" ALTER COLUMN "settings" SET DEFAULT '{}'::jsonb`);
        await queryRunner.query(`ALTER TABLE "tenant_events" ALTER COLUMN "payload" SET DEFAULT '{}'::jsonb`);
        await queryRunner.query(`ALTER TABLE "pages" ALTER COLUMN "components" SET DEFAULT '{}'::jsonb`);
        await queryRunner.query(`ALTER TABLE "content_entries" ALTER COLUMN "data" SET DEFAULT '{}'::jsonb`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD CONSTRAINT "CHK_40068fce7cf39d77a852c74a1e" CHECK ("subdomain" ~ '^[a-z0-9-]+$')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tenants" DROP CONSTRAINT "CHK_40068fce7cf39d77a852c74a1e"`);
        await queryRunner.query(`ALTER TABLE "content_entries" ALTER COLUMN "data" SET DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "pages" ALTER COLUMN "components" SET DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "tenant_events" ALTER COLUMN "payload" SET DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "tenants" ALTER COLUMN "settings" SET DEFAULT '{}'`);
    }

}
