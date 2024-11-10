import { Global, Module } from '@nestjs/common'
import { NotificationService } from './notification.service'
import { NotificationResolver } from './notification.resolver'
import { PrismaService } from '../common/prisma/prisma.service'

@Global()
@Module({
  providers: [NotificationResolver, NotificationService, PrismaService],
  exports: [NotificationService],
})
export class NotificationModule {}
