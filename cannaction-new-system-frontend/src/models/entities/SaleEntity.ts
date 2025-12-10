import { ItemEntity } from './ItemEntity';
import { StoreEntity } from './StoreEntity';
import UserEntity from './UserEntity';

export interface SaleEntity {
	id: number;
	item: ItemEntity;
	user: UserEntity;
	stores: StoreEntity[];
	createdAt: Date;
	updatedAt: Date;
}
