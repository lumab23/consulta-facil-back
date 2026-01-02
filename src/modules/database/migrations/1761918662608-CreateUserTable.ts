import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1761918662608 implements MigrationInterface {
  name = 'CreateUserTable1761918662608';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "nome" character varying(300) NOT NULL, "email" character varying(200) NOT NULL, "password" character varying(64) NOT NULL, "salt" character varying(255) NOT NULL, "created_by" character varying(60) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" character varying(60), "updated_at" TIMESTAMP DEFAULT now(), "deleted_by" character varying(60), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
