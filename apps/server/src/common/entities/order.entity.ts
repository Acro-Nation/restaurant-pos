// src/order/order.entity.ts
import { ObjectType, Field, ID, Float, registerEnumType } from '@nestjs/graphql'
import { Tenant } from './tenant.entity'
import { Restaurant } from './restaurant.entity'
import { User } from './user.entity'
import { OrderStatus } from '@prisma/client'

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
  userId: string // Created by (e.g., waiter, admin)

  @Field()
  status: OrderStatus // Can be: PENDING, COMPLETED, CANCELLED, etc.

  @Field(() => Float)
  totalAmount: number

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field(() => Tenant)
  tenant: Tenant

  @Field(() => Restaurant)
  restaurant: Restaurant

  @Field(() => User)
  user: User
}
