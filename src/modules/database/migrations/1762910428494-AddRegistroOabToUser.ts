import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRegistroOabToUser1762910428494 implements MigrationInterface {
  name = 'AddRegistroOabToUser1762910428494';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "registro_oab" character varying(50)`,
    );

    await queryRunner.query(
      `UPDATE "users" SET "registro_oab" = 'PENDENTE_' || "id" WHERE "registro_oab" IS NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "registro_oab" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_registro_oab" UNIQUE ("registro_oab")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_registro_oab"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "registro_oab"`);
  }
}
