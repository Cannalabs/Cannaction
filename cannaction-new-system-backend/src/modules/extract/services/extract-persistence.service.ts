import { Item } from "@/modules/item/item.entity";
import { Store } from "@/modules/store/store.entity";
import { UserService } from "@/modules/user/services/user.service";
import { User } from "@/modules/user/user.entity";
import { Injectable } from "@nestjs/common";
import { CreateExtractRequest } from "../dtos/request/create-extract.request";
import { Extract } from "../extract.entity";
import { ExtractRepository } from "../extract.repository";

@Injectable()
export class ExtractPersistenceService {
	constructor(private readonly extractRepository: ExtractRepository, private readonly userService: UserService) {}

	async createExtract(body: CreateExtractRequest) {
		const extract = new Extract({ ...body });
		extract.total = body.points * body.amount;
		extract.store = body.storeId ? new Store({ id: body.storeId }) : null;
		extract.user = body.userId ? new User({ id: body.userId }) : null;
		extract.item = body.itemId ? new Item({ id: body.itemId }) : null;
		await this.extractRepository.create(extract);
	}
}