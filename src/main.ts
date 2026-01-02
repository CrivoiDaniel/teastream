import { NestFactory } from '@nestjs/core';
import { CoreModule } from './core/core.module';
import { ConfigService } from '@nestjs/config';

import cookieParser from 'cookie-parser'
import session from 'express-session'
import connectRedis from 'connect-redis';

import { ValidationPipe } from '@nestjs/common';
import { ms, type StringValue } from './shared/utils/ms.util';
import { parseBoolean } from './shared/utils/parse-boolean.util';
import { RedisService } from './core/redis/redis.service';

import { graphqlUploadExpress } from 'graphql-upload';

const RedisStore = connectRedis(session);
async function bootstrap() {
  const app = await NestFactory.create(CoreModule, {rawBody: true});
  
  const config = app.get(ConfigService);
  const redis = app.get(RedisService)
  app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')));
  //app.use(config.getOrThrow<string>('GRAPHQL_PREFIX'), GraphQLUpload())
  app.use(config.getOrThrow<string>('GRAPHQL_PREFIX'), graphqlUploadExpress());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  )

  app.use(session({
    secret: config.getOrThrow<string>('SESSION_SECRET'),
    name: config.getOrThrow<string>('SESSION_NAME'),
    resave: false,
    saveUninitialized: false,
    cookie: {
      domain: config.getOrThrow<string>('SESSION_DOMAIN'),
      maxAge: ms(config.getOrThrow<StringValue>('SESSION_MAX_AGE')),
      httpOnly: parseBoolean(config.getOrThrow<string>('SESSION_HTTP_ONLY')),
      secure: parseBoolean(config.getOrThrow<string>('SESSION_SECURE')),
      sameSite: 'lax'
    },
    store: new RedisStore ({
      client: redis,
      prefix: config.getOrThrow<string>('SESSION_FOLDER')
    })
  }))

  app.enableCors({
    origin: config.getOrThrow<string>('ALLOWED_ORIGIN'),
    credentials: true,
    exposedHeaders: ['set-cookie']

  })

  await app.listen(config.getOrThrow<string>('APPLICATION_PORT'));

}
bootstrap();

