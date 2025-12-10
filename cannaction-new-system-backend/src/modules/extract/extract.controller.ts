import {
	Controller,
	Get,
	Query,
	UseGuards
} from '@nestjs/common';
import { CurrentUser, ReqCurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { PaginationOptionsDto } from '../database/pagination/pagination-options';
import { FindExtractByStoreIdRequest } from './dtos/request/find-extract-by-store-id.request';
import { ExtractService } from './services/extract.service';

@Controller('extract')
export class ExtractController {
	constructor(
		private readonly extractService: ExtractService
	) {}

	@UseGuards(JwtGuard)
	@Get()
	public async findByStoreId(
		@Query() params: FindExtractByStoreIdRequest,
		@Query() options: PaginationOptionsDto,
		@ReqCurrentUser() currentUser: CurrentUser) {
		return this.extractService.findByUser(
			currentUser,
			params,
			params.page && params.take ? { page: params.page, take: params.take, skip: params.page - 1 * params.take } : options);
	}
}
