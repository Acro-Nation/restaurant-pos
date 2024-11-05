// src/subscription/subscription.entity.ts
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql'
import { BillingCycle, SubscriptionStatus } from '@prisma/client'

registerEnumType(SubscriptionStatus, {
  name: 'SubscriptionStatus',
})

registerEnumType(BillingCycle, {
  name: 'BillingCycle',
})

@ObjectType()
export class Subscription {
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
