import { ExtractOperator } from '@/modules/extract/enums/extract-operator.enum';
import { ExtractPersistenceService } from '@/modules/extract/services/extract-persistence.service';
import { Item } from '@/modules/item/item.entity';
import { StorePersistenceService } from '@/modules/store/services/store-persistence.service';
import { StoreService } from '@/modules/store/services/store.service';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreateStoreTargetRequest } from '../dtos/requests/create-store-target.request';
import { UpdateStoreTargetRequest } from '../dtos/requests/update-store-target.request';
import { PrizeType } from '../enums/prize-type.enum';
import { CantRequestPrizeError } from '../errors/cant-request-prize.error';
import { StoreTargetNotCreatedError } from '../errors/store-target-not-created.error';
import { StoreTargetNotFoundError } from '../errors/store-target-not-found.error';
import { StoreTargetRepository } from '../store-target.repository';

@Injectable()
export class StoreTargetPersistenceService {
	constructor(
		private readonly storeTargetRepository: StoreTargetRepository,
		private readonly storeService: StoreService,
		private readonly storePersistenceService: StorePersistenceService,
		private readonly extractPersistenceService: ExtractPersistenceService
	) {}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	async handleCron() {
		const expiredTargets = await this.storeTargetRepository.findExpiredTargets();

		for (const target of expiredTargets) {
			await this.storeTargetRepository.update({ id: target.id, success: false, active: false, concluded: true });
		}
	}

	async create(newTarget: CreateStoreTargetRequest) {

		if (newTarget.prizeType === PrizeType.ITEM && !newTarget.prizeItemId)
			throw new StoreTargetNotCreatedError('Prize item is mandatory for Targets with Item as prizes.');
		if (newTarget.prizeType === PrizeType.POINTS && !newTarget.prizeMoney)
			throw new StoreTargetNotCreatedError('Prize Money is mandatory for Targets with Money as prizes.');
		if (new Date(newTarget.finalDateTarget) <= new Date())
			throw new StoreTargetNotCreatedError('Target Date must be after the current date.');
		const store = await this.storeService.findOne(newTarget.storeId);
		if (newTarget.target <= store.points)
			throw new StoreTargetNotCreatedError(`Target must be greater than store current points.`);

		await this.storeTargetRepository.create({
			store,
			prizeType: newTarget.prizeType,
			prizeItem: newTarget.prizeType === PrizeType.ITEM ? new Item({ id: newTarget.prizeItemId }) : null,
			prizeMoney: newTarget.prizeType === PrizeType.ITEM ? null : newTarget.prizeMoney,
			target: newTarget.target,
			finalDateTarget: new Date(newTarget.finalDateTarget),
			progress: store.points,
			active: false,
			success: store.points >= newTarget.target ? true : null,
			concluded: null
		});
	}

	async update(id: number, body: UpdateStoreTargetRequest) {
		const target = await this.storeTargetRepository.findOne(id);
		if (!target) throw new StoreTargetNotFoundError();
		if (new Date(body.finalDateTarget) <= new Date())
			throw new StoreTargetNotCreatedError('Target Date must be after the current date.');
		if (body.target <= target.store.points)
			throw new StoreTargetNotCreatedError(`Target must be greater than store current points.`);

		await this.storeTargetRepository.update({
			...target,
			prizeType: body.prizeType,
			prizeItem: body.prizeType === PrizeType.ITEM && body.prizeItemId ? new Item({ id: body.prizeItemId }) : null,
			prizeMoney: body.prizeType === PrizeType.POINTS && body.prizeMoney ? body.prizeMoney : null,
			finalDateTarget: body.finalDateTarget ? new Date(body.finalDateTarget) : target.finalDateTarget,
			target: body.target ? body.target : target.target,
			success: body.target && target.progress >= body.target ? true : null,
		})
	}

	async addPoints(storeId: number, points: number) {
		const storeTarget = await this.storeTargetRepository.findActiveByStore(storeId);
		if (!storeTarget || storeTarget.success) return;

		if (storeTarget.progress + points >= storeTarget.target) {
			await this.storeTargetRepository.update({ id: storeTarget.id, progress: storeTarget.progress + points, success: true, active: true });
		} else {
			await this.storeTargetRepository.update({ id: storeTarget.id, progress: storeTarget.progress + points });
		}
	}

	async requestPrize(id: number) {
		const storeTarget = await this.storeTargetRepository.findOne(id);
		if (!storeTarget) throw new StoreTargetNotFoundError();
		if (!storeTarget.success) throw new CantRequestPrizeError();

		await this.storeTargetRepository.update({ id, concluded: false })
	}

	async concludeTarget(id: number) {
		const storeTarget = await this.storeTargetRepository.findOne(id);
		if (!storeTarget) throw new StoreTargetNotFoundError();
		if (!storeTarget.success) throw new CantRequestPrizeError();

		await this.storeTargetRepository.update({ id, concluded: true, active: false })
		await this.storePersistenceService.updateStorePoints(storeTarget.store.id, ExtractOperator.DEDUCTION, storeTarget.target);
		await this.extractPersistenceService.createExtract(
			{
				points: storeTarget.target,
				storeId: storeTarget.store.id,
				amount: 1,
				balance: storeTarget.store.points - storeTarget.target,
				description: 'Store Target Reached',
				operator: ExtractOperator.DEDUCTION
			});
	}

	async inactive(id: number): Promise<void> {
		const storeTarget = await this.storeTargetRepository.findOne(id);
		if (!storeTarget) throw new StoreTargetNotFoundError();
		if (!storeTarget.active) return;
		return this.storeTargetRepository.inactive(id);
	}

	async active(id: number): Promise<void> {
		const storeTarget = await this.storeTargetRepository.findOne(id);
		if (!storeTarget) throw new StoreTargetNotFoundError();
		if (storeTarget.active) return;
		return this.storeTargetRepository.active(id);
	}

	async delete(id: number): Promise<void> {
		const storeTarget = await this.storeTargetRepository.findOne(id);
		if (!storeTarget) return;
		await this.storeTargetRepository.delete(id);
	}
}
