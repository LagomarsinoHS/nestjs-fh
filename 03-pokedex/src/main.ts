import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app
    .setGlobalPrefix('api/v2')
    .useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,

        // Estos 2 ultimos son para decirle que se habilite la transformación y que dependiendo de lo que puse en el DTO asociado
        // Se intente transformar
        // transform: true,
        // transformOptions: {
        //   enableImplicitConversion: true,
        // },
      }),
    )
    .listen(process.env.PORT);
}
bootstrap();
