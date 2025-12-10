import { ItemEntity } from "./ItemEntity";
import { StoreEntity } from "./StoreEntity";
import UserEntity from "./UserEntity";

export interface UserTargetEntity {
    id: number;
	store: StoreEntity;
	user: UserEntity;
	prizeItem: ItemEntity;
	target: number;
	progress: number;
	success?: boolean;
	active: boolean;
	targetFinalDate: string;
	createdAt: string;
	updatedAt: string;
	concluded?: boolean;
}