import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
//import { FilterStoreTargetReportDto } from './dtos/requests/filter-store-target-report.dto';
import { CurrentUser, ReqCurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { PaginationOptionsDto } from '../database/pagination/pagination-options';
import { UserType } from '../user/enums/user-type.enum';
import { CreateStoreTargetRequest } from './dtos/requests/create-store-target.request';
import { FilterStoreTargetReportDto } from './dtos/requests/filter-store-target-report.dto';
import { UpdateStoreTargetRequest } from './dtos/requests/update-store-target.request';
import { StoreTargetPersistenceService } from './services/store-target-persistence.service';
import { StoreTargetService } from './services/store-target.service';

@Controller('store-target')
export class StoreTargetController {
	constructor(
		private readonly storeTargetService: StoreTargetService,
		private readonly storeTargetPersistenceService: StoreTargetPersistenceService
	) {}

	@UseGuards(JwtGuard)
	@Get('find-for-marketing')
	public async findAll(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Query() filter: FilterStoreTargetReportDto,
		@Query() optionsConcluded: PaginationOptionsDto,
		@Query() optionsNotConcluded: PaginationOptionsDto
	) {
		return this.storeTargetService.findForMarketingStoreTargets(currentUser, filter, optionsConcluded, optionsNotConcluded);
	}

	@UseGuards(JwtGuard)
	@Get('super/get-target-sum')
	public async getTargetSum(@ReqCurrentUser() currentUser: CurrentUser, @Query() query: FilterStoreTargetReportDto) {
		if (currentUser.userType !== UserType.SUPER) return;
		return this.storeTargetService.getPointTargetSum(query.countryId);
	}

	@UseGuards(JwtGuard)
	@Get('find-requested')
	public async findRequestedTargets(@ReqCurrentUser() currentUser: CurrentUser) {
		return this.storeTargetService.findAllRequested(currentUser);
	}

	@UseGuards(JwtGuard)
	@Put(':id')
	public async update(@Param('id') id: number, @Body() body: UpdateStoreTargetRequest) {
		await this.storeTargetPersistenceService.update(id, body);
	}

	@UseGuards(JwtGuard)
	@Put(':id/request-prize')
	public async requestTargetPrize(@Param('id') id: number) {
		return this.storeTargetPersistenceService.requestPrize(id);
	}

	@UseGuards(JwtGuard)
	@Put(':id/conclude-target')
	public async concludeTarget(@Param('id') id: number) {
		return this.storeTargetPersistenceService.concludeTarget(id);
	}

	@UseGuards(JwtGuard)
	@Put(':id/inactive')
	public async inactive(@Param('id') id: string) {
		return this.storeTargetPersistenceService.inactive(+id);
	}

	@UseGuards(JwtGuard)
	@Put(':id/active')
	public async active(@Param('id') id: string) {
		return this.storeTargetPersistenceService.active(+id);
	}

	@UseGuards(JwtGuard)
	@Delete(':id')
	public async delete(@Param('id') id: number) {
		await this.storeTargetPersistenceService.delete(id);
	}

	@UseGuards(JwtGuard)
	@Post()
	public async create(@Body() body: CreateStoreTargetRequest) {
		await this.storeTargetPersistenceService.create(body);
	}


}
