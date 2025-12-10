import { getIdColumn, getTimestampColumns } from "@/utils/datasource-factory";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class NewsletterTable1721763723949 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'newsletter',
			schema: 'public',
			columns: [
				getIdColumn(),
				{
					name: 'title',
					type: 'character varying',
					isNullable: false
				},
				{
					name: 'description',
					type: 'character varying',
					isNullable: false
				},
				{
					name: 'footer',
					type: 'character varying',
					isNullable: false
				},
				{
					name: 'published',
					type: 'boolean',
					isNullable: false
				},
				{
					name: 'user_type',
					type: 'character varying',
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
		await queryRunner.dropTable('newsletter');
	}

}
