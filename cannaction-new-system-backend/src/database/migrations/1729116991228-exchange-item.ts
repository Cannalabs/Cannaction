import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ExchangeItem1729116991228 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn('item', new TableColumn({
			name: 'exchange',
			type: 'boolean',
			isNullable: false,
			default: false
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('item', 'exchange');
	}

}
