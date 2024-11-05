// tenant.service.ts
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../common/prisma/prisma.service'
import { BillingCycle, SubscriptionStatus, Tenant } from '@prisma/client'
import { SubscriptionService } from 'src/subscription/subscription.service'
@Injectable()
export class TenantService {
  constructor(
    private prisma: PrismaService,
    private subscriptionService: SubscriptionService,
  ) {}

  async createTenant(name: string): Promise<Tenant> {
    const tenant = await this.prisma.tenant.create({
      data: { name },
    })

    // Automatically create a subscription for the new tenant
    await this.subscriptionService.createSubscription(
      tenant.id,
      new Date(),
      new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // 1-year subscription
      SubscriptionStatus.ACTIVE,
      BillingCycle.MONTHLY,
      100, // example cost per month
      10, // example order percentage fee
    )

    return tenant
  }

  async findAll(): Promise<Tenant[]> {
    return this.prisma.tenant.findMany()
  }

  async findOne(id: string): Promise<Tenant | null> {
    return this.prisma.tenant.findUnique({ where: { id } })
  }
}
