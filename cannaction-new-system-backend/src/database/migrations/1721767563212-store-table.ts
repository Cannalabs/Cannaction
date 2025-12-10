import { getIdColumn, getTimestampColumns } from "@/utils/datasource-factory";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class StoreTable1721767563212 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'store',
			schema: 'public',
			columns: [
				getIdColumn(),
				{
					name: 'name',
					type: 'character varying',
					isNullable: false
				},
				{
					name: 'contact_email',
					type: 'character varying',
					isNullable: true
				},
				{
					name: 'contact_telephone',
					type: 'character varying',
					isNullable: true
				},
				{
					name: 'country_id',
					type: 'int',
					isNullable: false
				},
				{
					name: 'state_id',
					type: 'int',
					isNullable: true
				},
				{
					name: 'city_id',
					type: 'int',
					isNullable: true
				},
				{
					name: 'address',
					type: 'character varying',
					isNullable: false
				},
				{
					name: 'logo',
					type: 'character varying',
					isNullable: true
				},
				{
					name: 'slug',
					type: 'character varying',
					isNullable: true
				},
				{
					name: 'active',
					type: 'boolean',
					isNullable: false
				},
				{
					name: 'points',
					type: 'int',
					isNullable: false,
					default: 0
				},
				{
					name: 'master_user_id',
					type: 'int',
					isNullable: false
				},
				...getTimestampColumns(),
				{
					name: 'last_interaction_date',
					type: 'timestamp with time zone',
					isNullable: false
				}
			]
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('store');
	}

}
