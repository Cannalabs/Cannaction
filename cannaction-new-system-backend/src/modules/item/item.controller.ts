import {
	Body,
	Controller,
	Delete,
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
import { ItemCreateRequest } from './dtos/requests/create-item.request';
import { FindAllItemsRequest } from './dtos/requests/find-all-items.request';
import { FindLabeledItemsRequest } from './dtos/requests/find-labeled-items.request';
import { UpdateItemImageRequest } from './dtos/requests/update-item-image.request';
import { ItemUpdateRequest } from './dtos/requests/update-item.request';
import { Item } from './item.entity';
import { ItemPersistenceService } from './services/item-persistence.service';
import { ItemService } from './services/item.service';

@Controller('item')
export class ItemController {
	constructor(
		private readonly itemService: ItemService,
		private readonly itemPersistenceService: ItemPersistenceService
	) {}

	@UseGuards(JwtGuard)
	@Get(':id')
	public async findById(@Param('id') id: number) {
		return this.itemService.findOne(id);
	}

	@UseGuards(JwtGuard)
	@Get()
	public async findAll(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Query() params: FindAllItemsRequest,
		@Query() options: PaginationOptionsDto
	) {
		return this.itemService.findAll(currentUser, params.search, options);
	}

	@UseGuards(JwtGuard)
	@Get('exchange')
	public async findForExchange() {
		return this.itemService.findForExchange();
	}

	@UseGuards(JwtGuard)
	@Get('labeled')
	public async findLabeled(
		@Query() params: FindLabeledItemsRequest
	) {
		return this.itemService.findListLabeled(params);
	}

	@UseGuards(JwtGuard)
	@Get('points-statement')
	public async findForPointsStatement(@ReqCurrentUser() currentUser: CurrentUser, @Query() params: FindAllItemsRequest) {
		return this.itemService.findForPointsStatement(currentUser, params);
	}

	@UseGuards(JwtGuard)
	@Get(':barcode/by-barcode')
	public async findByBarcode(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Param('barcode') barcode: string
	) {
		return this.itemService.findByBarcode(currentUser, barcode);
	}

	@UseGuards(JwtGuard)
	@Put(':id')
	public async update(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Param('id') id: number,
		@Body() body: ItemUpdateRequest
	): Promise<Item> {
		return this.itemPersistenceService.update(id, body);
	}

	@UseGuards(JwtGuard)
	@Put(':id/inactive')
	public async inactive(@Param('id') id: number) {
		return this.itemPersistenceService.inactive(id);
	}

	@UseGuards(JwtGuard)
	@Put(':id/active')
	public async active(@Param('id') id: number) {
		return this.itemPersistenceService.active(id);
	}

	@UseGuards(JwtGuard)
	@Post()
	public async create(@Body() item: ItemCreateRequest): Promise<Item> {
		return this.itemPersistenceService.create(item);
	}

	@UseGuards(JwtGuard)
	@Delete(':id')
	public async delete(@Param('id') id: number): Promise<void> {
		await this.itemPersistenceService.delete(id);
	}

	@UseGuards(JwtGuard)
	@Put(':id/image')
	public async updateImage(@Param('id') id: number, @Body() body: UpdateItemImageRequest) {
		await this.itemPersistenceService.updateImage(id, body.image);
	}
}
