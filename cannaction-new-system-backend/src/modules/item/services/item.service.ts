import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { PaginationOptionsDto } from '@/modules/database/pagination/pagination-options';
import { PaginationDto } from '@/modules/database/pagination/pagination.dto';
import { FilterSalesReportDto } from '@/modules/sale/dtos/requests/filter-sales-report.dto';
import { UserType } from '@/modules/user/enums/user-type.enum';
import { UserService } from '@/modules/user/services/user.service';
import { Injectable } from '@nestjs/common';
import { FindLabeledItemsRequest } from '../dtos/requests/find-labeled-items.request';
import { Item } from '../item.entity';
import { ItemRepository } from '../repositories/item.repository';

@Injectable()
export class ItemService {
	constructor(
		private readonly itemRepository: ItemRepository,
		private readonly userService: UserService
	) {}

	async findAll(currentUser: CurrentUser, search: string, options: PaginationOptionsDto): Promise<PaginationDto<Item>> {
		if (currentUser.userType !== UserType.STORE) {
			return this.itemRepository.findAll(currentUser, search, options);
		} else {
			const user = await this.userService.findOne(currentUser.userId);
			return this.itemRepository.findAllUserStore(user.store.id, search, options);
		}
	}

	async findOne(id: number): Promise<Item | undefined> {
		return this.itemRepository.findOne(id);
	}

	async findForSales(options: PaginationOptionsDto, filter: FilterSalesReportDto, countryId?: number): Promise<PaginationDto<Item>> {
		return this.itemRepository.findForSales(options, filter, countryId);
	}

	async findForSalesStoreUser(storeId: number, options: PaginationOptionsDto, filter: FilterSalesReportDto): Promise<PaginationDto<Item>> {
		return this.itemRepository.findForSalesStoreUser(storeId, options, filter);
	}

	async findForPointsStatement(currentUser: CurrentUser, filter: FilterSalesReportDto) {
		const user = await this.userService.findOne(currentUser.userId);
		return this.itemRepository.findForPointsStatement(user.store.id, filter);
	}

	async findListLabeled(filter?: FindLabeledItemsRequest) {
		return this.itemRepository.findListLabeled(filter);
	}

	async findByBarcode(currentUser: CurrentUser, barcode: string) {
		return this.itemRepository.findByBarcode(currentUser, barcode);
	}

	async findForExchange() {
		return this.itemRepository.findForExchange()
	}
}
