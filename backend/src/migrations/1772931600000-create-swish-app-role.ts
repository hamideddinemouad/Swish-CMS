import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSwishAppRole1772931600000 implements MigrationInterface {
    name = 'CreateSwishAppRole1772931600000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'swish_app') THEN
                    CREATE ROLE swish_app;
                END IF;
            END
            $$;
        `);
        await queryRunner.query(`ALTER ROLE swish_app NOBYPASSRLS`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DO $$
            BEGIN
                IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'swish_app') THEN
                    ALTER ROLE swish_app BYPASSRLS;
                END IF;
            END
            $$;
        `);
    }
}
