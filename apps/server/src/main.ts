import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

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

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Workspace API Documentation')
    .setDescription('API documentation for the entire system')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/v1/docs', app, document)

  await app.listen(8000)
}
bootstrap()
