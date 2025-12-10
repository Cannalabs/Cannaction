import { getIdColumn, getTimestampColumns } from "@/utils/datasource-factory";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AnswerTable1721681112128 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'answer',
			schema: 'public',
			columns: [
				getIdColumn(),
				{
					name: 'answer',
					type: 'character varying',
					isNullable: false,
				},
				{
					name: 'quizz_id',
					type: 'int',
					isNullable: false
				},
				{
					name: 'question_id',
					type: 'int',
					isNullable: false
				},
				{
					name: 'user_id',
					type: 'int',
					isNullable: false
				},
				...getTimestampColumns()

			]
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('answer');
	}

}
