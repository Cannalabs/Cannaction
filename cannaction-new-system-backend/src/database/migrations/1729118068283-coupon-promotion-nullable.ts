import { MigrationInterface, QueryRunner } from "typeorm";

export class CouponPromotionNullable1729118068283 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`alter table coupon alter column promotion_id DROP NOT NULL`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.query(
			`alter table coupon alter column promotion_id SET NOT NULL`
		);
	}

}
