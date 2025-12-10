import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AnswerForeignKeys1721935151748 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			'answer',
			new TableForeignKey({
				columnNames: ['quizz_id'],
				referencedTableName: 'quizz',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_answer_quizz',
			})
		);

		await queryRunner.createForeignKey(
			'answer',
			new TableForeignKey({
				columnNames: ['question_id'],
				referencedTableName: 'question',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_answer_question',
			})
		);

		await queryRunner.createForeignKey(
			'answer',
			new TableForeignKey({
				columnNames: ['user_id'],
				referencedTableName: 'user',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_answer_user',
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}

}
