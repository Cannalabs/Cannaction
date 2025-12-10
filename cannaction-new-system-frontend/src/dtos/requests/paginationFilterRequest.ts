export enum Order {
	ASC = 'ASC',
	DESC = 'DESC',
}

export default interface PaginationFilterRequest {
	order?: Order;
	page?: number;
	take?: number;
}
