import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe())
  
  // const corsOptions: CorsOptions = {
  //   origin: 'http://localhost:3000', // Remplacez par l'URL de votre application front-end
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   credentials: true,
  // };

  // app.enableCors(corsOptions);

  await app.listen(3001);
}
bootstrap();