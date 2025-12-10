import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { PaginationOptionsDto } from '@/modules/database/pagination/pagination-options';
import { Injectable } from '@nestjs/common';
import { ChangeShopRepository } from '../change-shop.repository';
import { CheckChangeShopResponseDto } from '../dtos/responses/check-change-shop-response';

@Injectable()
export class ChangeShopService {
	constructor(private readonly changeShopRepository: ChangeShopRepository) {}

	async findAll(
		currentUser: CurrentUser,
		search: string,
		searchAnswered: string,
		optionsAnswered: PaginationOptionsDto,
		optionsNotAnswered: PaginationOptionsDto
	): Promise<CheckChangeShopResponseDto> {
		const answered = await this.changeShopRepository.findAnswered(
			currentUser,
			searchAnswered,
			optionsAnswered
		);
		const notAnswered = await this.changeShopRepository.findNotAnswered(
			currentUser,
			search,
			optionsNotAnswered
		);
		return { answered, notAnswered };
	}

	async findForCustomer(currentUser: CurrentUser, options: PaginationOptionsDto) {
		return this.changeShopRepository.findForCustomer(currentUser.userId, options);
	}
}
