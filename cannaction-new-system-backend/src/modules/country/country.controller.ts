import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
	CurrentUser,
	ReqCurrentUser,
} from '../auth/decorators/current-user.decorator';
import { BasicAuthGuard } from '../auth/guards/basic.guard';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CountryService } from './services/country.service';

@Controller('country')
export class CountryController {
	constructor(private readonly countryService: CountryService) {}

	@UseGuards(JwtGuard)
	@Get('marketing-dashboard')
	public async getMarketingDashboardData(
		@ReqCurrentUser() currentUser: CurrentUser
	) {
		return this.countryService.getMarketingDashboardData(currentUser);
	}

	@UseGuards(JwtGuard)
	@Get(':id')
	public async findById(@Param('id') id: string) {
		return this.countryService.findOne(+id);
	}

	@UseGuards(BasicAuthGuard)
	@Get()
	public async findAll() {
		return this.countryService.findAll();
	}
}
