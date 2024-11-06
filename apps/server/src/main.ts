import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(cookieParser())
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders: [
      'Accept',
      'Authorization',
      'Content-Type',
      'X-Requested-With',
      'apollo-require-preflight',
    ],
    // all headers that client are allowed to use
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  })

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(8000)
}
bootstrap()
