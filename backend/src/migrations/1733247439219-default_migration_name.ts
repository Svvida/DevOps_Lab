import { MigrationInterface, QueryRunner } from "typeorm";

export class DefaultMigrationName1733247439219 implements MigrationInterface {
    name = 'DefaultMigrationName1733247439219'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Students_Todos" ("id" SERIAL NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "color" text NOT NULL, "endDate" TIMESTAMP, "student_id" integer, CONSTRAINT "PK_c0f6af6aedcf8bd7b5bc382a6ef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Students_Todos" ADD CONSTRAINT "FK_3381d5e27d3415ae99ab39adbad" FOREIGN KEY ("student_id") REFERENCES "Students"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Students_Todos" DROP CONSTRAINT "FK_3381d5e27d3415ae99ab39adbad"`);
        await queryRunner.query(`DROP TABLE "Students_Todos"`);
    }

}
