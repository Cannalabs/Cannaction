import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Item } from '../item/item.entity';
import { Sale } from '../sale/sale.entity';
import { Store } from '../store/store.entity';
import { UserType } from '../user/enums/user-type.enum';
import { User } from '../user/user.entity';
import { Country } from './country.entity';

@Injectable()
export class CountryRepository {
	constructor(
		@InjectRepository(Country)
		private repository: Repository<Country>
	) {}

	async findAll(): Promise<Country[]> {
		return this.repository.find({ where: { id: Not(20) } });
	}

	async findOne(id: number): Promise<Country | null> {
		return this.repository.findOne({
			where: { id },
		});
	}

	async getSalesByCountryId(countryId: number): Promise<number> {
		const queryBuilder = this.repository.manager
			.getRepository(Sale)
			.createQueryBuilder('sale');
		queryBuilder.innerJoinAndSelect('sale.stores', 'store');
		queryBuilder.innerJoinAndSelect('store.country', 'country');

		queryBuilder.andWhere('country.id = :id', { id: countryId });
		queryBuilder.andWhere('country.id <> 20');

		return queryBuilder.getCount();
	}

	async getSalesByItem(currentUser: CurrentUser, id: number): Promise<number> {
		const date = new Date();
		const queryBuilder = this.repository.manager
			.getRepository(Sale)
			.createQueryBuilder('sale');
		queryBuilder.innerJoinAndSelect('sale.item', 'item');
		queryBuilder.andWhere('CAST(sale.createdAt as DATE) > CAST(:startDate AS DATE)', { startDate: `${date.getFullYear() - 1}/12/31` });
		queryBuilder.andWhere('CAST(sale.createdAt as DATE) < CAST(:endDate AS DATE)', { endDate: `${date.getFullYear() + 1}/01/01` });

		if (currentUser.userType !== UserType.SUPER) {
			queryBuilder.innerJoinAndSelect('sale.stores', 'store');
			queryBuilder.innerJoinAndSelect('store.country', 'country');
			queryBuilder.andWhere('country.id = :countryId', { countryId: currentUser.userCountry });
		}

		queryBuilder.andWhere('item.id = :id', { id });

		return queryBuilder.getCount();
	}

	async findItemsForDashboard(currentUser: CurrentUser): Promise<Item[]> {
		const date = new Date();
		const queryBuilder = this.repository.manager
			.getRepository(Item)
			.createQueryBuilder('item');
		queryBuilder.innerJoin('item.sales', 'sale');

		if (currentUser.userType !== UserType.SUPER) {
			queryBuilder.innerJoin('sale.stores', 'store');
			queryBuilder.innerJoin('store.country', 'country');
			queryBuilder.andWhere('country.id = :countryId', {
				countryId: currentUser.userCountry,
			});
		}

		queryBuilder.andWhere('CAST(sale.createdAt as DATE) > CAST(:startDate AS DATE)', { startDate: `${date.getFullYear() - 1}/12/31` });
		queryBuilder.andWhere('CAST(sale.createdAt as DATE) < CAST(:endDate AS DATE)', { endDate: `${date.getFullYear() + 1}/01/01` });

		queryBuilder.select(['item.id', 'item.name']);

		return queryBuilder.getMany();
	}

	async findStoreListByCountry(countryId: number) {
		const queryBuilder = this.repository.manager
			.getRepository(Store)
			.createQueryBuilder('store');
		queryBuilder.innerJoin('store.country', 'country');
		queryBuilder.andWhere('country.id = :countryId', { countryId });
		return queryBuilder.getMany()
	}

	public async getTotalSalesByStore(storeId: number) {
		const date = new Date();
		const querySales = this.repository.manager.getRepository(Sale).createQueryBuilder('sale');
		querySales.innerJoin('sale.stores', 'store');
		querySales.andWhere('store.id = :storeId', { storeId });
		querySales.andWhere('CAST(sale.createdAt as DATE) > CAST(:startDate AS DATE)', { startDate: `${date.getFullYear() - 1}/12/31` });
		querySales.andWhere('CAST(sale.createdAt as DATE) < CAST(:endDate AS DATE)', { endDate: `${date.getFullYear() + 1}/01/01` });

		return querySales.getCount();
	}

	async findActiveStoresByCountry(countryId: number, active: boolean): Promise<number> {
		const queryBuilder = this.repository.manager
			.getRepository(Store)
			.createQueryBuilder('store');
		queryBuilder.innerJoin('store.country', 'country');
		queryBuilder.andWhere('country.id = :countryId', { countryId });
		queryBuilder.andWhere('store.active = :active', { active });
		return queryBuilder.getCount();
	}

	async findActiveUsersByCountry(countryId: number, active: boolean): Promise<number> {
		const queryBuilder = this.repository.manager
			.getRepository(User)
			.createQueryBuilder('user');
		queryBuilder.innerJoin('user.country', 'country');
		queryBuilder.andWhere('country.id = :countryId', { countryId });
		queryBuilder.andWhere('user.active = :active', { active });
		queryBuilder.andWhere('user.userType <> :userType', { userType: UserType.SUPER });
		return queryBuilder.getCount();
	}
}
