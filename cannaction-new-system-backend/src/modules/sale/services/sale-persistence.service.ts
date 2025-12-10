import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { ExtractOperator } from '@/modules/extract/enums/extract-operator.enum';
import { ExtractPersistenceService } from '@/modules/extract/services/extract-persistence.service';
import { Item } from '@/modules/item/item.entity';
import { StockPersistenceService } from '@/modules/stock/services/stock-persistence.service';
import { StoreTargetPersistenceService } from '@/modules/store-target/services/store-target-persistence.service';
import { StorePersistenceService } from '@/modules/store/services/store-persistence.service';
import { StoreService } from '@/modules/store/services/store.service';
import { UserTargetPersistenceService } from '@/modules/user-target/services/user-target-persistence.service';
import { UserPersistenceService } from '@/modules/user/services/user-persistence.service';
import { UserService } from '@/modules/user/services/user.service';
import { User } from '@/modules/user/user.entity';
import { Injectable } from '@nestjs/common';
import { SaleCreateRequest } from '../dtos/requests/create-sale.request';
import { SaleRepository } from '../sale.repository';

@Injectable()
export class SalePersistenceService {
	constructor(
		private readonly saleRepository: SaleRepository,
		private readonly userService: UserService,
		private readonly userPersistenceService: UserPersistenceService,
		private readonly storePersistenceService: StorePersistenceService,
		private readonly storeService: StoreService,
		private readonly extractPersistenceService: ExtractPersistenceService,
		private readonly stockPersistenceService: StockPersistenceService,
		private readonly storeTargetPersistenceService: StoreTargetPersistenceService,
		private readonly userTargetPersistenceService: UserTargetPersistenceService
	) {}

	async create(
		currentUser: CurrentUser,
		newSale: SaleCreateRequest
	) {
		const user = await this.userService.findOne(currentUser.userId);
		const store = await this.storeService.findOne(user.store.id);
		for (const item of newSale.items) {
			if (!newSale.customerId) {
				await this.storePersistenceService.updateStorePoints(store.id, ExtractOperator.ADDITION, this.getStorePoints(item.points) * item.amount);
				await this.extractPersistenceService.createExtract(
					{
						itemId: item.itemId,
						points: this.getStorePoints(item.points),
						storeId: store.id,
						amount: item.amount,
						balance: store.points + (this.getStorePoints(item.points) * item.amount),
						description: 'Point Registration Stock: ' + item.name,
						operator: ExtractOperator.ADDITION
					});

				await this.storeTargetPersistenceService.addPoints(store.id, (this.getStorePoints(item.points) * item.amount));
				await this.stockPersistenceService.updateByPointsStatement(item.itemId, store.id, item.amount);
			} else {
				const customer = await this.userService.findOne(newSale.customerId);

				for (let i = 0; i < item.amount; i++) {
					const sale = await this.saleRepository.create(currentUser, { item: new Item({ id: item.itemId }), user: new User({ id: user.id }), customer });
					await this.saleRepository.addSaleToStore(sale.id, store.id);
					await this.stockPersistenceService.reduceAmountToStock(item.itemId, store.id);
				}

				await this.userPersistenceService.updateUserPoints(user.id, ExtractOperator.ADDITION, this.getStorePoints(item.points) * item.amount);
				await this.extractPersistenceService.createExtract(
					{
						itemId: item.itemId,
						points: this.getStorePoints(item.points),
						storeId: store.id,
						userId: user.id,
						amount: item.amount,
						balance: user.points + (this.getStorePoints(item.points) * item.amount),
						description: 'Point Registration Sale - User ' + user.name + ': ' + item.name,
						operator: ExtractOperator.ADDITION
					});
				await this.userTargetPersistenceService.addPoints(store.id, user.id, (this.getStorePoints(item.points) * item.amount));

				await this.userPersistenceService.updateUserPoints(customer.id, ExtractOperator.ADDITION, item.points * item.amount);
				await this.extractPersistenceService.createExtract(
					{
						itemId: item.itemId,
						points: item.points,
						storeId: store.id,
						userId: customer.id,
						amount: item.amount,
						balance: customer.points + (item.points * item.amount),
						description: 'Point Registration Sale: ' + item.name,
						operator: ExtractOperator.ADDITION
					});
			}
		}
	}

	private getStorePoints(value: number) {
		const percentage = value * 0.4;
		const firstDecimal = Math.floor((percentage * 10) % 10);

		if (firstDecimal <= 5) {
			return Math.floor(percentage);
		} else {
			return Math.ceil(percentage);
		}
	};

}
