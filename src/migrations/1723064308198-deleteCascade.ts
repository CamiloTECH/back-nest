import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteCascade1723064308198 implements MigrationInterface {
    name = 'DeleteCascade1723064308198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "date" SET DEFAULT '"2024-08-07T20:58:30.522Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "date" SET DEFAULT '2024-08-07'`);
    }

}
