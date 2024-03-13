import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from 'src/filters/exception.filter';
import * as bcrypt from 'bcrypt';

console.log('username:', 'admin');
console.log('password:', bcrypt.hashSync('admin', 7));

async function bootstrap() {
  const port = process.env.PORT || 3300;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Exam')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.enableCors({ origin: true, credentials: true });

  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(port, () =>
    console.log(`${process.env.BASE_URL}:${process.env.PORT}/api/docs`),
  );
}

bootstrap();
