import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCasesTable1763135973620 implements MigrationInterface {
  name = 'AddCasesTable1763135973620';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."cases_status_enum" AS ENUM('ONGOING', 'PENDING', 'CLOSED', 'ARCHIVED', 'WON', 'LOST')`,
    );
    await queryRunner.query(
      `CREATE TABLE "cases" ("id" SERIAL NOT NULL, "numero_processo" character varying(100) NOT NULL, "titulo" character varying(300) NOT NULL, "forum" character varying(150), "status" "public"."cases_status_enum" NOT NULL DEFAULT 'PENDING', "last_update_at" TIMESTAMP, "user_id" integer NOT NULL, "client_id" integer NOT NULL, "created_by" character varying(60) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" character varying(60), "updated_at" TIMESTAMP DEFAULT now(), "deleted_by" character varying(60), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_bc429390d8eb9205a29ca0bae17" UNIQUE ("numero_processo"), CONSTRAINT "PK_264acb3048c240fb89aa34626db" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "cases" ADD CONSTRAINT "FK_050257d1dfa826275982b85af92" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cases" ADD CONSTRAINT "FK_d766522b3bd81d86a425e301661" FOREIGN KEY ("client_id") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cases" DROP CONSTRAINT "FK_d766522b3bd81d86a425e301661"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cases" DROP CONSTRAINT "FK_050257d1dfa826275982b85af92"`,
    );
    await queryRunner.query(`DROP TABLE "cases"`);
    await queryRunner.query(`DROP TYPE "public"."cases_status_enum"`);
  }
}
