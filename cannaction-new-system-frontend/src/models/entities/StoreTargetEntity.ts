import { PrizeType } from "../enums/prizeType.enum";
import { ItemEntity } from "./ItemEntity";
import { StoreEntity } from "./StoreEntity";

export interface StoreTargetEntity {	
	id: number;
	store: StoreEntity;
	target: number;
	finalDateTarget: string;
	prizeType: PrizeType;
	prizeItem?: ItemEntity;
	prizeMoney?: number;
	progress: number;
	success?: boolean;
	active: boolean;
	createdAt: string;
	updatedAt: string;
	concluded?: boolean;
}