import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { LanguageService } from './services/language.service';

@Controller('language')
@UseGuards(JwtGuard)
export class LanguageController {
	constructor(private readonly languageService: LanguageService) {}

	@Get(':id')
	public async findById(@Param('id') id: string) {
		return this.languageService.findOne(+id);
	}

	@Public()
	@Get()
	public async findAll() {
		return this.languageService.findAll();
	}
}
