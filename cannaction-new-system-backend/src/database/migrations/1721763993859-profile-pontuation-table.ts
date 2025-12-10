import { getIdColumn, getTimestampColumns } from "@/utils/datasource-factory";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ProfilePontuationTable1721763993859 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'profile_pontuation',
			schema: 'public',
			columns: [
				getIdColumn(),
				{
					name: 'type',
					type: 'character varying',
					isNullable: false
				},
				{
					name: 'description',
					type: 'character varying',
					isNullable: false
				},
				{
					name: 'active',
					type: 'boolean',
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
		await queryRunner.dropTable('profile-pontuation');
	}

}
