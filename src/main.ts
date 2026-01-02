import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { config } from './swagger.config';
import { ValidationPipe, Logger } from '@nestjs/common';
import { json, urlencoded } from 'express';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('SISTEMA_JURIDICO');

  app.setGlobalPrefix('v1');

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs-juridico', app, document);

  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true, 
    transform: true,
    forbidNonWhitelisted: true
  }));

  app.use(json({ limit: '15mb' }));
  app.use(urlencoded({ limit: '15mb', extended: true }));

  const port = process.env.PORT ?? 3010; 
  await app.listen(port, '0.0.0.0');

  logger.log(`====================================================`);
  logger.log(`CONTRATO JURÍDICO ONLINE - API ATIVA`);
  logger.log(`URL: ${await app.getUrl()}/v1`);
  logger.log(`DOCUMENTAÇÃO: ${await app.getUrl()}/docs-juridico`);
  logger.log(`====================================================`);
}

bootstrap();