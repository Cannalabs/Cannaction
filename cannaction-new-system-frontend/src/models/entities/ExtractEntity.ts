import { ExtractOperatorEnum } from "../enums/ExtractOperator.enum";
import { ItemEntity } from "./ItemEntity";
import { StoreEntity } from "./StoreEntity";
import UserEntity from "./UserEntity";

export interface ExtractEntity {	
    id: number;
	store?: StoreEntity;
	item?: ItemEntity;
	user?: UserEntity;
	amount: number;
	description?: string;
	points: number;
	operator: ExtractOperatorEnum;
	total: number
	balance: number
	createdAt: string;
	updatedAt: string;
}