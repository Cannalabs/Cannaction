import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import {
	CurrentUser,
	ReqCurrentUser,
} from '../auth/decorators/current-user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { PaginationOptionsDto } from '../database/pagination/pagination-options';
import { PromotionCreateRequest } from './dtos/requests/create-promotion.request';
import { FilterPromotionReportDto } from './dtos/requests/filter-promotion-report.dto';
import { UpdatePromotionThumbRequest } from './dtos/requests/update-promotion-thumb.request';
import { PromotionUpdateRequest } from './dtos/requests/update-promotion.request';
import { PromotionPersistenceService } from './services/promotion-persistence.service';
import { PromotionService } from './services/promotion.service';

@Controller('promotion')
export class PromotionController {
	constructor(
		private readonly promotionService: PromotionService,
		private readonly promotionPersistenceService: PromotionPersistenceService
	) {}

	@UseGuards(JwtGuard)
	@Get(':id')
	public async findById(@Param('id') id: number) {
		return this.promotionService.findOne(id);
	}

	@UseGuards(JwtGuard)
	@Get(':id/by-country')
	public async findByCountry(@Param('id') id: number) {
		return this.promotionService.findByCountry(id);
	}

	@UseGuards(JwtGuard)
	@Post()
	public async create(@Body() body: PromotionCreateRequest) {
		return this.promotionPersistenceService.create(body);
	}

	@UseGuards(JwtGuard)
	@Put(':id')
	public async update(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Param('id') id: number,
		@Body() body: PromotionUpdateRequest
	) {
		await this.promotionPersistenceService.update(id, body);
	}

	@UseGuards(JwtGuard)
	@Get()
	public async findAll(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Query() filter: FilterPromotionReportDto,
		@Query() options: PaginationOptionsDto
	) {
		return this.promotionService.findAll(currentUser, filter, options);
	}

	@UseGuards(JwtGuard)
	@Get('store-user')
	public async findAllForStoreUser(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Query() filter: FilterPromotionReportDto,
		@Query() options: PaginationOptionsDto
	) {
		return this.promotionService.findAllForStoreUser(currentUser, filter, options);
	}

	@UseGuards(JwtGuard)
	@Get('customer-user')
	public async findAllForCustomerUser(
		@ReqCurrentUser() currentUser: CurrentUser,
	) {
		return this.promotionService.findAllForCustomerUser(currentUser);
	}

	@UseGuards(JwtGuard)
	@Put(':id/inactive')
	public async inactive(@Param('id') id: number) {
		return this.promotionPersistenceService.inactive(id);
	}

	@UseGuards(JwtGuard)
	@Get('labeled/:id')
	public async findLabeled(@Param('id') countryId: number) {
		return this.promotionService.findLabeled(countryId);
	}

	@UseGuards(JwtGuard)
	@Put(':id/active')
	public async active(@Param('id') id: number) {
		return this.promotionPersistenceService.active(id);
	}

	@UseGuards(JwtGuard)
	@Delete(':id')
	public async delete(@Param('id') id: number) {
		await this.promotionPersistenceService.delete(id);
	}

	@UseGuards(JwtGuard)
	@Put(':id/thumb')
	public async updateThumb(@Param('id') id: number, @Body() body: UpdatePromotionThumbRequest) {
		await this.promotionPersistenceService.updateThumb(id, body.image);
	}

}
