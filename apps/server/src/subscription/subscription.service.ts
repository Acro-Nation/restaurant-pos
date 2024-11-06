// src/subscription/subscription.service.ts
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../common/prisma/prisma.service'
import { Subscription as PrismaSubscription } from '@prisma/client'
import { Subscription } from 'src/common/entities/subscription.entity'

@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}

  async createSubscription(
    tenantId: string,
    startDate: Date,
    endDate: Date,
    status: PrismaSubscription['status'],
    billingCycle: PrismaSubscription['billingCycle'],
    costPerMonth: number,
    orderPercentageFee: number,
  ): Promise<Subscription> {
    const subscription = await this.prisma.subscription.create({
      data: {
        tenantId,
        startDate,
        endDate,
        status,
        billingCycle,
        costPerMonth,
        orderPercentageFee,
      },
    })

    return subscription // Ensure you return the correct type
  }

  async updateSubscriptionStatus(
    subscriptionId: string,
    status: PrismaSubscription['status'],
  ): Promise<Subscription> {
    return this.prisma.subscription.update({
      where: { id: subscriptionId },
      data: { status },
    })
  }

  async deleteSubscription(subscriptionId: string): Promise<Subscription> {
    return this.prisma.subscription.delete({
      where: { id: subscriptionId },
    })
  }

  async getSubscriptions(): Promise<Subscription[]> {
    return this.prisma.subscription.findMany()
  }
}
