import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

dotenv.config();


@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [
                path.join(__dirname, '/entities/*.entity{.ts,.js}'),
                path.join(__dirname, '/../**/entities/*.entity{.ts,.js}'),
            ],
            synchronize: false,
            subscribers: [path.join(__dirname, '/subscribers/*.subscriber{.ts,.js}')],
        })
    ],
})
export class DatabaseModule {}
