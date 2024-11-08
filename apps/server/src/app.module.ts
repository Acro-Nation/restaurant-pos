import * as Joi from 'joi'
import { join } from 'path'
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
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
import { SubscriptionModule } from './subscription/subscription.module'
import { JwtService } from '@nestjs/jwt'
// import { ProductModule } from './product/product.module'
import { OrderModule } from './order/order.module'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { FilterPasswordInterceptor } from './common/utils/filter-password.interceptor'
import { EncryptDecryptService } from './common/encrypt-decrypt/encrypt-decrypt.service'
import { EncryptDecryptModule } from './common/encrypt-decrypt/encrypt-decrypt.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(8000),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
      }),
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, res }) => ({ req, res }),
      path: '/api/v1',
    }),
    AuthModule,
    UserModule,
    RestaurantModule,
    PrismaModule,
    TenantModule,
    SubscriptionModule,
    // ProductModule,
    OrderModule,
    EncryptDecryptModule,
  ],
  providers: [
    AppService,
    AppResolver,
    JwtService,
    {
      provide: APP_INTERCEPTOR,
      useClass: FilterPasswordInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .exclude('/api/v1/', '/api/v1/graphql', '/api/v1/graphql/playground')
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
