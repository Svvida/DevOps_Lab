import { MigrationInterface, QueryRunner } from "typeorm";

export class DefaultMigrationName1730911802499 implements MigrationInterface {
    name = 'DefaultMigrationName1730911802499'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Users_Accounts" ("id" SERIAL NOT NULL, "login" character varying(111) NOT NULL, "email" character varying(320) NOT NULL, "password" character varying(72) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "deactivation_date" TIMESTAMP, CONSTRAINT "UQ_75d34d777e309e57f296add9512" UNIQUE ("login"), CONSTRAINT "UQ_f803275cd5649d5be61fa24b2d7" UNIQUE ("email"), CONSTRAINT "PK_d17dacaec7fc58aac08c13588f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Roles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_efba48c6a0c7a9b6260f771b165" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Students_Addresses" ("id" SERIAL NOT NULL, "country" character varying NOT NULL, "city" character varying NOT NULL, "postal_code" character varying NOT NULL, "street" character varying NOT NULL, "building_number" character varying, "apartment_number" character varying, CONSTRAINT "PK_1c2d2020c611baa061060626976" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Students_Consents" ("id" SERIAL NOT NULL, "permission_for_photo" boolean NOT NULL, "permission_for_data_processing" boolean NOT NULL, CONSTRAINT "PK_79ea936391794ea78d4ca901310" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Student_Degree_Courses" ("id" SERIAL NOT NULL, "student_id" integer, "degree_course_id" integer, CONSTRAINT "PK_97b91a7a2b7240e2c3a726e6e48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Student_Modules" ("id" SERIAL NOT NULL, "student_id" integer, "module_id" integer, CONSTRAINT "PK_7bf74358078ca30c09fec5efe84" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."Grades_grade_enum" AS ENUM('2', '3', '4', '5')`);
        await queryRunner.query(`CREATE TYPE "public"."Grades_passdateattempt_enum" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`CREATE TABLE "Grades" ("id" SERIAL NOT NULL, "grade" "public"."Grades_grade_enum", "passDateAttempt" "public"."Grades_passdateattempt_enum", "studentId" integer NOT NULL, "subjectId" integer NOT NULL, CONSTRAINT "UQ_ea351a485675f4d1b67ac3b909d" UNIQUE ("studentId", "subjectId"), CONSTRAINT "PK_3687b0df14b7f4f7150078eaaa3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."Students_gender_enum" AS ENUM('MALE', 'FEMALE')`);
        await queryRunner.query(`CREATE TABLE "Students" ("name" character varying(55) NOT NULL, "surname" character varying(55) NOT NULL, "gender" "public"."Students_gender_enum" NOT NULL, "nationality" character varying, "contact_email" character varying, "contact_phone" character varying, "date_of_birth" TIMESTAMP NOT NULL, "pesel" character varying(11) NOT NULL, "date_of_admission" character varying NOT NULL, "id" SERIAL NOT NULL, "consent_id" integer, "address_id" integer NOT NULL, "account_id" integer, CONSTRAINT "UQ_cc2749833d736efa8d49ce411aa" UNIQUE ("pesel"), CONSTRAINT "REL_b1ee3a5f44c82b54d8785b3641" UNIQUE ("consent_id"), CONSTRAINT "REL_56870eb55b96fc2202c147e4dd" UNIQUE ("address_id"), CONSTRAINT "REL_b17d821af8b4d6021462bfbe0f" UNIQUE ("account_id"), CONSTRAINT "PK_40525f6ec1de97950bdc60ff61b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Student_Degree_Paths" ("id" SERIAL NOT NULL, "student_id" integer, "degree_path_id" integer, "degree_course_id" integer, CONSTRAINT "PK_01f29db33381c78c79bb87b2837" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Degree_Paths" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "degree_course_id" integer, CONSTRAINT "UQ_ef26100b4057becd7bcd41fae5c" UNIQUE ("name"), CONSTRAINT "PK_677c416e759654b8377dbe6abe2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Modules" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "degree_path_id" integer, CONSTRAINT "UQ_6c55df7b2095d618224bf760f49" UNIQUE ("name"), CONSTRAINT "PK_1623db184d7b8c115deb0692023" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Subjects" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "UQ_f18d27b07adc003b95b80861e88" UNIQUE ("name"), CONSTRAINT "PK_4506c33ae63133dd7813484bc89" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Degree_Courses" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "UQ_b872950627c2aae30ab06a95b65" UNIQUE ("name"), CONSTRAINT "PK_627d4a3582cf93c96bad620708a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Events" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "description" text NOT NULL, "author_id" integer NOT NULL, CONSTRAINT "PK_efc6f7ffffa26a4d4fe5f383a0b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."Event_Organizers_organizer_type_enum" AS ENUM('EMPLOYEE', 'EXTERNAL_PARTICIPANT', 'COMPANY')`);
        await queryRunner.query(`CREATE TABLE "Event_Organizers" ("id" SERIAL NOT NULL, "organizer_type" "public"."Event_Organizers_organizer_type_enum" NOT NULL, CONSTRAINT "PK_614dc4f9c47e9c449acdd877330" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Companies" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "account_id" integer NOT NULL, "organizer_id" integer, CONSTRAINT "UQ_17e717277f8a4fdef969fa75e82" UNIQUE ("name"), CONSTRAINT "PK_999ff985663bc48d13b08bce475" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."External_Participants_gender_enum" AS ENUM('MALE', 'FEMALE')`);
        await queryRunner.query(`CREATE TABLE "External_Participants" ("name" character varying(55) NOT NULL, "surname" character varying(55) NOT NULL, "gender" "public"."External_Participants_gender_enum" NOT NULL, "nationality" character varying, "contact_email" character varying, "contact_phone" character varying, "id" SERIAL NOT NULL, "account_id" integer NOT NULL, "organizer_id" integer, CONSTRAINT "PK_fd301e5d714e2aab0244da27caf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Employees_Consents" ("id" SERIAL NOT NULL, "permission_for_photo" boolean NOT NULL, "permission_for_data_processing" boolean NOT NULL, CONSTRAINT "PK_7e051b2fc2d319c91210732dcd6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Employees_Addresses" ("id" SERIAL NOT NULL, "country" character varying NOT NULL, "city" character varying NOT NULL, "postal_code" character varying NOT NULL, "street" character varying NOT NULL, "building_number" character varying, "apartment_number" character varying, CONSTRAINT "PK_6f6c21a2c6c200e4d1691f142ec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."Employees_gender_enum" AS ENUM('MALE', 'FEMALE')`);
        await queryRunner.query(`CREATE TABLE "Employees" ("name" character varying(55) NOT NULL, "surname" character varying(55) NOT NULL, "gender" "public"."Employees_gender_enum" NOT NULL, "nationality" character varying, "contact_email" character varying, "contact_phone" character varying, "date_of_birth" TIMESTAMP NOT NULL, "pesel" character varying(11) NOT NULL, "date_of_admission" character varying NOT NULL, "id" SERIAL NOT NULL, "consent_id" integer, "address_id" integer NOT NULL, "account_id" integer, "organizer_id" integer, CONSTRAINT "UQ_d18b7352b5bb65bf55b3c5c576b" UNIQUE ("pesel"), CONSTRAINT "REL_fe01ce06e1a3ddbd249b8b9f25" UNIQUE ("consent_id"), CONSTRAINT "REL_c9fd556d212b215e8d94921863" UNIQUE ("address_id"), CONSTRAINT "REL_13ad469001d2c935ad29c83108" UNIQUE ("account_id"), CONSTRAINT "PK_42cbd69fa6c59f000fdc0c07bb9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Users_Accounts_Roles" ("users_accounts_id" integer NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "PK_381a61349f1d091020111592cb3" PRIMARY KEY ("users_accounts_id", "role_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bc1f92fb5db784f353f3a84a28" ON "Users_Accounts_Roles" ("users_accounts_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_cafb557078180a1e944eb02373" ON "Users_Accounts_Roles" ("role_id") `);
        await queryRunner.query(`CREATE TABLE "Modules_Subjects" ("module_id" integer NOT NULL, "subject_id" integer NOT NULL, CONSTRAINT "PK_a142a4b96deb93a93b967619748" PRIMARY KEY ("module_id", "subject_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f065d8756809f1ff590a156928" ON "Modules_Subjects" ("module_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_0715748240db915eb28b094cd6" ON "Modules_Subjects" ("subject_id") `);
        await queryRunner.query(`CREATE TABLE "Degree_Courses_Subjects" ("degree_course_id" integer NOT NULL, "subject_id" integer NOT NULL, CONSTRAINT "PK_2e8a5ebbd0e6bc68cd12d436c67" PRIMARY KEY ("degree_course_id", "subject_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a7f6634eb51e0b0e90eaacd788" ON "Degree_Courses_Subjects" ("degree_course_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_da09bda18a487e5386155e1402" ON "Degree_Courses_Subjects" ("subject_id") `);
        await queryRunner.query(`CREATE TABLE "Event_Organizer_Events" ("event_organizer_id" integer NOT NULL, "event_id" integer NOT NULL, CONSTRAINT "PK_9670aeb2e351c19f290a3fba8be" PRIMARY KEY ("event_organizer_id", "event_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8a067110a52e1ea8c7dba4ef7b" ON "Event_Organizer_Events" ("event_organizer_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f642080450b50a08830fbefd96" ON "Event_Organizer_Events" ("event_id") `);
        await queryRunner.query(`CREATE TABLE "Company_External_Participants" ("external_participant_id" integer NOT NULL, "company_id" integer NOT NULL, CONSTRAINT "PK_dc69d7aab6aa51530b3244368e2" PRIMARY KEY ("external_participant_id", "company_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_08985169c11094aadef8a65ce1" ON "Company_External_Participants" ("external_participant_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_53a9a845db5cf80edb387f1f99" ON "Company_External_Participants" ("company_id") `);
        await queryRunner.query(`ALTER TABLE "Student_Degree_Courses" ADD CONSTRAINT "FK_e67fc68ad0c413ee3ee7aacfcac" FOREIGN KEY ("student_id") REFERENCES "Students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Student_Degree_Courses" ADD CONSTRAINT "FK_81397cc6f898333c493b7d732d7" FOREIGN KEY ("degree_course_id") REFERENCES "Degree_Courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Student_Modules" ADD CONSTRAINT "FK_b2b75d4713d59a14e5d51d7d324" FOREIGN KEY ("student_id") REFERENCES "Students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Student_Modules" ADD CONSTRAINT "FK_de31cea3f7d0b89aba948bcf0a2" FOREIGN KEY ("module_id") REFERENCES "Modules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Grades" ADD CONSTRAINT "FK_27ef45908c9e51c6617135b413e" FOREIGN KEY ("studentId") REFERENCES "Students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Grades" ADD CONSTRAINT "FK_f295846e069d7f320733a9c713b" FOREIGN KEY ("subjectId") REFERENCES "Subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Students" ADD CONSTRAINT "FK_b1ee3a5f44c82b54d8785b36419" FOREIGN KEY ("consent_id") REFERENCES "Students_Consents"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Students" ADD CONSTRAINT "FK_56870eb55b96fc2202c147e4dd8" FOREIGN KEY ("address_id") REFERENCES "Students_Addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Students" ADD CONSTRAINT "FK_b17d821af8b4d6021462bfbe0f7" FOREIGN KEY ("account_id") REFERENCES "Users_Accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Student_Degree_Paths" ADD CONSTRAINT "FK_feec1076f8ad6f2d119cf31ccf5" FOREIGN KEY ("student_id") REFERENCES "Students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Student_Degree_Paths" ADD CONSTRAINT "FK_586e64c246457361ff259214cba" FOREIGN KEY ("degree_path_id") REFERENCES "Degree_Paths"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Student_Degree_Paths" ADD CONSTRAINT "FK_6824942514f8cf27d01fe44018d" FOREIGN KEY ("degree_course_id") REFERENCES "Degree_Courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Degree_Paths" ADD CONSTRAINT "FK_0ebd5f9c84d6459ba22a10f9633" FOREIGN KEY ("degree_course_id") REFERENCES "Degree_Courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Modules" ADD CONSTRAINT "FK_96c24fca88a10550b778cc02be8" FOREIGN KEY ("degree_path_id") REFERENCES "Degree_Paths"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Events" ADD CONSTRAINT "FK_4754397a80e549872135ee8b8bf" FOREIGN KEY ("author_id") REFERENCES "Event_Organizers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Companies" ADD CONSTRAINT "FK_3d21ede736505aa01e5a895b626" FOREIGN KEY ("account_id") REFERENCES "Users_Accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Companies" ADD CONSTRAINT "FK_18a73ad45ab04c9004e864b9071" FOREIGN KEY ("organizer_id") REFERENCES "Event_Organizers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "External_Participants" ADD CONSTRAINT "FK_7e7d8300d5a5d5566342c921323" FOREIGN KEY ("account_id") REFERENCES "Users_Accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "External_Participants" ADD CONSTRAINT "FK_c97caa4d4b11bce311470a7ba30" FOREIGN KEY ("organizer_id") REFERENCES "Event_Organizers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Employees" ADD CONSTRAINT "FK_fe01ce06e1a3ddbd249b8b9f257" FOREIGN KEY ("consent_id") REFERENCES "Employees_Consents"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Employees" ADD CONSTRAINT "FK_c9fd556d212b215e8d94921863d" FOREIGN KEY ("address_id") REFERENCES "Employees_Addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Employees" ADD CONSTRAINT "FK_13ad469001d2c935ad29c831082" FOREIGN KEY ("account_id") REFERENCES "Users_Accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Employees" ADD CONSTRAINT "FK_5ecdda12db0bf67729a6e3ae8d2" FOREIGN KEY ("organizer_id") REFERENCES "Event_Organizers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Users_Accounts_Roles" ADD CONSTRAINT "FK_bc1f92fb5db784f353f3a84a281" FOREIGN KEY ("users_accounts_id") REFERENCES "Users_Accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Users_Accounts_Roles" ADD CONSTRAINT "FK_cafb557078180a1e944eb023735" FOREIGN KEY ("role_id") REFERENCES "Roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Modules_Subjects" ADD CONSTRAINT "FK_f065d8756809f1ff590a1569280" FOREIGN KEY ("module_id") REFERENCES "Modules"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Modules_Subjects" ADD CONSTRAINT "FK_0715748240db915eb28b094cd6f" FOREIGN KEY ("subject_id") REFERENCES "Subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Degree_Courses_Subjects" ADD CONSTRAINT "FK_a7f6634eb51e0b0e90eaacd7881" FOREIGN KEY ("degree_course_id") REFERENCES "Degree_Courses"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Degree_Courses_Subjects" ADD CONSTRAINT "FK_da09bda18a487e5386155e14026" FOREIGN KEY ("subject_id") REFERENCES "Subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Event_Organizer_Events" ADD CONSTRAINT "FK_8a067110a52e1ea8c7dba4ef7bb" FOREIGN KEY ("event_organizer_id") REFERENCES "Event_Organizers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Event_Organizer_Events" ADD CONSTRAINT "FK_f642080450b50a08830fbefd962" FOREIGN KEY ("event_id") REFERENCES "Events"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Company_External_Participants" ADD CONSTRAINT "FK_08985169c11094aadef8a65ce1a" FOREIGN KEY ("external_participant_id") REFERENCES "External_Participants"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Company_External_Participants" ADD CONSTRAINT "FK_53a9a845db5cf80edb387f1f99c" FOREIGN KEY ("company_id") REFERENCES "Companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Company_External_Participants" DROP CONSTRAINT "FK_53a9a845db5cf80edb387f1f99c"`);
        await queryRunner.query(`ALTER TABLE "Company_External_Participants" DROP CONSTRAINT "FK_08985169c11094aadef8a65ce1a"`);
        await queryRunner.query(`ALTER TABLE "Event_Organizer_Events" DROP CONSTRAINT "FK_f642080450b50a08830fbefd962"`);
        await queryRunner.query(`ALTER TABLE "Event_Organizer_Events" DROP CONSTRAINT "FK_8a067110a52e1ea8c7dba4ef7bb"`);
        await queryRunner.query(`ALTER TABLE "Degree_Courses_Subjects" DROP CONSTRAINT "FK_da09bda18a487e5386155e14026"`);
        await queryRunner.query(`ALTER TABLE "Degree_Courses_Subjects" DROP CONSTRAINT "FK_a7f6634eb51e0b0e90eaacd7881"`);
        await queryRunner.query(`ALTER TABLE "Modules_Subjects" DROP CONSTRAINT "FK_0715748240db915eb28b094cd6f"`);
        await queryRunner.query(`ALTER TABLE "Modules_Subjects" DROP CONSTRAINT "FK_f065d8756809f1ff590a1569280"`);
        await queryRunner.query(`ALTER TABLE "Users_Accounts_Roles" DROP CONSTRAINT "FK_cafb557078180a1e944eb023735"`);
        await queryRunner.query(`ALTER TABLE "Users_Accounts_Roles" DROP CONSTRAINT "FK_bc1f92fb5db784f353f3a84a281"`);
        await queryRunner.query(`ALTER TABLE "Employees" DROP CONSTRAINT "FK_5ecdda12db0bf67729a6e3ae8d2"`);
        await queryRunner.query(`ALTER TABLE "Employees" DROP CONSTRAINT "FK_13ad469001d2c935ad29c831082"`);
        await queryRunner.query(`ALTER TABLE "Employees" DROP CONSTRAINT "FK_c9fd556d212b215e8d94921863d"`);
        await queryRunner.query(`ALTER TABLE "Employees" DROP CONSTRAINT "FK_fe01ce06e1a3ddbd249b8b9f257"`);
        await queryRunner.query(`ALTER TABLE "External_Participants" DROP CONSTRAINT "FK_c97caa4d4b11bce311470a7ba30"`);
        await queryRunner.query(`ALTER TABLE "External_Participants" DROP CONSTRAINT "FK_7e7d8300d5a5d5566342c921323"`);
        await queryRunner.query(`ALTER TABLE "Companies" DROP CONSTRAINT "FK_18a73ad45ab04c9004e864b9071"`);
        await queryRunner.query(`ALTER TABLE "Companies" DROP CONSTRAINT "FK_3d21ede736505aa01e5a895b626"`);
        await queryRunner.query(`ALTER TABLE "Events" DROP CONSTRAINT "FK_4754397a80e549872135ee8b8bf"`);
        await queryRunner.query(`ALTER TABLE "Modules" DROP CONSTRAINT "FK_96c24fca88a10550b778cc02be8"`);
        await queryRunner.query(`ALTER TABLE "Degree_Paths" DROP CONSTRAINT "FK_0ebd5f9c84d6459ba22a10f9633"`);
        await queryRunner.query(`ALTER TABLE "Student_Degree_Paths" DROP CONSTRAINT "FK_6824942514f8cf27d01fe44018d"`);
        await queryRunner.query(`ALTER TABLE "Student_Degree_Paths" DROP CONSTRAINT "FK_586e64c246457361ff259214cba"`);
        await queryRunner.query(`ALTER TABLE "Student_Degree_Paths" DROP CONSTRAINT "FK_feec1076f8ad6f2d119cf31ccf5"`);
        await queryRunner.query(`ALTER TABLE "Students" DROP CONSTRAINT "FK_b17d821af8b4d6021462bfbe0f7"`);
        await queryRunner.query(`ALTER TABLE "Students" DROP CONSTRAINT "FK_56870eb55b96fc2202c147e4dd8"`);
        await queryRunner.query(`ALTER TABLE "Students" DROP CONSTRAINT "FK_b1ee3a5f44c82b54d8785b36419"`);
        await queryRunner.query(`ALTER TABLE "Grades" DROP CONSTRAINT "FK_f295846e069d7f320733a9c713b"`);
        await queryRunner.query(`ALTER TABLE "Grades" DROP CONSTRAINT "FK_27ef45908c9e51c6617135b413e"`);
        await queryRunner.query(`ALTER TABLE "Student_Modules" DROP CONSTRAINT "FK_de31cea3f7d0b89aba948bcf0a2"`);
        await queryRunner.query(`ALTER TABLE "Student_Modules" DROP CONSTRAINT "FK_b2b75d4713d59a14e5d51d7d324"`);
        await queryRunner.query(`ALTER TABLE "Student_Degree_Courses" DROP CONSTRAINT "FK_81397cc6f898333c493b7d732d7"`);
        await queryRunner.query(`ALTER TABLE "Student_Degree_Courses" DROP CONSTRAINT "FK_e67fc68ad0c413ee3ee7aacfcac"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_53a9a845db5cf80edb387f1f99"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_08985169c11094aadef8a65ce1"`);
        await queryRunner.query(`DROP TABLE "Company_External_Participants"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f642080450b50a08830fbefd96"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8a067110a52e1ea8c7dba4ef7b"`);
        await queryRunner.query(`DROP TABLE "Event_Organizer_Events"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_da09bda18a487e5386155e1402"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a7f6634eb51e0b0e90eaacd788"`);
        await queryRunner.query(`DROP TABLE "Degree_Courses_Subjects"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0715748240db915eb28b094cd6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f065d8756809f1ff590a156928"`);
        await queryRunner.query(`DROP TABLE "Modules_Subjects"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cafb557078180a1e944eb02373"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bc1f92fb5db784f353f3a84a28"`);
        await queryRunner.query(`DROP TABLE "Users_Accounts_Roles"`);
        await queryRunner.query(`DROP TABLE "Employees"`);
        await queryRunner.query(`DROP TYPE "public"."Employees_gender_enum"`);
        await queryRunner.query(`DROP TABLE "Employees_Addresses"`);
        await queryRunner.query(`DROP TABLE "Employees_Consents"`);
        await queryRunner.query(`DROP TABLE "External_Participants"`);
        await queryRunner.query(`DROP TYPE "public"."External_Participants_gender_enum"`);
        await queryRunner.query(`DROP TABLE "Companies"`);
        await queryRunner.query(`DROP TABLE "Event_Organizers"`);
        await queryRunner.query(`DROP TYPE "public"."Event_Organizers_organizer_type_enum"`);
        await queryRunner.query(`DROP TABLE "Events"`);
        await queryRunner.query(`DROP TABLE "Degree_Courses"`);
        await queryRunner.query(`DROP TABLE "Subjects"`);
        await queryRunner.query(`DROP TABLE "Modules"`);
        await queryRunner.query(`DROP TABLE "Degree_Paths"`);
        await queryRunner.query(`DROP TABLE "Student_Degree_Paths"`);
        await queryRunner.query(`DROP TABLE "Students"`);
        await queryRunner.query(`DROP TYPE "public"."Students_gender_enum"`);
        await queryRunner.query(`DROP TABLE "Grades"`);
        await queryRunner.query(`DROP TYPE "public"."Grades_passdateattempt_enum"`);
        await queryRunner.query(`DROP TYPE "public"."Grades_grade_enum"`);
        await queryRunner.query(`DROP TABLE "Student_Modules"`);
        await queryRunner.query(`DROP TABLE "Student_Degree_Courses"`);
        await queryRunner.query(`DROP TABLE "Students_Consents"`);
        await queryRunner.query(`DROP TABLE "Students_Addresses"`);
        await queryRunner.query(`DROP TABLE "Roles"`);
        await queryRunner.query(`DROP TABLE "Users_Accounts"`);
    }

}
