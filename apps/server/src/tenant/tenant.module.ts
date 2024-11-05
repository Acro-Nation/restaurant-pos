// tenant.module.ts
import { Module } from '@nestjs/common'
import { PrismaService } from '../common/prisma/prisma.service'
import { TenantService } from './tenant.service'
import { TenantResolver } from './tenant.resolver'
import { SubscriptionModule } from 'src/subscription/subscription.module'
import { SubscriptionService } from 'src/subscription/subscription.service'

@Module({
  providers: [
    TenantService,
    PrismaService,
    TenantResolver,
    SubscriptionService,
  ],
  exports: [TenantService],
})
export class TenantModule {}
