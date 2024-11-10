// src/common/entities/product.entity.ts
import { ObjectType, Field, ID, Int } from '@nestjs/graphql'
import { OrderProduct } from './order-product.entity'

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string

  @Field()
  title: string

  @Field(() => Int)
  price: number

  @Field()
  description: string

  @Field()
  restaurantId: string

  @Field()
  tenantId: string

  @Field(() => [OrderProduct], { nullable: true })
  orders?: OrderProduct[]

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
