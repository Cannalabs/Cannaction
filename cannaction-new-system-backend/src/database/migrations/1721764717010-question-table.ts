import { getIdColumn, getTimestampColumns } from "@/utils/datasource-factory";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class QuestionTable1721764717010 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'question',
			schema: 'public',
			columns: [
				getIdColumn(),
				{
					name: 'question',
					type: 'character varying',
					isNullable: false
				},
				{
					name: 'type',
					type: 'character varying',
					isNullable: false
				},
				{
					name: 'options',
					type: 'character varying',
					isNullable: true,
					isArray: true
				},
				...getTimestampColumns()
			]
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('question');
	}

}
