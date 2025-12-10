import { CityEntity } from './CityEntity';
import CountryEntity from './CountryEntity';
import { ItemEntity } from './ItemEntity';
import { StateEntity } from './StateEntity';
import UserEntity from './UserEntity';
import { SaleEntity } from './SaleEntity';

export interface StoreEntity {	
	id: number;
	name: string;
	contactEmail: string;
	contactTelephone: string;
	country: CountryEntity;
	state?: StateEntity;
	city?: CityEntity;
	address: string;
	logo?: string;
	slug?: string;
	active: boolean;
	points: number;
	masterUser: UserEntity;
	items: ItemEntity[];
	sales: SaleEntity[];
	workers: UserEntity[];
	createdAt: string;
	updatedAt: string;
	lastInteractionDate: string;
}
