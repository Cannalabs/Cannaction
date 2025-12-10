import { IsNotEmpty } from "class-validator";

export class CreateChangeShopRequest {
	@IsNotEmpty({ message: 'Reason is mandatory' })
	reason: string;

	@IsNotEmpty({ message: 'New Store is mandatory' })
	storeId: number;
}