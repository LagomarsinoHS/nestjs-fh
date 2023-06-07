import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app
    .setGlobalPrefix('v1')
    .useGlobalPipes(
      new ValidationPipe({
        // Las 2 propiedades se usan en conjunto
        whitelist: true, // Esto limpia lo que entra al request con solo lo que se definio en el DTO
        forbidNonWhitelisted: true, // Si esta en true, dirá que propiedades no estan permitidas
      }),
    )
    .listen(3000);
}
bootstrap();
