import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new TransformResponseInterceptor())

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,         // Hapus properti yang tidak ada di DTO
      forbidNonWhitelisted: true, // Error kalau ada properti tak dikenal
      transform: true,         // Ubah ke tipe data DTO
    }),
  );


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
