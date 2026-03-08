import { MigrationInterface, QueryRunner } from "typeorm";

export class AddForceRls1772929887376 implements MigrationInterface {
    name = 'AddForceRls1772929887376'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "content_definitions" FORCE ROW LEVEL SECURITY`);
        await queryRunner.query(`ALTER TABLE "content_entries" FORCE ROW LEVEL SECURITY`);
        await queryRunner.query(`ALTER TABLE "pages" FORCE ROW LEVEL SECURITY`);
        await queryRunner.query(`ALTER TABLE "tenant_events" FORCE ROW LEVEL SECURITY`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tenant_events" NO FORCE ROW LEVEL SECURITY`);
        await queryRunner.query(`ALTER TABLE "pages" NO FORCE ROW LEVEL SECURITY`);
        await queryRunner.query(`ALTER TABLE "content_entries" NO FORCE ROW LEVEL SECURITY`);
        await queryRunner.query(`ALTER TABLE "content_definitions" NO FORCE ROW LEVEL SECURITY`);
    }

}
