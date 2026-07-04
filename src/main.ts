import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // Listen on all network interfaces (0.0.0.0) so it works on 192.168.29.68
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
