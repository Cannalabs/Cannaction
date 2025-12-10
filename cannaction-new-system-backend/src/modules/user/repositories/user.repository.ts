
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, DeepPartial, Repository } from 'typeorm';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { PaginationService } from '../../database/pagination.service';
import { PaginationOptionsDto } from '../../database/pagination/pagination-options';
import { PaginationDto } from '../../database/pagination/pagination.dto';
import { FilterUserLabeledDto } from '../dtos/requests/filter-user-labeled.request';
import { FilterUsersDto } from '../dtos/requests/filter-user.request';
import { UserType } from '../enums/user-type.enum';
import { User } from '../user.entity';

@Injectable()
export class UserRepository {
	constructor(
		@InjectRepository(User)
		private repository: Repository<User>,
		private readonly paginationService: PaginationService
	) {}

	async findAll(
		currentUser: CurrentUser,
		filter: FilterUsersDto,
		options: PaginationOptionsDto,
		storeId?: number
	): Promise<PaginationDto<User>> {
		const queryBuilder = this.repository.manager
			.getRepository(User)
			.createQueryBuilder('user');
		queryBuilder.innerJoin('user.country', 'country');
		queryBuilder.leftJoin('user.store', 'store');

		if (currentUser.userType !== UserType.SUPER || filter.countryId) {
			const countryId =
				currentUser.userType != UserType.SUPER
					? currentUser.userCountry
					: Number(filter.countryId);
			queryBuilder.andWhere('country.id = :countryId', {
				countryId,
			});
		}

		if (filter.stateId) {
			queryBuilder.innerJoin('store.state', 'state');
			queryBuilder.andWhere('state.id = :state', { state: filter.stateId });
		}

		if (filter.cityId) {
			queryBuilder.innerJoin('store.city', 'city');
			queryBuilder.andWhere('city.id = :city', { city: filter.cityId });
		}

		if (filter.search) {
			queryBuilder.andWhere(
				new Brackets((qb) => {
					const searchTerm = `%${filter.search.toLowerCase()}%`;
					return qb
						.where('LOWER(store.name) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(user.name) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(user.lastName) LIKE :searchTerm', {
							searchTerm,
						});
				})
			);
		}

		if (storeId || filter.storeId) {
			queryBuilder.andWhere('store.id = :storeId', { storeId: filter.storeId ? filter.storeId : storeId });
			queryBuilder.andWhere('user.userType = :customer', { customer: UserType.CUSTOMER });
			queryBuilder.select([
				'user.id',
				'user.name',
				'user.code',
				'user.lastName',
				'user.nickname',
				'user.email',
				'user.birthdate',
				'user.active',
				'user.lastInteractionDate',
				'user.gender',
				'user.points'
			]);
		} else {
			queryBuilder.andWhere('user.userType <> :clubCard', {
				clubCard: UserType.CLUB_CARD,
			});

			queryBuilder.andWhere('user.userType <> :super', {
				super: UserType.SUPER,
			});
			queryBuilder.select([
				'user.id',
				'user.name',
				'user.lastName',
				'user.email',
				'user.userType',
				'user.active',
				'user.lastInteractionDate',
				'store.id',
				'store.name',
				'country.id',
				'country.name',
			]);
		}

		queryBuilder.orderBy('user.createdAt', 'DESC');

		return this.paginationService.paginate<User>(options, queryBuilder);
	}

	async findAllClubCard(currentUser: CurrentUser, search: string, options: PaginationOptionsDto, storeId?: number): Promise<PaginationDto<User>> {
		const queryBuilder = this.repository.manager
			.getRepository(User)
			.createQueryBuilder('user');
		queryBuilder.innerJoinAndSelect('user.store', 'store');
		queryBuilder.innerJoinAndSelect('store.country', 'country');

		queryBuilder.andWhere('user.userType = :clubCard', {
			clubCard: UserType.CLUB_CARD
		});

		if (storeId) {
			queryBuilder.andWhere('store.id = :storeId', { storeId });
		}

		if (currentUser.userType !== UserType.SUPER) {
			queryBuilder.andWhere('country.id = :countryId', {
				countryId: currentUser.userCountry,
			});
		}

		if (search) {
			queryBuilder.andWhere(
				new Brackets((qb) => {
					const searchTerm = `%${search.toLowerCase()}%`;
					return qb
						.where('LOWER(store.name) LIKE :searchTerm', {
							searchTerm,
						})
						.orWhere('LOWER(user.code) LIKE :searchTerm', {
							searchTerm,
						});
				})
			)
		}

		queryBuilder.orderBy('user.createdAt', 'DESC');

		return this.paginationService.paginate<User>(options, queryBuilder);
	}

	async findOne(id: number): Promise<User | null> {
		return this.repository.findOne({
			where: { id },
			relations: ['language', 'store', 'country'],
		});
	}

	async findByClubCardCode(code: string, storeId: number) {
		return this.repository.findOne({ where: { code, store: { id: storeId } } });
	}

	async findClubCardUserForLogin(code: string) {
		const queryBuilder = this.repository.manager
			.getRepository(User)
			.createQueryBuilder('user');
		queryBuilder.innerJoinAndSelect('user.store', 'store');
		queryBuilder.innerJoinAndSelect('store.country', 'country');

		queryBuilder.andWhere('user.userType = :clubCard', {
			clubCard: UserType.CLUB_CARD
		});
		queryBuilder.andWhere('user.code = :code', {
			code
		});

		queryBuilder.select(['user.id', 'user.code', 'user.password']);
		return queryBuilder.getOne();
	}

	async inactive(id: number): Promise<void> {
		await this.repository.update(id, { active: false });
	}

	async active(id: number): Promise<void> {
		await this.repository.update(id, { active: true });
	}

	async create(entity: DeepPartial<User>): Promise<User | null> {
		const user = await this.repository.save(entity);
		return this.findOne(user.id);
	}

	async update(entity: DeepPartial<User>): Promise<User> {
		await this.repository.update(entity.id, entity);
		return this.findOne(entity.id);
	}

	async updateByMarketing(id: number, body: DeepPartial<User>) {
		await this.repository.update(id, body);
		return this.findOne(id);
	}

	async findForAuth(emailOrNickname: string): Promise<User> {
		const queryBuilder = this.repository.manager
			.getRepository(User)
			.createQueryBuilder('user');

		queryBuilder.innerJoin('user.country', 'country');
		queryBuilder.innerJoin('user.language', 'language');
		queryBuilder.where('user.nickname = :emailOrNickname', { emailOrNickname });
		queryBuilder.orWhere('user.email = :emailOrNickname', { emailOrNickname });
		queryBuilder.orWhere('user.code = :emailOrNickname', { emailOrNickname });
		queryBuilder.select([
			'user.id',
			'user.email',
			'user.nickname',
			'user.password',
			'user.active',
			'user.userType',
			'country.id',
			'country.name',
			'language.id',
			'language.code',
		]);

		return queryBuilder.getOne();
	}

	async findLabeled(filter: FilterUserLabeledDto): Promise<User[]> {
		const queryBuilder = this.repository.manager
			.getRepository(User)
			.createQueryBuilder('user');

		queryBuilder.innerJoin('user.country', 'country');

		if (filter.countryId) {
			queryBuilder.andWhere('country.id = :countryId', {
				countryId: filter.countryId,
			});
		}

		if (filter.userType) {
			queryBuilder.andWhere('user.userType = :userType', { userType: filter.userType });
		}

		if (filter.active) {
			queryBuilder.andWhere('user.active = :active', { active: filter.active });
		}

		queryBuilder.orderBy('user.name', 'ASC');
		queryBuilder.select(['user.id', 'user.name', 'user.lastName']);

		return queryBuilder.getMany();
	}

	async findStoreWorkersList(id: number) {
		return this.repository.find({ where: { userType: UserType.STORE, store: { id } } });
	}

	async findCountByStore(storeId: number) {
		const queryBuilder = this.repository.manager
			.getRepository(User)
			.createQueryBuilder('user');
		queryBuilder.innerJoin('user.store', 'store');
		queryBuilder.andWhere('user.active = true');
		queryBuilder.andWhere('user.userType = :userType', { userType: UserType.CUSTOMER });
		queryBuilder.andWhere('store.id = :storeId', { storeId });
		return queryBuilder.getCount();
	}

	async findListByStore(storeId: number) {
		return this.repository.find({ where: { store: { id: storeId }, userType: UserType.STORE, active: true } });
	}

	async findForForgotPassword(email: string): Promise<User> {
		const queryBuilder = this.repository.manager
			.getRepository(User)
			.createQueryBuilder('user');

		queryBuilder.andWhere('user.active = true');
		queryBuilder.andWhere('user.email = :email', { email });

		return queryBuilder.getOne();
	}

	async findByNickname(nickname: string) {
		const user = await this.repository.findOne({ where: { nickname } });
		return user;
	}

	async findByEmail(email: string) {
		const user = await this.repository.findOne({ where: { email } });
		return user;
	}

	async deleteClubCardUser(id: number) {
		await this.repository.delete(id);
	}
}
