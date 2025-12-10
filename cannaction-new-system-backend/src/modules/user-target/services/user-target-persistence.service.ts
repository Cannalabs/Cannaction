import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { ExtractOperator } from '@/modules/extract/enums/extract-operator.enum';
import { ExtractPersistenceService } from '@/modules/extract/services/extract-persistence.service';
import { Item } from '@/modules/item/item.entity';
import { CantRequestPrizeError } from '@/modules/store-target/errors/cant-request-prize.error';
import { Store } from '@/modules/store/store.entity';
import { UserPersistenceService } from '@/modules/user/services/user-persistence.service';
import { UserService } from '@/modules/user/services/user.service';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreateUserTargetByUserRequest } from '../dtos/requests/create-user-target-by-user.request';
import { CreateUserTargetRequest } from '../dtos/requests/create-user-target.request';
import { UpdateUserTargetRequest } from '../dtos/requests/update-user-target.request';
import { UserTargetNotCreatedError } from '../errors/user-target-not-created.error';
import { UserTargetNotFoundError } from '../errors/user-target-not-found.error';
import { UserTargetRepository } from '../user-target.repository';

@Injectable()
export class UserTargetPersistenceService {
	constructor(
		private readonly userTargetRepository: UserTargetRepository,
		private readonly userService: UserService,
		private readonly userPersistenceService: UserPersistenceService,
		private readonly extractPersistenceService: ExtractPersistenceService
	) {}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	async handleCron() {
		const expiredTargets = await this.userTargetRepository.findExpiredTargets();

		for (const target of expiredTargets) {
			await this.userTargetRepository.update({ id: target.id, success: false, active: false, concluded: true });
		}
	}

	async create(
		newTarget: CreateUserTargetRequest,
	) {
		const userList = await this.userService.findListByStore(newTarget.storeId);
		for (const user of userList) {
			if (user.points <= newTarget.target) throw new UserTargetNotCreatedError(`User ${user.name} has less points than new target! Set a target greater than ${user.points}.`);
		}
		if (new Date(newTarget.date) <= new Date())
			throw new UserTargetNotCreatedError('Target Date must be after the current date.');

		for (const user of userList) {
			await this.userTargetRepository.create({
				user,
				store: new Store({ id: newTarget.storeId }),
				target: newTarget.target,
				targetFinalDate: new Date(newTarget.date),
				progress: user.points,
				prizeItem: new Item({ id: newTarget.itemId }),
				active: false,
				success: user.points >= newTarget.target ? true : null,
				concluded: null
			})
		}
	}

	async createByUser(
		newTarget: CreateUserTargetByUserRequest,
	) {
		const user = await this.userService.findOne(newTarget.userId);
		if (newTarget.target <= user.points) throw new UserTargetNotCreatedError('Target must be greater than user points.');
		if (new Date(newTarget.date) <= new Date())
			throw new UserTargetNotCreatedError('Target Date must be after the current date.');

		await this.userTargetRepository.create({
			user,
			store: new Store({ id: newTarget.storeId }),
			target: newTarget.target,
			targetFinalDate: new Date(newTarget.date),
			progress: user.points,
			prizeItem: new Item({ id: newTarget.itemId }),
			active: newTarget.active,
			success: null,
			concluded: null
		})

	}

	async addPoints(storeId: number, userId: number, points: number) {
		const userTarget = await this.userTargetRepository.findActiveByStoreAndUser(storeId, userId);
		if (!userTarget || userTarget.success) return;

		if (userTarget.progress + points >= userTarget.target) {
			await this.userTargetRepository.update({ id: userTarget.id, progress: userTarget.progress + points, success: true });
		} else {
			await this.userTargetRepository.update({ id: userTarget.id, progress: userTarget.progress + points });
		}
	}

	async requestPrize(id: number) {
		const userTarget = await this.userTargetRepository.findOne(id);
		if (!userTarget) throw new UserTargetNotFoundError();
		if (!userTarget.success) throw new CantRequestPrizeError();

		await this.userTargetRepository.update({ id, concluded: false })
	}

	async concludeTarget(id: number) {
		const userTarget = await this.userTargetRepository.findOne(id);
		if (!userTarget) throw new UserTargetNotFoundError();
		if (!userTarget.success) throw new CantRequestPrizeError();

		await this.userTargetRepository.update({ id, concluded: true, active: false })
		await this.userPersistenceService.updateUserPoints(userTarget.user.id, ExtractOperator.DEDUCTION, userTarget.target);
		await this.extractPersistenceService.createExtract(
			{
				points: userTarget.target,
				storeId: userTarget.store.id,
				userId: userTarget.user.id,
				amount: 1,
				balance: userTarget.user.points - userTarget.target,
				description: 'Shopkeeper Target Reached',
				operator: ExtractOperator.DEDUCTION
			});
	}

	async inactive(id: number): Promise<void> {
		const userTarget = await this.userTargetRepository.findOne(id);
		if (!userTarget) throw new UserTargetNotFoundError();
		if (!userTarget.active) return;
		return this.userTargetRepository.inactive(id);
	}

	async active(id: number): Promise<void> {
		const userTarget = await this.userTargetRepository.findOne(id);
		if (!userTarget) throw new UserTargetNotFoundError();
		if (userTarget.active) return;
		return this.userTargetRepository.active(id);
	}

	async delete(id: number): Promise<void> {
		const userTarget = await this.userTargetRepository.findOne(id);
		if (!userTarget) return;
		await this.userTargetRepository.delete(id);
	}

	async update(id: number, body: UpdateUserTargetRequest) {
		const target = await this.userTargetRepository.findOne(id);
		if (!target) throw new UserTargetNotFoundError();
		if (new Date(body.date) <= new Date())
			throw new UserTargetNotCreatedError('Target Date must be after the current date.');

		await this.userTargetRepository.update({
			...target,
			prizeItem: body.itemId ? new Item({ id: body.itemId }) : target.prizeItem,
			targetFinalDate: body.date ? new Date(body.date) : target.targetFinalDate,
			target: body.target ? body.target : target.target,
			success: body.target && target.progress >= body.target ? true : null,
			active: body.active != null ? body.active : target.active
		})
	}

	async activeAllTargets(currentUser: CurrentUser) {
		const targetList = await this.userTargetRepository.findAllNotConcludedForActive(currentUser);

		for (const target of targetList) {
			await this.active(target.id);
		}
	}
}
