import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path';

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 5434),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    path.join(__dirname, '/entities/*.entity{.ts,.js}'),
    path.join(__dirname, '/../**/entities/*.entity{.ts,.js}'),
  ],
  migrations: [path.join(__dirname, '/migrations/*{.ts,.js}')],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;