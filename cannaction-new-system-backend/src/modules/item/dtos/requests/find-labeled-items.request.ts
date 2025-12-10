import { IsOptional } from 'class-validator';

export class FindLabeledItemsRequest {
	@IsOptional()
	exchange?: boolean;
}
