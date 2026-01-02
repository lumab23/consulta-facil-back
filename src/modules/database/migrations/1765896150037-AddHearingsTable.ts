import { MigrationInterface, QueryRunner } from "typeorm";

export class AddHearingsTable1765896150037 implements MigrationInterface {
    name = 'AddHearingsTable1765896150037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hearings" ("id" SERIAL NOT NULL, "data" TIMESTAMP NOT NULL, "local" character varying(300), "notas" text, "case_id" integer NOT NULL, "created_by" character varying(60) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" character varying(60), "updated_at" TIMESTAMP DEFAULT now(), "deleted_by" character varying(60), "deleted_at" TIMESTAMP, CONSTRAINT "PK_79d1a17d4ddd70a11c44bf3b42c" PRIMARY KEY ("id"))`);

        await queryRunner.query(`ALTER TABLE "cases" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "cases" ALTER COLUMN "status" TYPE VARCHAR`); 

        await queryRunner.query(`UPDATE "cases" SET "status" = 'EM_ANDAMENTO' WHERE "status" = 'ONGOING'`);
        await queryRunner.query(`UPDATE "cases" SET "status" = 'PENDENTE' WHERE "status" = 'PENDING'`);
        await queryRunner.query(`UPDATE "cases" SET "status" = 'ENCERRADO' WHERE "status" = 'CLOSED'`);
        await queryRunner.query(`UPDATE "cases" SET "status" = 'ARQUIVADO' WHERE "status" = 'ARCHIVED'`);
        await queryRunner.query(`UPDATE "cases" SET "status" = 'GANHO' WHERE "status" = 'WON'`);
        await queryRunner.query(`UPDATE "cases" SET "status" = 'PERDIDO' WHERE "status" = 'LOST'`);

        await queryRunner.query(`DROP TYPE "public"."cases_status_enum"`); 
        await queryRunner.query(`CREATE TYPE "public"."cases_status_enum" AS ENUM('EM_ANDAMENTO', 'PENDENTE', 'ENCERRADO', 'ARQUIVADO', 'GANHO', 'PERDIDO')`); 

        await queryRunner.query(`ALTER TABLE "cases" ALTER COLUMN "status" TYPE "public"."cases_status_enum" USING "status"::"public"."cases_status_enum"`);
        await queryRunner.query(`ALTER TABLE "cases" ALTER COLUMN "status" SET DEFAULT 'PENDENTE'`);

        await queryRunner.query(`ALTER TABLE "hearings" ADD CONSTRAINT "FK_94fa64845b03d2f95a78bf21797" FOREIGN KEY ("case_id") REFERENCES "cases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hearings" DROP CONSTRAINT "FK_94fa64845b03d2f95a78bf21797"`);
        await queryRunner.query(`CREATE TYPE "public"."cases_status_enum_old" AS ENUM('ONGOING', 'PENDING', 'CLOSED', 'ARCHIVED', 'WON', 'LOST')`);
        await queryRunner.query(`ALTER TABLE "cases" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "cases" ALTER COLUMN "status" TYPE "public"."cases_status_enum_old" USING "status"::"text"::"public"."cases_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "cases" ALTER COLUMN "status" SET DEFAULT 'PENDING'`);
        await queryRunner.query(`DROP TYPE "public"."cases_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."cases_status_enum_old" RENAME TO "cases_status_enum"`);
        await queryRunner.query(`DROP TABLE "hearings"`);
    }

}
