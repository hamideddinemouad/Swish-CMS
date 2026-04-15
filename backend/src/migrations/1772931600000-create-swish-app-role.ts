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
            EXCEPTION
                WHEN insufficient_privilege THEN
                    RAISE NOTICE 'Skipping swish_app role creation due to insufficient privileges';
                WHEN feature_not_supported THEN
                    RAISE NOTICE 'Skipping swish_app role creation because role management is not supported';
            END
            $$;
        `);
        await queryRunner.query(`
            DO $$
            BEGIN
                IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'swish_app') THEN
                    ALTER ROLE swish_app NOBYPASSRLS;
                END IF;
            EXCEPTION
                WHEN insufficient_privilege THEN
                    RAISE NOTICE 'Skipping swish_app role alteration due to insufficient privileges';
                WHEN feature_not_supported THEN
                    RAISE NOTICE 'Skipping swish_app role alteration because role management is not supported';
            END
            $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DO $$
            BEGIN
                IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'swish_app') THEN
                    ALTER ROLE swish_app BYPASSRLS;
                END IF;
            EXCEPTION
                WHEN insufficient_privilege THEN
                    RAISE NOTICE 'Skipping swish_app role alteration due to insufficient privileges';
                WHEN feature_not_supported THEN
                    RAISE NOTICE 'Skipping swish_app role alteration because role management is not supported';
            END
            $$;
        `);
    }
}
