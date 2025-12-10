import { getIdColumn, getTimestampColumns } from "@/utils/datasource-factory";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class QuizzTable1721765499075 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'quizz',
			schema: 'public',
			columns: [
				getIdColumn(),
				{
					name: 'description',
					type: 'character varying',
					isNullable: false
				},
				{
					name: 'points',
					type: 'int',
					isNullable: false
				},
				{
					name: 'published',
					type: 'boolean',
					isNullable: false
				},
				{
					name: 'country_id',
					type: 'int',
					isNullable: false
				},
				...getTimestampColumns()
			]
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('quizz');
	}

}
