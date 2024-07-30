import { MigrationInterface, QueryRunner } from "typeorm";

export class Roles1722303320677 implements MigrationInterface {
    name = 'Roles1722303320677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "date" SET DEFAULT '"2024-07-30T01:35:22.758Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "date" SET DEFAULT '2024-07-28'`);
    }

}
