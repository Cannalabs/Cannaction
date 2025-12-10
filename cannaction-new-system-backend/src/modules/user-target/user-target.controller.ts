import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
//import { FilterUserTargetReportDto } from './dtos/requests/filter-user-target-report.dto';
import { CurrentUser, ReqCurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { PaginationOptionsDto } from '../database/pagination/pagination-options';
import { CreateUserTargetByUserRequest } from './dtos/requests/create-user-target-by-user.request';
import { CreateUserTargetRequest } from './dtos/requests/create-user-target.request';
import { FilterUserTargetReportDto } from './dtos/requests/filter-user-target-report.dto';
import { UpdateUserTargetRequest } from './dtos/requests/update-user-target.request';
import { UserTargetPersistenceService } from './services/user-target-persistence.service';
import { UserTargetService } from './services/user-target.service';

@Controller('user-target')
export class UserTargetController {
	constructor(
		private readonly userTargetService: UserTargetService,
		private readonly userTargetPersistenceService: UserTargetPersistenceService
	) {}

	@UseGuards(JwtGuard)
	@Get('find-for-marketing')
	public async findAll(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Query() filter: FilterUserTargetReportDto,
		@Query() optionsConcluded: PaginationOptionsDto,
		@Query() optionsNotConcluded: PaginationOptionsDto
	) {
		return this.userTargetService.findForMarketingUserTargets(currentUser, filter, optionsConcluded, optionsNotConcluded);
	}

	@UseGuards(JwtGuard)
	@Get('find-requested')
	public async findRequestedTargets(@ReqCurrentUser() currentUser: CurrentUser) {
		return this.userTargetService.findAllRequested(currentUser);
	}

	@UseGuards(JwtGuard)
	@Get(':storeId/by-user/:userId')
	public async findByUser(@Param('storeId') storeId: number, @Param('userId') userId: number) {
		return this.userTargetService.findByUser(userId, storeId);
	}

	@UseGuards(JwtGuard)
	@Put(':id')
	public async update(@Param('id') id: number, @Body() body: UpdateUserTargetRequest) {
		await this.userTargetPersistenceService.update(id, body);
	}

	@UseGuards(JwtGuard)
	@Put('active-all')
	public async activeAllTargets(@ReqCurrentUser() currentUser: CurrentUser) {
		await this.userTargetPersistenceService.activeAllTargets(currentUser);
	}

	@UseGuards(JwtGuard)
	@Put(':id/request-prize')
	public async requestTargetPrize(@Param('id') id: number) {
		return this.userTargetPersistenceService.requestPrize(id);
	}

	@UseGuards(JwtGuard)
	@Put(':id/conclude-target')
	public async concludeTarget(@Param('id') id: number) {
		return this.userTargetPersistenceService.concludeTarget(id);
	}

	@UseGuards(JwtGuard)
	@Put(':id/inactive')
	public async inactive(@Param('id') id: string) {
		return this.userTargetPersistenceService.inactive(+id);
	}

	@UseGuards(JwtGuard)
	@Put(':id/active')
	public async active(@Param('id') id: string) {
		return this.userTargetPersistenceService.active(+id);
	}

	@UseGuards(JwtGuard)
	@Delete(':id')
	public async delete(@Param('id') id: number) {
		await this.userTargetPersistenceService.delete(id);
	}

	@UseGuards(JwtGuard)
	@Post()
	public async create(@Body() body: CreateUserTargetRequest) {
		await this.userTargetPersistenceService.create(body);
	}

	@UseGuards(JwtGuard)
	@Post('by-user')
	public async createByUser(@Body() body: CreateUserTargetByUserRequest) {
		await this.userTargetPersistenceService.createByUser(body);
	}

	/*
	@UseGuards(JwtGuard)
	@Get(':id')
	public async findById(@Param('id') id: string) {
		return this.userTargetService.findOne(+id);
	}
	*/
}
