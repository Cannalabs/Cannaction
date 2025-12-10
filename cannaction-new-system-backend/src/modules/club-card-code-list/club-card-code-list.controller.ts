import {
	Controller,
	Get,
	Query,
	UseGuards
} from '@nestjs/common';
import {
	CurrentUser,
	ReqCurrentUser,
} from '../auth/decorators/current-user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { PaginationOptionsDto } from '../database/pagination/pagination-options';
import { ClubCardCodeListService } from './club-card-code-list.service';
import { ClubCardCodeListRequest } from './dtos/club-card-code-list-filter.request';

@Controller('club-card-code-list')
export class ClubCardCodeListController {
	constructor(
		private readonly service: ClubCardCodeListService,
	) {}

	@UseGuards(JwtGuard)
	@Get()
	public async findAll(
		@ReqCurrentUser() currentUser: CurrentUser,
		@Query() params: ClubCardCodeListRequest,
		@Query() options: PaginationOptionsDto
	) {
		return this.service.findAll(params, options);
	}
}
