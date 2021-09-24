import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {


  const app = await NestFactory.create(AppModule);

  //The {fallbackOnErrors: true} is required, 
  //because Nest throw Exception when DI doesn't have required class.
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  //Inject Nest Validations
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    //Doensn't allow unknown attributes
    whitelist: true,
    //Throws error if received a not allowed attribute
    forbidNonWhitelisted: true,
  }));
  await app.listen(3000);
}
bootstrap();
