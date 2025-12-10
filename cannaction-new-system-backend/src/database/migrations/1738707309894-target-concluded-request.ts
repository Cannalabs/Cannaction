import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class TargetConcludedRequest1738707309894 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn('user_target', new TableColumn({
			name: 'concluded',
			type: 'boolean',
			isNullable: true,
		}));
		await queryRunner.addColumn('store_target', new TableColumn({
			name: 'concluded',
			type: 'boolean',
			isNullable: true,
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('store_target', 'concluded');
		await queryRunner.dropColumn('user_target', 'concluded');
	}

}
