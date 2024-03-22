import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: {
      enableImplicitConversion: true, //쿼리는 string으로만 변환되는데 number가 필요시 타입을 자동으로 변환을 해준다.
    }
  }));

  await app.listen(3000);
}
bootstrap();
