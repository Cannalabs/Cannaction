import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { BasicAuthGuard } from '../auth/guards/basic.guard';
import { StateService } from './state.service';

@Controller('state')
export class StateController {
	constructor(private readonly stateService: StateService) {}

	@Get(':id')
	public async findById(@Param('id') id: string) {
		return this.stateService.findOne(+id);
	}

	@Get()
	public async findAll() {
		return this.stateService.findAll();
	}

	@UseGuards(BasicAuthGuard)
	@Get(':id/by-country')
	public async findByCountryId(@Param('id') id: string) {
		return this.stateService.findByCountryId(+id);
	}
}
