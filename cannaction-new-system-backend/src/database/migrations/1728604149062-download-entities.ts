import { getIdColumn, getTimestampColumns } from "@/utils/datasource-factory";
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class DownloadEntities1728604149062 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'folder',
			schema: 'public',
			columns: [
				getIdColumn(),
				{
					name: 'name',
					type: 'character varying',
					isNullable: false
				},
				...getTimestampColumns(),
			]
		}));

		await queryRunner.createTable(new Table({
			name: 'archive',
			schema: 'public',
			columns: [
				getIdColumn(),
				{
					name: 'name',
					type: 'character varying',
					isNullable: false
				},
				{
					name: 'patch',
					type: 'character varying',
					isNullable: false
				},
				{
					name: 'folder_id',
					type: 'int',
					isNullable: false
				},
				{
					name: 'country_id',
					type: 'int',
					isNullable: true
				},
				{
					name: 'user_type',
					type: 'character varying',
					isNullable: true
				},
				...getTimestampColumns(),
			]
		}));

		await queryRunner.createForeignKey(
			'archive',
			new TableForeignKey({
				columnNames: ['folder_id'],
				referencedTableName: 'folder',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_archive_folder',
			})
		);
	}


	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('archive');
		await queryRunner.dropTable('folder');
	}
}
