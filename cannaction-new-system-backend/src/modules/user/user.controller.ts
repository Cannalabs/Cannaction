import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UseGuards
} from '@nestjs/common';
import {
	CurrentUser,
	ReqCurrentUser,
} from '../auth/decorators/current-user.decorator';
import { BasicAuthGuard } from '../auth/guards/basic.guard';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { PaginationOptionsDto } from '../database/pagination/pagination-options';
import { UserCreateByMarketingRequest } from './dtos/requests/create-user-by-marketing.request';
import { CreateClubCardUserRequest } from './dtos/requests/create-user-club-card.request';
import { UserCreateRequest } from './dtos/requests/create-user.request';
import { FilterClubCardUserRequest } from './dtos/requests/filter-club-user-request';
import { FilterUserLabeledDto } from './dtos/requests/filter-user-labeled.request';
import { FilterUsersDto } from './dtos/requests/filter-user.request';
import { UpdateClubCardUserRequest } from './dtos/requests/update-club-card-user-request';
import { UpdateUserByMarketingRequest } from './dtos/requests/update-user-by-marketing.request';
import { UpdateUserProfilePicRequest } from './dtos/requests/update-user-profile-pic.request';
import { UpdateUserProfileRequest } from './dtos/requests/update-user-profile.request';
import { UserPersistenceService } from './services/user-persistence.service';
import { UserService } from './services/user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly userPersistenceService: UserPersistenceService
	) {}

	@UseGuards(JwtGuard)
	@Get(':id')
	public async findById(
		@Param('id') id: string
	) {
		return this.userService.findOne(+id);
	}

	@UseGuards(JwtGuard)
	@Get('club-card-code/:code')
	public async findByClubCardCode(
		@Param('code') code: string,
		@ReqCurrentUser() currentUser: CurrentUser
	) {
		return this.userService.findByClubCardCode(currentUser, code);
	}

	@UseGuards(JwtGuard)
	@Get()
	public async findAll(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Query() filter: FilterUsersDto,
		@Query() options: PaginationOptionsDto
	) {
		return this.userService.findAll(currentUser, filter, options);
	}

	@UseGuards(JwtGuard)
	@Put(':id/inactive')
	public async inactive(@Param('id') id: string) {
		return this.userPersistenceService.inactive(+id);
	}

	@UseGuards(JwtGuard)
	@Put(':id/active')
	public async active(@Param('id') id: string) {
		return this.userPersistenceService.active(+id);
	}

	@UseGuards(BasicAuthGuard)
	@Post()
	public async create(@Body() body: UserCreateRequest): Promise<User> {
		return this.userPersistenceService.create(body);
	}

	@UseGuards(JwtGuard)
	@Get('club-card')
	public async getClubCardUsers(@ReqCurrentUser() currentUser: CurrentUser, @Query() filter: FilterClubCardUserRequest, @Query() options: PaginationOptionsDto) {
		return this.userService.findAllClubCard(currentUser, filter.search, options)
	}

	@UseGuards()
	@Get('labeled')
	public async findLabeled(@Query() filter: FilterUserLabeledDto) {
		return this.userService.findLabeled(filter);
	}

	@UseGuards(JwtGuard)
	@Post('club-card-user')
	public async createClubCardUser(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Body() body: CreateClubCardUserRequest
	): Promise<void> {
		await this.userPersistenceService.createClubCardUser(currentUser, body);
	}

	@UseGuards(JwtGuard)
	@Put(':id/club-card-user')
	public async updateClubCardUser(
		@Param('id') id: number,
		@Body() body: UpdateClubCardUserRequest
	): Promise<void> {
		await this.userPersistenceService.updatedClubCardUser(id, body);
	}

	@UseGuards(JwtGuard)
	@Delete(':id/club-card-user')
	public async deleteClubCardUser(@Param('id') id: number) {
		await this.userPersistenceService.deleteClubCardUser(id);
	}

	@UseGuards(JwtGuard)
	@Post('create-by-marketing')
	public async createUserByMarketing(
		@Body() body: UserCreateByMarketingRequest
	) {
		await this.userPersistenceService.createByMarketing(body);
	}

	@UseGuards(JwtGuard)
	@Put(':id/update-by-marketing')
	public async updateByMarketing(@Param('id') id: number, @Body() body: UpdateUserByMarketingRequest) {
		return this.userPersistenceService.updateByMarketing(id, body);
	}

	@UseGuards(JwtGuard)
	@Put(':id/generate-password')
	public async generatePassword(@Param('id') id: number) {
		return this.userPersistenceService.generateNewPassword(id);
	}

	@UseGuards(JwtGuard)
	@Put(':id/update-profile')
	public async updateUserProfile(@Param('id') id: number, @Body() body: UpdateUserProfileRequest) {
		await this.userPersistenceService.updateUserProfile(id, body);
	}

	@UseGuards(JwtGuard)
	@Put(':id/profile-pic')
	public async updateUserProfilepic(@Param('id') id: number, @Body() body: UpdateUserProfilePicRequest) {
		await this.userPersistenceService.updateProfilePic(id, body.image);
	}
}
