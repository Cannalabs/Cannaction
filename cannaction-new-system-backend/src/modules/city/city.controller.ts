import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { BasicAuthGuard } from '../auth/guards/basic.guard';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
	constructor(private readonly cityService: CityService) {}

	@Get(':id')
	public async findById(@Param('id') id: string) {
		return this.cityService.findOne(+id);
	}

	@UseGuards(BasicAuthGuard)
	@Get(':id/by-state')
	public async findByStateId(@Param('id') id: string) {
		return this.cityService.findByStateId(+id);
	}
}
