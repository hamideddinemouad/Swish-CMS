import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserSecretPhrase1772941200000 implements MigrationInterface {
  name = 'AddUserSecretPhrase1772941200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "secret_phrase_hash" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "secret_phrase_hash"`,
    );
  }
}
