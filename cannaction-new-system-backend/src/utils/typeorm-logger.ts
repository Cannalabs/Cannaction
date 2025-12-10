import * as fs from 'fs';
import * as path from 'path';
import { Logger, QueryRunner } from 'typeorm';

export class CustomTypeOrmLogger implements Logger {
	private logFile = path.join(__dirname, '../../../logs/query.log');

	private write(message: string) {
		const timestamp = new Date().toISOString();
		const line = `[${timestamp}] ${message}\n`;
		fs.appendFileSync(this.logFile, line, { encoding: 'utf-8' });
	}

	logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
		this.write(`QUERY: ${query}${parameters?.length ? ` PARAMS: ${JSON.stringify(parameters)}` : ''}`);
	}

	logQueryError(error: string | Error, query: string, parameters?: any[], queryRunner?: QueryRunner) {
		this.write(`ERROR: ${query} - ${error}`);
	}

	logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
		this.write(`SLOW QUERY (${time}ms): ${query}`);
	}

	logSchemaBuild(message: string, queryRunner?: QueryRunner) {
		this.write(`SCHEMA BUILD: ${message}`);
	}

	logMigration(message: string, queryRunner?: QueryRunner) {
		this.write(`MIGRATION: ${message}`);
	}

	log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
		this.write(`${level.toUpperCase()}: ${message}`);
	}
}
