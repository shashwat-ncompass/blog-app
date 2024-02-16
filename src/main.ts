import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyExceptionsFilter } from './utils/exceptionHandler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new MyExceptionsFilter());

  await app.listen(3000);
}
bootstrap();
