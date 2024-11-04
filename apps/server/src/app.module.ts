import * as Joi from 'joi'
import { join } from 'path'
import { Module, MiddlewareConsumer } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { PrismaModule } from './common/prisma/prisma.module'
import { TenantModule } from './tenant/tenant.module'
import { AppResolver } from './app.resolver'
import { AppService } from './app.service'
import { TenantMiddleware } from './tenant/tenant.middleware'
import { RestaurantModule } from './restaurant/restaurant.module'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        PORT: Joi.number().default(8000),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, res }) => ({ req, res }), // Pass request context for middleware
      path: '/api/v1',
    }),
    AuthModule,
    UserModule,
    RestaurantModule,
    PrismaModule,
    TenantModule,
  ],
  providers: [AppService, AppResolver, JwtService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .exclude('/api/v1/', '/api/v1/graphql', '/api/v1/graphql/playground')
      .forRoutes('*') // Apply tenant middleware to all routes
  }
}