import { getIdColumn, getTimestampColumns } from "@/utils/datasource-factory";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ItemTable1721762197547 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'item',
			schema: 'public',
			columns: [
				getIdColumn(),
				{
					name: 'name',
					type: 'character varying',
					isNullable: false
				},
				{
					name: 'description',
					type: 'character varying',
					isNullable: true
				},
				{
					name: 'image',
					type: 'character varying',
					isNullable: true
				},
				{
					name: 'dots',
					type: 'int',
					isNullable: true
				},
				{
					name: 'active',
					type: 'boolean',
					isNullable: false
				},
				{
					name: 'bar_code',
					type: 'character varying',
					isNullable: false
				},
				{
					name: 'size',
					type: 'character varying',
					isNullable: true
				},
				{
					name: 'type',
					type: 'character varying',
					isNullable: false
				},
				{
					name: 'points',
					type: 'int',
					isNullable: false
				},
				...getTimestampColumns()
			]
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('item');
	}

}
