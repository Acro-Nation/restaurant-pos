// src/common/entities/order.entity.ts
import { ObjectType, Field, Float } from '@nestjs/graphql'
import { OrderStatus } from '@prisma/client'
import { registerEnumType } from '@nestjs/graphql'

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
})

@ObjectType()
export class Order {
  @Field()
  id: string

  @Field()
  tenantId: string

  @Field()
  restaurantId: string

  @Field()
  waiterId: string // Changed from userId to waiterId

  @Field(() => Float)
  amount: number

  @Field()
  status: OrderStatus

  @Field()
  createdAt: Date

  @Field({ nullable: true })
  completedAt?: Date
}
