import { Country } from '@/modules/country/country.entity';
import { Item } from '@/modules/item/item.entity';
import { PromotionNotFoundError } from '@/modules/promotion/errors/promotion-not-found.error';
import { createBufferedAvatarImage } from '@/utils/image';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PromotionCreateRequest } from '../dtos/requests/create-promotion.request';
import { PromotionUpdateRequest } from '../dtos/requests/update-promotion.request';
import { PromotionRepository } from '../repositories/promotion.repository';
import { PromotionS3Repository } from '../repositories/promotion.s3.repository';

@Injectable()
export class PromotionPersistenceService {
	constructor(
		private readonly promotionRepository: PromotionRepository,
		private readonly promotionS3Repository: PromotionS3Repository
	) {}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	async handleCron() {
		const expiredPromotions = await this.promotionRepository.findExpiredPromotions();

		for (const promotion of expiredPromotions) {
			await this.promotionRepository.update(promotion.id, { active: false });
		}
	}

	async create(body: PromotionCreateRequest) {
		const promotion = await this.promotionRepository.create({
			name: body.name,
			emailText: body.emailText,
			country: new Country({ id: body.countryId }),
			coupons: body.maxCoupons,
			maxCoupons: body.maxCoupons,
			active: false,
			beginDate: new Date(body.beginDate),
			finalDate: new Date(body.finalDate),
			item: new Item({ id: body.itemId }),
			lastInteractionDate: new Date()
		});

		for (const store of body.storeIds) {
			await this.promotionRepository.addPromotionStore(promotion.id, store);
		}
	}

	async update(id: number, body: PromotionUpdateRequest) {
		const promotion = await this.promotionRepository.findOne(id);
		if (!promotion) throw new PromotionNotFoundError();

		await this.promotionRepository.update(id, {
			name: body.name,
			emailText: body.emailText,
			country: new Country({ id: body.countryId }),
			maxCoupons: body.maxCoupons,
			beginDate: new Date(body.beginDate),
			finalDate: new Date(body.finalDate),
			item: new Item({ id: body.itemId }),
			lastInteractionDate: new Date()
		});

		await this.promotionRepository.removePromotionStores(promotion.id);
		for (const store of body.storeIds) {
			await this.promotionRepository.addPromotionStore(promotion.id, store);
		}
	}

	async inactive(id: number): Promise<void> {
		const promotion = await this.promotionRepository.findOne(id);
		if (!promotion) throw new PromotionNotFoundError();
		if (!promotion.active) return;
		return this.promotionRepository.inactive(id);
	}

	async active(id: number): Promise<void> {
		const promotion = await this.promotionRepository.findOne(id);
		if (!promotion) throw new PromotionNotFoundError();
		if (promotion.active) return;
		return this.promotionRepository.active(id);
	}

	async delete(id: number) {
		await this.promotionRepository.delete(id);
	}

	async updateThumb(id: number, image: string) {
		const promotion = await this.promotionRepository.findOne(id);
		if (!promotion) throw new PromotionNotFoundError();

		const buffer = await createBufferedAvatarImage(image);

		const imageUrl = await this.promotionS3Repository.save(
			id,
			buffer
		);

		await this.promotionRepository.update(id, { thumb: imageUrl });
	}

	async reducePromotionCoupon(id: number) {
		const promotion = await this.promotionRepository.findOne(id);
		if (!promotion) throw new PromotionNotFoundError();

		await this.promotionRepository.update(id, { coupons: promotion.coupons - 1, active: (promotion.coupons - 1 == 0) ? false : true });
	}
}
