export interface MetaDto {
	readonly page: number;
	readonly take: number;
	readonly itemCount: number;
	readonly pageCount: number;
	readonly hasPreviousPage: boolean;
	readonly hasNextPage: boolean;
}
export default interface ResponsePagination<T> {
	readonly data: T[];
	readonly meta: MetaDto;
}
