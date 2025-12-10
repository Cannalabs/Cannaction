import { getIdColumn, getTimestampColumns } from "@/utils/datasource-factory";
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class FriendInvitationEntity1728428550540 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'invite_friend',
			schema: 'public',
			columns: [
				getIdColumn(),
				{
					name: 'user_id',
					type: 'int',
					isNullable: false
				},
				{
					name: 'code',
					type: 'character varying',
					isNullable: false
				},
				{
					name: 'email',
					type: 'character varying',
					isNullable: false
				},
				{
					name: 'status',
					type: 'character varying',
					isNullable: false
				},
				...getTimestampColumns(),
			]
		}));

		await queryRunner.createForeignKey(
			'invite_friend',
			new TableForeignKey({
				columnNames: ['user_id'],
				referencedTableName: 'user',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_invite_friend_user',
			})
		);
	}


	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('invite_friend');
	}

}
