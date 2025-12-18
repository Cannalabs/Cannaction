import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UserProfilePicColumn1766057156865 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		// Check if column already exists before adding
		const table = await queryRunner.getTable('user');
		const profilePicColumn = table?.findColumnByName('profile_pic');
		
		if (!profilePicColumn) {
			await queryRunner.addColumn('user', new TableColumn({
				name: 'profile_pic',
				type: 'character varying',
				isNullable: true
			}));
		}
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		// Check if column exists before dropping
		const table = await queryRunner.getTable('user');
		const profilePicColumn = table?.findColumnByName('profile_pic');
		
		if (profilePicColumn) {
			await queryRunner.dropColumn('user', 'profile_pic');
		}
	}

}

