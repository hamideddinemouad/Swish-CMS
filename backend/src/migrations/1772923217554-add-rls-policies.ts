import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRlsPolicies1772923217554 implements MigrationInterface {
    name = 'AddRlsPolicies1772923217554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "content_definitions" ENABLE ROW LEVEL SECURITY`);
        await queryRunner.query(`ALTER TABLE "content_entries" ENABLE ROW LEVEL SECURITY`);
        await queryRunner.query(`ALTER TABLE "pages" ENABLE ROW LEVEL SECURITY`);
        await queryRunner.query(`ALTER TABLE "tenant_events" ENABLE ROW LEVEL SECURITY`);

        await queryRunner.query(`CREATE POLICY "tenant_isolation_select" ON "content_definitions" FOR SELECT USING ("tenant_id" = current_setting('app.tenant_id', true)::uuid)`);
        await queryRunner.query(`CREATE POLICY "tenant_isolation_insert" ON "content_definitions" FOR INSERT WITH CHECK ("tenant_id" = current_setting('app.tenant_id', true)::uuid)`);
        await queryRunner.query(`CREATE POLICY "tenant_isolation_update" ON "content_definitions" FOR UPDATE USING ("tenant_id" = current_setting('app.tenant_id', true)::uuid) WITH CHECK ("tenant_id" = current_setting('app.tenant_id', true)::uuid)`);
        await queryRunner.query(`CREATE POLICY "tenant_isolation_delete" ON "content_definitions" FOR DELETE USING ("tenant_id" = current_setting('app.tenant_id', true)::uuid)`);

        await queryRunner.query(`CREATE POLICY "tenant_isolation_select" ON "content_entries" FOR SELECT USING ("tenant_id" = current_setting('app.tenant_id', true)::uuid)`);
        await queryRunner.query(`CREATE POLICY "tenant_isolation_insert" ON "content_entries" FOR INSERT WITH CHECK ("tenant_id" = current_setting('app.tenant_id', true)::uuid)`);
        await queryRunner.query(`CREATE POLICY "tenant_isolation_update" ON "content_entries" FOR UPDATE USING ("tenant_id" = current_setting('app.tenant_id', true)::uuid) WITH CHECK ("tenant_id" = current_setting('app.tenant_id', true)::uuid)`);
        await queryRunner.query(`CREATE POLICY "tenant_isolation_delete" ON "content_entries" FOR DELETE USING ("tenant_id" = current_setting('app.tenant_id', true)::uuid)`);

        await queryRunner.query(`CREATE POLICY "tenant_isolation_select" ON "pages" FOR SELECT USING ("tenant_id" = current_setting('app.tenant_id', true)::uuid)`);
        await queryRunner.query(`CREATE POLICY "tenant_isolation_insert" ON "pages" FOR INSERT WITH CHECK ("tenant_id" = current_setting('app.tenant_id', true)::uuid)`);
        await queryRunner.query(`CREATE POLICY "tenant_isolation_update" ON "pages" FOR UPDATE USING ("tenant_id" = current_setting('app.tenant_id', true)::uuid) WITH CHECK ("tenant_id" = current_setting('app.tenant_id', true)::uuid)`);
        await queryRunner.query(`CREATE POLICY "tenant_isolation_delete" ON "pages" FOR DELETE USING ("tenant_id" = current_setting('app.tenant_id', true)::uuid)`);

        await queryRunner.query(`CREATE POLICY "tenant_isolation_select" ON "tenant_events" FOR SELECT USING ("tenant_id" = current_setting('app.tenant_id', true)::uuid)`);
        await queryRunner.query(`CREATE POLICY "tenant_isolation_insert" ON "tenant_events" FOR INSERT WITH CHECK ("tenant_id" = current_setting('app.tenant_id', true)::uuid)`);
        await queryRunner.query(`CREATE POLICY "tenant_isolation_update" ON "tenant_events" FOR UPDATE USING ("tenant_id" = current_setting('app.tenant_id', true)::uuid) WITH CHECK ("tenant_id" = current_setting('app.tenant_id', true)::uuid)`);
        await queryRunner.query(`CREATE POLICY "tenant_isolation_delete" ON "tenant_events" FOR DELETE USING ("tenant_id" = current_setting('app.tenant_id', true)::uuid)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP POLICY IF EXISTS "tenant_isolation_delete" ON "tenant_events"`);
        await queryRunner.query(`DROP POLICY IF EXISTS "tenant_isolation_update" ON "tenant_events"`);
        await queryRunner.query(`DROP POLICY IF EXISTS "tenant_isolation_insert" ON "tenant_events"`);
        await queryRunner.query(`DROP POLICY IF EXISTS "tenant_isolation_select" ON "tenant_events"`);

        await queryRunner.query(`DROP POLICY IF EXISTS "tenant_isolation_delete" ON "pages"`);
        await queryRunner.query(`DROP POLICY IF EXISTS "tenant_isolation_update" ON "pages"`);
        await queryRunner.query(`DROP POLICY IF EXISTS "tenant_isolation_insert" ON "pages"`);
        await queryRunner.query(`DROP POLICY IF EXISTS "tenant_isolation_select" ON "pages"`);

        await queryRunner.query(`DROP POLICY IF EXISTS "tenant_isolation_delete" ON "content_entries"`);
        await queryRunner.query(`DROP POLICY IF EXISTS "tenant_isolation_update" ON "content_entries"`);
        await queryRunner.query(`DROP POLICY IF EXISTS "tenant_isolation_insert" ON "content_entries"`);
        await queryRunner.query(`DROP POLICY IF EXISTS "tenant_isolation_select" ON "content_entries"`);

        await queryRunner.query(`DROP POLICY IF EXISTS "tenant_isolation_delete" ON "content_definitions"`);
        await queryRunner.query(`DROP POLICY IF EXISTS "tenant_isolation_update" ON "content_definitions"`);
        await queryRunner.query(`DROP POLICY IF EXISTS "tenant_isolation_insert" ON "content_definitions"`);
        await queryRunner.query(`DROP POLICY IF EXISTS "tenant_isolation_select" ON "content_definitions"`);

        await queryRunner.query(`ALTER TABLE "tenant_events" DISABLE ROW LEVEL SECURITY`);
        await queryRunner.query(`ALTER TABLE "pages" DISABLE ROW LEVEL SECURITY`);
        await queryRunner.query(`ALTER TABLE "content_entries" DISABLE ROW LEVEL SECURITY`);
        await queryRunner.query(`ALTER TABLE "content_definitions" DISABLE ROW LEVEL SECURITY`);
    }

}
