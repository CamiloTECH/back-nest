import { MigrationInterface, QueryRunner } from "typeorm";

export class DefaultValues1722798327196 implements MigrationInterface {
    name = 'DefaultValues1722798327196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "date" SET DEFAULT '"2024-08-04T19:05:30.100Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "date" SET DEFAULT '2024-07-30'`);
    }

}
