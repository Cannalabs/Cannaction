import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator";
import { PaginationOptionsDto } from "@/modules/database/pagination/pagination-options";
import { UserType } from "@/modules/user/enums/user-type.enum";
import { UserService } from "@/modules/user/services/user.service";
import { Injectable } from "@nestjs/common";
import { FindExtractByStoreIdRequest } from "../dtos/request/find-extract-by-store-id.request";
import { ExtractRepository } from "../extract.repository";

@Injectable()
export class ExtractService {
	constructor(private readonly extractRepository: ExtractRepository, private readonly userService: UserService) {}

	async findByStore(storeId: number, search: string, options: PaginationOptionsDto) {
		return this.extractRepository.findByStore(storeId, search, options);
	}

	async findByUser(currentUser: CurrentUser, filter: FindExtractByStoreIdRequest, options: PaginationOptionsDto) {
		const user = await this.userService.findOne(currentUser.userId);
		if (user.userType === UserType.STORE && filter.byStore) {
			if (!user.store) return;
			return this.extractRepository.findByStore(user.store.id, filter.search, options);
		}
		if (filter.storeId) {
			return this.extractRepository.findByStore(filter.storeId, filter.search, options);
		}

		return this.extractRepository.findByUser(filter.userId ? filter.userId : user.id, filter.search, options);
	}

	async findByUserAndDescription(userId: number, description: string) {
		return this.extractRepository.findByUserAndDescription(userId, description);
	}
}