import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CityForeignKey1721938193036 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			'city',
			new TableForeignKey({
				columnNames: ['state_id'],
				referencedTableName: 'state',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_city_state',
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}

}
