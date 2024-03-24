import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { IncorrectValuesException } from './exceptions/incorrectValuesException';
import { mapperClassValidationErrorToAppException } from './utils/mappers';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory(errors: ValidationError[]) {
        throw new IncorrectValuesException({
          fields: mapperClassValidationErrorToAppException(errors),
        });
      },
    }),
  );
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Nest API')
    .setDescription('The Nest API')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('user')
    .addTag('product')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
