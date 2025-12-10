export interface ItemSale {
	itemId: number;
	amount: number;
	points: number;
	name: string;
}

export interface CreateSaleRequest {
    items: ItemSale[];
    customerId?: number;
}