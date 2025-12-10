import { MigrationInterface, QueryRunner } from "typeorm";

export class StockChanges1726093012670 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.renameColumn('stock', 'amount', 'minimum_amount');
		await queryRunner.dropColumn('stock', 'balance');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}

}
