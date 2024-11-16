// src/subscription/subscription.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { SubscriptionService } from './subscription.service'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../common/guards/gql-auth.guard'
import { RolesGuard } from '../common/guards/roles.guard'
import { Roles } from '../auth/roles.decorator'
import { BusinessSubscription } from 'src/common/entities/subscription.entity'
import { SubscriptionStatus, UserRole } from '@prisma/client'

@Resolver(() => BusinessSubscription)
export class SubscriptionResolver {
  constructor(private subscriptionService: SubscriptionService) {}

  @Query(() => [BusinessSubscription])
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  async getAllSubscriptions(): Promise<BusinessSubscription[]> {
    return this.subscriptionService.getSubscriptions()
  }

  @Mutation(() => BusinessSubscription)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  async updateSubscriptionStatus(
    @Args('subscriptionId') subscriptionId: string,
    @Args('status', { type: () => SubscriptionStatus })
    status: SubscriptionStatus,
  ): Promise<BusinessSubscription> {
    return this.subscriptionService.updateSubscriptionStatus(
      subscriptionId,
      status,
    )
  }

  @Mutation(() => BusinessSubscription)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  async deleteSubscription(
    @Args('subscriptionId') subscriptionId: string,
  ): Promise<BusinessSubscription> {
    return this.subscriptionService.deleteSubscription(subscriptionId)
  }
}
