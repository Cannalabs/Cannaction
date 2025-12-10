export interface CreateUserTargetByUserRequest {
    storeId: number;
    userId?: number;
	target: number;
	date: string;
	itemId: number;
    active: boolean;
}