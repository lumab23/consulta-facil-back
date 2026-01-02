import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddClientsTable1762861348531 implements MigrationInterface {
  name = 'AddClientsTable1762861348531';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "clientes" ("id" SERIAL NOT NULL, "nome" character varying(300) NOT NULL, "documento" character varying(20), "email" character varying(200), "telefone" character varying(20), "observacoes" text, "user_id" integer NOT NULL, "created_by" character varying(60) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" character varying(60), "updated_at" TIMESTAMP DEFAULT now(), "deleted_by" character varying(60), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_fc002853c86bd15f82ef93bf42a" UNIQUE ("documento"), CONSTRAINT "PK_d76bf3571d906e4e86470482c08" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "clientes" ADD CONSTRAINT "FK_c62f04c0f1b95caa69a15ec8b56" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "clientes" DROP CONSTRAINT "FK_c62f04c0f1b95caa69a15ec8b56"`,
    );
    await queryRunner.query(`DROP TABLE "clientes"`);
  }
}
