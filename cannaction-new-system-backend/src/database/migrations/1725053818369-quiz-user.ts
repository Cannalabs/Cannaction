import { getIdColumn, getTimestampColumns } from "@/utils/datasource-factory";
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class QuizUser1725053818369 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'quiz_user',
			schema: 'public',
			columns: [
				getIdColumn(),
				{
					name: 'user_id',
					type: 'int',
					isNullable: false
				},
				{
					name: 'quiz_id',
					type: 'int',
					isNullable: false
				},
				{
					name: 'answer_date',
					type: 'timestamp with time zone',
					isNullable: true
				},
				...getTimestampColumns(),
			]
		}));

		await queryRunner.createForeignKey(
			'quiz_user',
			new TableForeignKey({
				columnNames: ['quiz_id'],
				referencedTableName: 'quizz',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_quiz_user_quiz',
			})
		);
		await queryRunner.createForeignKey(
			'quiz_user',
			new TableForeignKey({
				columnNames: ['user_id'],
				referencedTableName: 'user',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_quiz_user_user',
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('quiz_user ');
	}

}
