import { MigrationInterface, QueryRunner } from "typeorm";

export class default1663349943986 implements MigrationInterface {
    name = "default1663349943986";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "subjects" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_1a023685ac2b051b4e557b0b280" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "room_subject" ("roon_id" integer NOT NULL, "subjects" integer NOT NULL, CONSTRAINT "PK_0f9dde95c56f3d14075b4a233e5" PRIMARY KEY ("roon_id", "subjects"))`,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_d23e0bd544a99ffe113f75e8c4" ON "room_subject" ("roon_id") `,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_07b5bf57c6d656a5841613f036" ON "room_subject" ("subjects") `,
        );
        await queryRunner.query(
            `ALTER TABLE "rooms" ADD "description" text NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE "room_subject" ADD CONSTRAINT "FK_d23e0bd544a99ffe113f75e8c46" FOREIGN KEY ("roon_id") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE "room_subject" ADD CONSTRAINT "FK_07b5bf57c6d656a5841613f0361" FOREIGN KEY ("subjects") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "room_subject" DROP CONSTRAINT "FK_07b5bf57c6d656a5841613f0361"`,
        );
        await queryRunner.query(
            `ALTER TABLE "room_subject" DROP CONSTRAINT "FK_d23e0bd544a99ffe113f75e8c46"`,
        );
        await queryRunner.query(
            `ALTER TABLE "rooms" DROP COLUMN "description"`,
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_07b5bf57c6d656a5841613f036"`,
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_d23e0bd544a99ffe113f75e8c4"`,
        );
        await queryRunner.query(`DROP TABLE "room_subject"`);
        await queryRunner.query(`DROP TABLE "subjects"`);
    }
}
