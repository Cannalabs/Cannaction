import { getIdColumn } from "@/utils/datasource-factory";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class LanguageTable1721763543415 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'language',
			schema: 'public',
			columns: [
				getIdColumn(),
				{
					name: 'code',
					type: 'character varying',
					isNullable: false
				},
				{
					name: 'name',
					type: 'character varying',
					isNullable: false
				}
			]
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('language');
	}

}
