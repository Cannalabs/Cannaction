import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class SaleCustomer1725581433434 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn('sale', new TableColumn({
			name: 'customer_id',
			type: 'int',
			isNullable: true,
		}));

		await queryRunner.createForeignKey(
			'sale',
			new TableForeignKey({
				columnNames: ['customer_id'],
				referencedTableName: 'user',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_sale_customer',
			})
		);

	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('sale', 'customer');
	}
}
