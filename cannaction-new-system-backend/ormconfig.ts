import { getDbConfig } from '@/utils/datasource-factory';
import { DataSource } from 'typeorm';

export const connectionSource = new DataSource({ ...getDbConfig() });
