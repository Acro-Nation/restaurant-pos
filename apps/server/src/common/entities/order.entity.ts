// src/order/order.entity.ts
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql'
import { OrderStatus } from '@prisma/client'
import { Tenant } from './tenant.entity'
import { User } from './user.entity'
import { Product } from './product.entity'

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
  description: 'The current status of the order',
})

@ObjectType()
export class Order {
  @Field(() => ID)
  id: string

  @Field()
  amount: number

  @Field(() => OrderStatus)
  status: OrderStatus

  @Field()
  createdAt: Date

  @Field({ nullable: true })
  completedAt?: Date

  @Field(() => Tenant)
  tenant: Tenant

  @Field(() => User)
  waiter: User

  @Field(() => [Product])
  products: Product[]
}
