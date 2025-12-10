import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class StateForeignKeys1721956276120 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			'state',
			new TableForeignKey({
				columnNames: ['country_id'],
				referencedTableName: 'country',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_state_country',
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}

}
