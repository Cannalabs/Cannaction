import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { City } from '@/modules/city/city.entity';
import { Country } from '@/modules/country/country.entity';
import { ExtractOperator } from '@/modules/extract/enums/extract-operator.enum';
import { ExtractPersistenceService } from '@/modules/extract/services/extract-persistence.service';
import { ProfilePontuationService } from '@/modules/profile-pontuation/services/profile-pontuation.service';
import { State } from '@/modules/state/state.entity';
import { StoreNotFoundError } from '@/modules/store/errors/store-not-found.error';
import { UserNotCreatedError } from '@/modules/user/errors/user-not-created.error';
import { UserPersistenceService } from '@/modules/user/services/user-persistence.service';
import { User } from '@/modules/user/user.entity';
import { createBufferedAvatarImage } from '@/utils/image';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateStoreByMarketingRequest } from '../dtos/requests/create-store-by-marketing.request';
import { StoreCreateRequest } from '../dtos/requests/create-store.request';
import { UpdateStoreByMarketingRequest } from '../dtos/requests/update-store-by-marketing.request';
import { UpdateStoreRequest } from '../dtos/requests/update-store.request';
import { StoreNotCreatedError } from '../errors/store-not-created.error';
import { StoreRepository } from '../repositories/store.repository';
import { StoreS3Repository } from '../repositories/store.s3.repository';
import { Store } from '../store.entity';

@Injectable()
export class StorePersistenceService {
	constructor(
		private readonly storeRepository: StoreRepository,
		private readonly storeS3Repository: StoreS3Repository,
		@Inject(forwardRef(() => UserPersistenceService)) private readonly userPersistenceService: UserPersistenceService,
		private readonly extractPersistenceService: ExtractPersistenceService,
		private readonly profilePontuationService: ProfilePontuationService
	) {}

	async createbyUser(
		newStore: StoreCreateRequest,
		user: User,
		country: Country,
		active: boolean
	): Promise<Store> {
		const storeByName = await this.storeRepository.findByName(newStore.name);
		if (storeByName)
			throw new UserNotCreatedError('Store with this name already exists.');

		return this.storeRepository.create({
			name: newStore.name,
			active,
			contactEmail: newStore.contactEmail,
			contactTelephone: newStore.contactTelephone,
			masterUser: user,
			address: newStore.address,
			country,
			// city,
			// state,
			lastInteractionDate: new Date(),
		});
	}

	async update(id: number, body: UpdateStoreRequest): Promise<Store> {
		const storeAccount = await this.storeRepository.findOne(id);
		if (!storeAccount) throw new StoreNotFoundError();
		return this.storeRepository.update({ id, ...body });
	}

	async updateStoreSlug(id: number, slug: string) {
		const storeAccount = await this.storeRepository.findOne(id);
		if (!storeAccount) throw new StoreNotFoundError();
		await this.storeRepository.update({ id, slug: slug !== 'undefined' ? slug : null });
	}

	async inactive(id: number): Promise<void> {
		const store = await this.storeRepository.findOne(id);
		if (!store) throw new StoreNotFoundError();
		if (!store.active) return;
		return this.storeRepository.inactive(id);
	}

	async active(id: number): Promise<void> {
		const store = await this.storeRepository.findOne(id);
		if (!store) throw new StoreNotFoundError();
		if (store.active) return;
		return this.storeRepository.active(id);
	}

	async createByMarketing(currentUser: CurrentUser, body: CreateStoreByMarketingRequest) {
		const storeByName = await this.storeRepository.findByName(
			body.storeName
		);
		if (storeByName) throw new StoreNotCreatedError('Store name already in use.');

		const store = await this.storeRepository.create({
			name: body.storeName,
			active: true,
			contactEmail: body.storeContactEmail ? body.storeContactEmail : null,
			contactTelephone: body.storeContactTelephone ?? null,
			address: body.storeAddress ?? null,
			masterUser: body.masterUserId ? new User({ id: body.masterUserId }) : null,
			country: new Country({ id: body.countryId }),
			city: body.cityId ? new City({ id: body.cityId }) : null,
			state: body.stateId ? new State({ id: body.stateId }) : null,
			lastInteractionDate: new Date(),
		});

		if (body.masterUserId) {
			await this.userPersistenceService.update(body.masterUserId, { store: new Store({ id: store.id }) });
		}

		for (const workerId of body.workers) {
			if (body.masterUserId && workerId == body.masterUserId) continue;
			await this.userPersistenceService.update(workerId, { store: new Store({ id: store.id }) });
		}

		const pontuations = await this.profilePontuationService.findAll();


		await this.extractPersistenceService.createExtract({
			storeId: store.id,
			amount: 1,
			points: pontuations.find(pp => pp.id == 1).points,
			operator: ExtractOperator.ADDITION,
			description: 'Signup points. Welcome to Cannaction!',
			balance: pontuations.find(pp => pp.id == 2).points
		});
		await this.updateStorePoints(store.id, ExtractOperator.ADDITION, pontuations.find(pp => pp.id == 2).points);
	}

	async updateByMarketing(currentUser: CurrentUser, id: number, body: UpdateStoreByMarketingRequest) {
		const store = await this.storeRepository.findOne(id);
		if (!store) throw new StoreNotFoundError();

		await this.storeRepository.update({
			id,
			name: body.storeName,
			active: true,
			contactEmail: body.storeContactEmail,
			contactTelephone: body.storeContactTelephone,
			address: body.storeAddress,
			masterUser: new User({ id: body.masterUserId }),
			country: new Country({ id: body.countryId }),
			city: new City({ id: body.cityId }),
			state: new State({ id: body.stateId }),
			lastInteractionDate: new Date(),
		});

		await this.userPersistenceService.removeStoreWorkers(store.id);

		if (body.masterUserId) {
			await this.userPersistenceService.updateByMarketing(body.masterUserId, { storeId: store.id });
		}

		for (const workerId of body.workers) {
			await this.userPersistenceService.updateByMarketing(workerId, { storeId: store.id });
		}
	}

	async updateStorePoints(id: number, operator: ExtractOperator, points: number) {
		const store = await this.storeRepository.findOne(id);

		if (operator === ExtractOperator.ADDITION) {
			await this.storeRepository.update({ id, points: store.points + points });
		} else {
			await this.storeRepository.update({ id, points: store.points - points });
		}
	}

	async updateStoreLogo(id: number, image: string) {
		const user = await this.storeRepository.findOne(id);
		if (!user) throw new StoreNotFoundError();

		const buffer = await createBufferedAvatarImage(image);

		const imageUrl = await this.storeS3Repository.save(
			id,
			buffer
		);

		await this.storeRepository.update({ id, logo: imageUrl });
	}
}
