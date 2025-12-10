import { StoreEntity } from "./StoreEntity";
import UserEntity from "./UserEntity";

export interface ChangeShopEntity {
	id: number;
	user: UserEntity;
	originStore: StoreEntity;
	destinyStore: StoreEntity;
	reason: string;
    aproved?: boolean;
	answerDate?: string;
	createdAt: string;
	updatedAt: string;
}