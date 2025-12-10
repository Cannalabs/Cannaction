import { getIdColumn, getTimestampColumns } from "@/utils/datasource-factory";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ExtractTable1721761526980 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'extract',
			schema: 'public',
			columns: [
				getIdColumn(),
				{
					name: 'store_id',
					type: 'int',
					isNullable: true
				},
				{
					name: 'item_id',
					type: 'int',
					isNullable: true
				},
				{
					name: 'description',
					type: 'character varying',
					isNullable: true
				},
				{
					name: 'points',
					type: 'int',
					isNullable: false
				},
				{
					name: 'operator',
					type: 'character varying',
					isNullable: false
				},
				{
					name: 'total',
					type: 'int',
					isNullable: false
				},
				{
					name: 'balance',
					type: 'int',
					isNullable: false
				},
				...getTimestampColumns()
			]
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('extract');
	}

}
