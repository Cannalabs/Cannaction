import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class CouponItemExchangeAmount1729201150436 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn('coupon', new TableColumn({
			name: 'item_amount',
			type: 'int',
			isNullable: true,
			default: 0
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('coupon', 'item_amount');
	}


}
