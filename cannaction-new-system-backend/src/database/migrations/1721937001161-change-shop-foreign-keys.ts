import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class ChangeShopForeignKeys1721937001161 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			'change_shop',
			new TableForeignKey({
				columnNames: ['user_id'],
				referencedTableName: 'user',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_change_shop_user',
			})
		);

		await queryRunner.createForeignKey(
			'change_shop',
			new TableForeignKey({
				columnNames: ['origin_store_id'],
				referencedTableName: 'store',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
				name: 'fk_change_shop_store_origin',
			})
		);

		await queryRunner.createForeignKey(
			'change_shop',
			new TableForeignKey({
				columnNames: ['destiny_store_id'],
				referencedTableName: 'store',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
				name: 'fk_change_shop_store_destiny',
			})
		);

	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}

}
