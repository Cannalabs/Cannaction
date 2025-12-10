import env from '@/config/env';
import { TableColumnOptions } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { CustomTypeOrmLogger } from './typeorm-logger';

export const getDbConfig = (): PostgresConnectionOptions => {
	return {
		type: 'postgres',
		host: env.DB_HOST,
		port: env.DB_PORT,
		username: env.DB_USERNAME,
		password: env.DB_PASSWORD,
		database: env.DB_DATABASE,
		synchronize: false,
		migrationsRun: true,
		migrationsTableName: 'migrations',
		migrations: ['dist/src/database/migrations/*{.ts,.js}'],
		entities: ['dist/src/**/**/*.entity{.ts,.js}'],
		logging: true,
		logger: new CustomTypeOrmLogger()
	};
};

export const getIdColumn = (): TableColumnOptions => ({
	name: 'id',
	isPrimary: true,
	isGenerated: true,
	generationStrategy: 'increment',
	type: 'int',
	isNullable: false,
	isUnique: true,
});

export const getTimestampColumns = (): TableColumnOptions[] => [
	{
		name: 'created_at',
		type: 'timestamp with time zone',
		isNullable: false,
		default: 'CURRENT_TIMESTAMP',
	},
	{
		name: 'updated_at',
		type: 'timestamp with time zone',
		isNullable: false,
		default: 'CURRENT_TIMESTAMP',
		onUpdate: 'CURRENT_TIMESTAMP',
	},
];
