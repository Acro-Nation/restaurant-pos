import { Field, ObjectType, ID } from '@nestjs/graphql'
import { SubscriptionStatus, BillingCycle } from '@prisma/client'

@ObjectType()
export class Subscription {
  @Field(() => ID)
  id: string

  @Field(() => String)
  tenantId: string

  @Field()
  startDate: Date

  @Field()
  endDate: Date

  @Field()
  status: SubscriptionStatus

  @Field()
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
