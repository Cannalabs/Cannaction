import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CouponForeignKeys1721938973877 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			'coupon',
			new TableForeignKey({
				columnNames: ['promotion_id'],
				referencedTableName: 'promotion',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_coupon_promotion',
			})
		);

		await queryRunner.createForeignKey(
			'coupon',
			new TableForeignKey({
				columnNames: ['item_id'],
				referencedTableName: 'item',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_coupon_item',
			})
		);

		await queryRunner.createForeignKey(
			'coupon',
			new TableForeignKey({
				columnNames: ['user_id'],
				referencedTableName: 'user',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_coupon_user',
			})
		);

		await queryRunner.createForeignKey(
			'coupon',
			new TableForeignKey({
				columnNames: ['store_id'],
				referencedTableName: 'store',
				referencedColumnNames: ['id'],
				referencedSchema: 'public',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				name: 'fk_coupon_store',
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}

}
