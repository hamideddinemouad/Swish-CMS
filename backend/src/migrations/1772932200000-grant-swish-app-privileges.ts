import { MigrationInterface, QueryRunner } from "typeorm";

export class GrantSwishAppPrivileges1772932200000 implements MigrationInterface {
    name = 'GrantSwishAppPrivileges1772932200000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`GRANT USAGE ON SCHEMA public TO swish_app`);
        await queryRunner.query(`GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO swish_app`);
        await queryRunner.query(`GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO swish_app`);

        await queryRunner.query(`ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO swish_app`);
        await queryRunner.query(`ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO swish_app`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public REVOKE USAGE, SELECT ON SEQUENCES FROM swish_app`);
        await queryRunner.query(`ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public REVOKE SELECT, INSERT, UPDATE, DELETE ON TABLES FROM swish_app`);

        await queryRunner.query(`REVOKE USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public FROM swish_app`);
        await queryRunner.query(`REVOKE SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public FROM swish_app`);
        await queryRunner.query(`REVOKE USAGE ON SCHEMA public FROM swish_app`);
    }
}
