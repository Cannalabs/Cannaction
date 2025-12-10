import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { Store } from '@/modules/store/store.entity';
import { UserPersistenceService } from '@/modules/user/services/user-persistence.service';
import { UserService } from '@/modules/user/services/user.service';
import { Injectable } from '@nestjs/common';
import { ChangeShop } from '../change-shop.entity';
import { ChangeShopRepository } from '../change-shop.repository';
import { CreateChangeShopRequest } from '../dtos/requests/create-change-shop.request';
import { ChangeShopNotFoundError } from '../errors/change-shop-not-found.error';

@Injectable()
export class ChangeShopPersistenceService {
	constructor(
		private readonly changeShopRepository: ChangeShopRepository,
		private readonly userService: UserService,
		private readonly userPersistenceService: UserPersistenceService
	) {}

	async createChangeShopRequest(currentUser: CurrentUser, body: CreateChangeShopRequest) {
		const user = await this.userService.findOne(currentUser.userId);
		const changeShop = new ChangeShop({ user, reason: body.reason, originStore: new Store({ id: user.store.id }), destinyStore: new Store({ id: body.storeId }), aproved: null, answerDate: null })
		await this.changeShopRepository.create(changeShop);
	}

	async acceptChangeShop(changeShopId: number, accept: boolean): Promise<void> {
		const changeShop = await this.changeShopRepository.findOne(changeShopId);
		if (!changeShop) throw new ChangeShopNotFoundError();
		await this.changeShopRepository.acceptChangeShop(changeShopId, accept);
		if (accept) {
			await this.userPersistenceService.update(changeShop.user.id, { store: new Store({ id: changeShop.destinyStore.id }) });
		}
	}
}
