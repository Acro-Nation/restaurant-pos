// src/common/entities/order.entity.ts
import { ObjectType, Field, Float, ID } from '@nestjs/graphql'
import { OrderStatus } from '@prisma/client'
import { registerEnumType } from '@nestjs/graphql'
import { OrderProduct } from './order-product.entity'

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
})

@ObjectType()
export class Order {
  @Field(() => ID)
  id: string

  @Field()
  tenantId: string

  @Field()
  restaurantId: string

  @Field()
  waiterId: string // Refers to the waiter who created the order

  @Field(() => Float)
  amount: number

  @Field(() => OrderStatus)
  status: OrderStatus

  @Field()
  createdAt: Date

  @Field({ nullable: true })
  completedAt?: Date

  // Added relation to OrderProduct to access products and their quantities
  @Field(() => [OrderProduct], { nullable: true })
  products?: OrderProduct[]
}
