import { MigrationInterface, QueryRunner } from "typeorm";

export class GrantSwishAppPrivileges1772932200000 implements MigrationInterface {
    name = 'GrantSwishAppPrivileges1772932200000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DO $$
            BEGIN
                IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'swish_app') THEN
                    GRANT USAGE ON SCHEMA public TO swish_app;
                    GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO swish_app;
                    GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO swish_app;
                END IF;
            EXCEPTION
                WHEN insufficient_privilege THEN
                    RAISE NOTICE 'Skipping swish_app grants due to insufficient privileges';
                WHEN feature_not_supported THEN
                    RAISE NOTICE 'Skipping swish_app grants because privilege changes are not supported';
            END
            $$;
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'swish_app')
                   AND EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'postgres') THEN
                    ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO swish_app;
                    ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO swish_app;
                END IF;
            EXCEPTION
                WHEN insufficient_privilege THEN
                    RAISE NOTICE 'Skipping default privilege grants due to insufficient privileges';
                WHEN feature_not_supported THEN
                    RAISE NOTICE 'Skipping default privilege grants because privilege changes are not supported';
            END
            $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DO $$
            BEGIN
                IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'swish_app')
                   AND EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'postgres') THEN
                    ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public REVOKE USAGE, SELECT ON SEQUENCES FROM swish_app;
                    ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public REVOKE SELECT, INSERT, UPDATE, DELETE ON TABLES FROM swish_app;
                END IF;
            EXCEPTION
                WHEN insufficient_privilege THEN
                    RAISE NOTICE 'Skipping default privilege revoke due to insufficient privileges';
                WHEN feature_not_supported THEN
                    RAISE NOTICE 'Skipping default privilege revoke because privilege changes are not supported';
            END
            $$;
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'swish_app') THEN
                    REVOKE USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public FROM swish_app;
                    REVOKE SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public FROM swish_app;
                    REVOKE USAGE ON SCHEMA public FROM swish_app;
                END IF;
            EXCEPTION
                WHEN insufficient_privilege THEN
                    RAISE NOTICE 'Skipping swish_app revokes due to insufficient privileges';
                WHEN feature_not_supported THEN
                    RAISE NOTICE 'Skipping swish_app revokes because privilege changes are not supported';
            END
            $$;
        `);
    }
}
