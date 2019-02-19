import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {LoggingInterceptor} from './intercept/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  await app.listen(3010);
}

bootstrap();
process.on('unhandledRejection', (reason, p) => {
  // tslint:disable-next-line
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});
