import { MigrationInterface, QueryRunner } from "typeorm";

export class EntitiesRelations1772936504276 implements MigrationInterface {
    name = 'EntitiesRelations1772936504276'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "content_entries" ALTER COLUMN "data" SET DEFAULT '{}'::jsonb`);
        await queryRunner.query(`ALTER TABLE "pages" ALTER COLUMN "components" SET DEFAULT '{}'::jsonb`);
        await queryRunner.query(`ALTER TABLE "tenant_events" ALTER COLUMN "payload" SET DEFAULT '{}'::jsonb`);
        await queryRunner.query(`ALTER TABLE "tenants" ALTER COLUMN "settings" SET DEFAULT '{}'::jsonb`);
        await queryRunner.query(`ALTER TABLE "memberships" ADD CONSTRAINT "memberships_unique" UNIQUE ("user_id", "tenant_id")`);
        await queryRunner.query(`ALTER TABLE "content_entries" ADD CONSTRAINT "FK_3e18fc9ee9101fe1775b01d7b0e" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "content_entries" ADD CONSTRAINT "FK_e7c3f62096f201189f60d227287" FOREIGN KEY ("definition_id") REFERENCES "content_definitions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "content_definitions" ADD CONSTRAINT "FK_8259688946ee77cf106feef1cdb" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pages" ADD CONSTRAINT "FK_46e907ed4e2f32850168d175571" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tenant_events" ADD CONSTRAINT "FK_1447abccae7972b304b25fad573" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tenant_events" ADD CONSTRAINT "FK_c9a6e2ab6adea58d7b82ff908bb" FOREIGN KEY ("actor_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "memberships" ADD CONSTRAINT "FK_7c1e2fdfed4f6838e0c05ae5051" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "memberships" ADD CONSTRAINT "FK_a9c14741084d57ac0ec0cb52af3" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "memberships" DROP CONSTRAINT "FK_a9c14741084d57ac0ec0cb52af3"`);
        await queryRunner.query(`ALTER TABLE "memberships" DROP CONSTRAINT "FK_7c1e2fdfed4f6838e0c05ae5051"`);
        await queryRunner.query(`ALTER TABLE "tenant_events" DROP CONSTRAINT "FK_c9a6e2ab6adea58d7b82ff908bb"`);
        await queryRunner.query(`ALTER TABLE "tenant_events" DROP CONSTRAINT "FK_1447abccae7972b304b25fad573"`);
        await queryRunner.query(`ALTER TABLE "pages" DROP CONSTRAINT "FK_46e907ed4e2f32850168d175571"`);
        await queryRunner.query(`ALTER TABLE "content_definitions" DROP CONSTRAINT "FK_8259688946ee77cf106feef1cdb"`);
        await queryRunner.query(`ALTER TABLE "content_entries" DROP CONSTRAINT "FK_e7c3f62096f201189f60d227287"`);
        await queryRunner.query(`ALTER TABLE "content_entries" DROP CONSTRAINT "FK_3e18fc9ee9101fe1775b01d7b0e"`);
        await queryRunner.query(`ALTER TABLE "memberships" DROP CONSTRAINT "memberships_unique"`);
        await queryRunner.query(`ALTER TABLE "tenants" ALTER COLUMN "settings" SET DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "tenant_events" ALTER COLUMN "payload" SET DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "pages" ALTER COLUMN "components" SET DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "content_entries" ALTER COLUMN "data" SET DEFAULT '{}'`);
    }

}
