import { getIdColumn, getTimestampColumns } from "@/utils/datasource-factory";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ClubCardCodeList1741905851498 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'club_card_code_list',
			schema: 'public',
			columns: [
				getIdColumn(),
				{
					name: 'code',
					type: 'character varying',
					isNullable: false
				},
				{
					name: 'validated',
					type: 'boolean',
					isNullable: false,
					default: false
				},
				...getTimestampColumns(),
			]
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('club_card_code_list');
	}

}
