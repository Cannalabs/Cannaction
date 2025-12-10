import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class PromotionMaxCoupon1727908081575 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn('promotion', new TableColumn({
			name: 'max_coupons',
			type: 'int',
			isNullable: false,
			default: 0
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('promotion', 'max_coupons');
	}

}
