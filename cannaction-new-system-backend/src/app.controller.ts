import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
	@Get()
	getRoot() {
		return {
			message: 'Cannaction API is running',
			version: '1.0.0',
			endpoints: {
				health: '/api/health',
				auth: '/api/auth',
				countries: '/api/country',
				languages: '/api/language',
			},
		};
	}

	@Get('health')
	getHealth() {
		return {
			status: 'ok',
			timestamp: new Date().toISOString(),
		};
	}
}

