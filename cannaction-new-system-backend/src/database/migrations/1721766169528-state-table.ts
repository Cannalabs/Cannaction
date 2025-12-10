import { getIdColumn } from "@/utils/datasource-factory";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class StateTable1721766169528 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'state',
			schema: 'public',
			columns: [
				getIdColumn(),
				{
					name: 'country_id',
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
		await queryRunner.dropTable('state');
	}

}
