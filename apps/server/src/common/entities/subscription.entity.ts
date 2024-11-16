// src/subscription/subscription.entity.ts
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql'
import { BillingCycle, SubscriptionStatus } from '@prisma/client'

registerEnumType(SubscriptionStatus, {
  name: 'SubscriptionStatus',
})

registerEnumType(BillingCycle, {
  name: 'BillingCycle',
})

@ObjectType('BusinessSubscription')
export class BusinessSubscription {
  @Field(() => ID)
  id: string

  @Field()
  tenantId: string

  @Field()
  startDate: Date

  @Field()
  endDate: Date

  @Field(() => SubscriptionStatus)
  status: SubscriptionStatus

  @Field(() => BillingCycle)
  billingCycle: BillingCycle

  @Field()
  costPerMonth: number

  @Field()
  orderPercentageFee: number

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
