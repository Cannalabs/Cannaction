import { MigrationInterface, QueryRunner } from "typeorm";

export class BarcodeColumnDrop1727481389642 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('item', 'bar_code');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}

}
