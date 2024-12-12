import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import dotenv from 'dotenv';
import { SeedersClasses } from '@seeds/seeds';
dotenv.config();

const { DATABASE_URL, NODE_ENV } = process.env;

const isDevelopment = NODE_ENV !== 'PRODUCTION';

const options: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    url: DATABASE_URL,
    synchronize: false,
    logging: isDevelopment,
    logger: 'advanced-console',
    entities: [`${__dirname}/../entities/**/*${isDevelopment ? '.ts' : '.js'}`],
    migrations: [`${__dirname}/../migrations/**/*${isDevelopment ? '.ts' : '.js'}`],
    seeds: SeedersClasses,
    factories: [`${__dirname}/../factories/**/*${isDevelopment ? '.ts' : '.js'}`],
};

export const AppDataSource = new DataSource(options);
