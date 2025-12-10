import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Put,
	Query,
	UseGuards,
} from '@nestjs/common';
import {
	CurrentUser,
	ReqCurrentUser,
} from '../auth/decorators/current-user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { PaginationOptionsDto } from '../database/pagination/pagination-options';
import { AcceptChangeShopsRequest } from './dtos/requests/accept-change-shop.request';
import { CreateChangeShopRequest } from './dtos/requests/create-change-shop.request';
import { FindChangeShopsRequest } from './dtos/requests/find-change-shops-request';
import { ChangeShopPersistenceService } from './services/change-shop-persistence.service';
import { ChangeShopService } from './services/change-shop.service';

@Controller('change-shop')
export class ChangeShopController {
	constructor(
		private readonly changeShopService: ChangeShopService,
		private readonly changeShopPersistenceService: ChangeShopPersistenceService
	) {}

	@UseGuards(JwtGuard)
	@Get()
	public async findAll(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Query() params: FindChangeShopsRequest,
		@Query() optionsAnswered: PaginationOptionsDto,
		@Query() optionsNotAnswered: PaginationOptionsDto
	) {
		return this.changeShopService.findAll(
			currentUser,
			params.search,
			params.searchAnswered,
			optionsAnswered,
			optionsNotAnswered
		);
	}

	@UseGuards(JwtGuard)
	@Get('customer')
	public async findForCustomer(@ReqCurrentUser() currentUser: CurrentUser, @Query() options: PaginationOptionsDto) {
		return this.changeShopService.findForCustomer(currentUser, options);
	}

	@UseGuards(JwtGuard)
	@Post()
	public async create(@ReqCurrentUser() currentUser: CurrentUser, @Body() body: CreateChangeShopRequest) {
		await this.changeShopPersistenceService.createChangeShopRequest(currentUser, body);
	}

	@UseGuards(JwtGuard)
	@Put(':id')
	public async acceptChangeShop(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Param('id') id: number,
		@Body() body: AcceptChangeShopsRequest
	): Promise<void> {
		await this.changeShopPersistenceService.acceptChangeShop(id, body.accept);
	}
}
