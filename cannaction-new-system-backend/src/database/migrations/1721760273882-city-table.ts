import { getIdColumn } from "@/utils/datasource-factory";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CityTable1721760273882 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'city',
			schema: 'public',
			columns: [
				getIdColumn(),
				{
					name: 'state_id',
					type: 'int',
					isNullable: false
				},
				{
					name: 'name',
					type: 'character varying',
					isNullable: false
				}
			]
		})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('city');
	}

}
