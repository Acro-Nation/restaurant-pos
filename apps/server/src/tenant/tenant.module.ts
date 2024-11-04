// tenant.module.ts
import { Module } from '@nestjs/common'
import { PrismaService } from '../common/prisma/prisma.service'
import { TenantService } from './tenant.service'
import { TenantResolver } from './tenant.resolver'

@Module({
  providers: [TenantService, PrismaService, TenantResolver],
  exports: [TenantService],
})
export class TenantModule {}
