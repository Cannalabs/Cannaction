import { Type } from 'class-transformer';
import { IsEnum, IsOptional, Max, Min } from 'class-validator';

enum Order {
	ASC = 'ASC',
	DESC = 'DESC',
}

export class PaginationOptionsDto {
	@IsEnum(Order)
	@IsOptional()
	readonly order?: Order = Order.ASC;

	@Type(() => Number)
	@Min(1)
	@IsOptional()
	readonly page?: number = 1;

	@Type(() => Number)
	@Min(0)
	@Max(100)
	@IsOptional()
	readonly take?: number = 10;

	get skip(): number {
		return (this.page - 1) * this.take;
	}
}
