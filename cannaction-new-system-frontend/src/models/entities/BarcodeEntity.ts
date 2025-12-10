import CountryEntity from './CountryEntity';
import { ItemEntity } from './ItemEntity';

export interface BarcodeEntity {
	id: number;
	item: ItemEntity;
	country: CountryEntity;
	barcode: string;
	createdAt: string;
	updatedAt: string;
}
