import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import {
	CurrentUser,
	ReqCurrentUser,
} from '../auth/decorators/current-user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ProfilePontuationUpdateRequest } from './dtos/requests/profile-pontuation-update.requests';
import { ProfilePontuationPersistenceService } from './services/profile-pontuation-persistence.service';
import { ProfilePontuationService } from './services/profile-pontuation.service';

@Controller('profile-pontuation')
export class ProfilePontuationController {
	constructor(
		private readonly profilePontuationService: ProfilePontuationService,
		private readonly profilePontuationPersistenceService: ProfilePontuationPersistenceService
	) {}

	@UseGuards(JwtGuard)
	@Get()
	public async findAll(@ReqCurrentUser() currentUser: CurrentUser) {
		return this.profilePontuationService.findAll();
	}

	@UseGuards(JwtGuard)
	@Put(':id')
	public async update(
		@Param('id') id: number,
		@Body() body: ProfilePontuationUpdateRequest
	): Promise<void> {
		await this.profilePontuationPersistenceService.update(id, body);
	}
}
