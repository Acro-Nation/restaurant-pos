// src/subscription/subscription.module.ts
import { Module } from '@nestjs/common'
import { SubscriptionService } from './subscription.service'
import { SubscriptionResolver } from './subscription.resolver'
import { PrismaModule } from '../common/prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  providers: [SubscriptionService, SubscriptionResolver],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
