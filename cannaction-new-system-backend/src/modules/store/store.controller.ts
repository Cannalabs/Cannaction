import { PaginationOptionsDto } from '@/modules/database/pagination/pagination-options';
import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import {
	CurrentUser,
	ReqCurrentUser,
} from '../auth/decorators/current-user.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UpdateUserProfilePicRequest } from '../user/dtos/requests/update-user-profile-pic.request';
import { CreateStoreByMarketingRequest } from './dtos/requests/create-store-by-marketing.request';
import { FilterStoreListDto } from './dtos/requests/filter-store-list.dto';
import { UpdateStoreByMarketingRequest } from './dtos/requests/update-store-by-marketing.request';
import { StorePersistenceService } from './services/store-persistence.service';
import { StoreService } from './services/store.service';

@Controller('store')
export class StoreController {
	constructor(
		private readonly storeService: StoreService,
		private readonly storePersistenceService: StorePersistenceService
	) {}

	@UseGuards(JwtGuard)
	@Get(':id')
	public async findById(@Param('id') id: string) {
		return this.storeService.findOne(+id);
	}

	@UseGuards(JwtGuard)
	@Get('labeled')
	public async findLabeled(@ReqCurrentUser() currentUser: CurrentUser) {
		return this.storeService.findLabeled(currentUser);
	}

	@Public()
	@Get(':id/by-country')
	public async findByCountry(@Param('id') id: number) {
		return this.storeService.findByCountry(id);
	}

	@UseGuards(JwtGuard)
	@Get()
	public async findAll(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Query() filter: FilterStoreListDto,
		@Query() options: PaginationOptionsDto
	) {
		return this.storeService.findAll(currentUser, filter, options);
	}

	@UseGuards(JwtGuard)
	@Get(':id/workers')
	public async findStoreWorkers(
		@Param('id') id: number,
		@Query() filter: FilterStoreListDto,
		@Query() options: PaginationOptionsDto
	) {
		return this.storeService.findStoreWorkers(id, filter, options);
	}

	@UseGuards(JwtGuard)
	@Get(':id/settings-for-marketing')
	public async findStoreSettings(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Param('id') id: number,
	) {
		return this.storeService.findDataForStoreSettings(currentUser, id);
	}

	@Put(':id/inactive')
	public async inactive(@Param('id') id: string) {
		return this.storePersistenceService.inactive(+id);
	}

	@Put(':id/active')
	public async active(@Param('id') id: string) {
		return this.storePersistenceService.active(+id);
	}

	@UseGuards(JwtGuard)
	@Post('create-by-marketing')
	public async createUserByMarketing(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Body() body: CreateStoreByMarketingRequest
	) {
		await this.storePersistenceService.createByMarketing(currentUser, body);
	}

	@UseGuards(JwtGuard)
	@Put(':id/update-by-marketing')
	public async updateByMarketing(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Param('id') id: number,
		@Body() body: UpdateStoreByMarketingRequest
	) {
		return this.storePersistenceService.updateByMarketing(currentUser, id, body);
	}

	@UseGuards(JwtGuard)
	@Put(':id/update-store-slug/:slug')
	public async update(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Param('id') id: number,
		@Param('slug') slug: string,
	) {
		return this.storePersistenceService.updateStoreSlug(id, slug);
	}

	@UseGuards(JwtGuard)
	@Get('store-dashboard')
	public async findStoreDashboardData(
		@ReqCurrentUser() currentUser: CurrentUser
	) {
		return this.storeService.findStoreUserDashboardData(currentUser);
	}

	@UseGuards(JwtGuard)
	@Put(':id/logo')
	public async updateUserProfilepic(@Param('id') id: number, @Body() body: UpdateUserProfilePicRequest) {
		await this.storePersistenceService.updateStoreLogo(id, body.image);
	}
}
