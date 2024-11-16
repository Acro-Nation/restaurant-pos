import * as Joi from 'joi'
import { join } from 'path'

import { JwtService } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common'

import { AppService } from './app.service'
import { AppResolver } from './app.resolver'

import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { OrderModule } from './order/order.module'
import { TenantModule } from './tenant/tenant.module'
import { TenantMiddleware } from './tenant/tenant.middleware'

import { PrismaModule } from './common/prisma/prisma.module'
import { RestaurantModule } from './restaurant/restaurant.module'
import { SubscriptionModule } from './subscription/subscription.module'
// import { ProductModule } from './product/product.module'
import { FilterPasswordInterceptor } from './common/utils/filter-password.interceptor'
import { EncryptDecryptModule } from './common/encrypt-decrypt/encrypt-decrypt.module'
import { NotificationModule } from './notification/notification.module'
import { ProductModule } from './product/product.module'
import { PubSubModule } from './common/pub-sub/pubsub.module'

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
      context: ({ req, res, connection }) => {
        if (connection) {
          return { req: connection.context, res: connection.context }
        }
        return { req, res }
      },
      subscriptions: {
        'graphql-ws': {
          path: '/api/v1/subscriptions',
          onConnect: (context: any) => {
            const { connectionParams, extra } = context
            return true
          },
        },
        'subscriptions-transport-ws': false,
      },
      path: '/api/v1',
    }),
    AuthModule,
    UserModule,
    RestaurantModule,
    PrismaModule,
    TenantModule,
    SubscriptionModule,
    ProductModule,
    OrderModule,
    NotificationModule,
    EncryptDecryptModule,
    PubSubModule,
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
