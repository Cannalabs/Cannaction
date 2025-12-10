import { ItemEntity } from "./ItemEntity";
import { StoreEntity } from "./StoreEntity";

export interface StockEntity {		
	id: number;
	store: StoreEntity;
	item: ItemEntity;
	input: number;
	output: number;
	minimumAmount: number;
	total: number;
	createdAt: string;
	updatedAt: string;
}