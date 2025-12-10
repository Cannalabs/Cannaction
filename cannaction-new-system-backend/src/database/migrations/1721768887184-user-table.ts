import { getIdColumn, getTimestampColumns } from "@/utils/datasource-factory";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserTable1721768887184 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'user',
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
					isNullable: true
				},
				{
					name: 'last_name',
					type: 'character varying',
					isNullable: true
				},
				{
					name: 'nickname',
					type: 'character varying',
					isNullable: true
				},
				{
					name: 'email',
					type: 'character varying',
					isNullable: true
				},
				{
					name: 'password',
					type: 'character varying',
					isNullable: true
				},
				{
					name: 'telephone',
					type: 'character varying',
					isNullable: true
				},
				{
					name: 'birthdate',
					type: 'timestamp with time zone',
					isNullable: true
				},
				{
					name: 'gender',
					type: 'character varying',
					isNullable: true
				},
				{
					name: 'user_type',
					type: 'character varying',
					isNullable: false
				},
				{
					name: 'active',
					type: 'boolean',
					isNullable: false
				},
				{
					name: 'language_id',
					type: 'int',
					isNullable: false
				},
				{
					name: 'more_information',
					type: 'json',
					isNullable: true,
					isArray: true
				},
				{
					name: 'store_id',
					type: 'int',
					isNullable: true
				},
				{
					name: 'country_id',
					type: 'int',
					isNullable: false
				},
				{
					name: 'newsletter',
					type: 'boolean',
					isNullable: false
				},
				{
					name: 'points',
					type: 'int',
					isNullable: false,
					default: 0
				},
				...getTimestampColumns(),
				{
					name: 'last_interaction_date',
					type: 'timestamp with time zone',
					isNullable: true
				}
			]
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('user');
	}

}
