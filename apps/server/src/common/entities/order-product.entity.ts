// src/common/entities/order-product.entity.ts
import { ObjectType, Field, ID, Int } from '@nestjs/graphql'
import { Order } from './order.entity'
import { Product } from './product.entity'

@ObjectType()
export class OrderProduct {
  @Field(() => ID)
  id: string

  @Field()
  orderId: string

  @Field()
  productId: string

  @Field(() => Int)
  quantity: number

  @Field()
  tenantId: string

  @Field(() => Order, { nullable: true })
  order?: Order

  @Field(() => Product, { nullable: true })
  product?: Product
}
