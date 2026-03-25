import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTenantOwnerUser1772941300000 implements MigrationInterface {
  name = 'AddTenantOwnerUser1772941300000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tenants" ADD "user_id" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "tenants" ADD CONSTRAINT "UQ_tenants_user_id" UNIQUE ("user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "tenants" ADD CONSTRAINT "FK_tenants_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tenants" DROP CONSTRAINT "FK_tenants_user_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tenants" DROP CONSTRAINT "UQ_tenants_user_id"`,
    );
    await queryRunner.query(`ALTER TABLE "tenants" DROP COLUMN "user_id"`);
  }
}
