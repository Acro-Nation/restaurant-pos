// src/order/order.module.ts
import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderResolver } from './order.resolver'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'

@Module({
  providers: [
    OrderService,
    OrderResolver,
    PrismaService,
    GqlAuthGuard,
    RolesGuard,
  ],
  exports: [OrderService],
})
export class OrderModule {}
