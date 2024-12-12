import { MigrationInterface, QueryRunner } from "typeorm";

export class DefaultMigrationName1731783740730 implements MigrationInterface {
    name = 'DefaultMigrationName1731783740730'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Roles" ADD CONSTRAINT "UQ_8eadedb8470c92966389ecc2165" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TYPE "public"."Grades_passdateattempt_enum" RENAME TO "Grades_passdateattempt_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."Grades_passdateattempt_enum" AS ENUM('1', '2', '3', '4')`);
        await queryRunner.query(`ALTER TABLE "Grades" ALTER COLUMN "passDateAttempt" TYPE "public"."Grades_passdateattempt_enum" USING "passDateAttempt"::"text"::"public"."Grades_passdateattempt_enum"`);
        await queryRunner.query(`DROP TYPE "public"."Grades_passdateattempt_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Grades_passdateattempt_enum_old" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`ALTER TABLE "Grades" ALTER COLUMN "passDateAttempt" TYPE "public"."Grades_passdateattempt_enum_old" USING "passDateAttempt"::"text"::"public"."Grades_passdateattempt_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."Grades_passdateattempt_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."Grades_passdateattempt_enum_old" RENAME TO "Grades_passdateattempt_enum"`);
        await queryRunner.query(`ALTER TABLE "Roles" DROP CONSTRAINT "UQ_8eadedb8470c92966389ecc2165"`);
    }

}
