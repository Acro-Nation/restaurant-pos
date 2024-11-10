// src/order/dto/create-order.input.ts
import { InputType, Field, Float, Int } from '@nestjs/graphql'

@InputType()
class OrderProductInput {
  @Field()
  productId: string

  @Field()
  title: string

  @Field(() => Int)
  quantity: number
}

@InputType()
export class CreateOrderInput {
  @Field()
  tenantId: string

  @Field()
  restaurantId: string

  @Field()
  waiterId: string

  @Field(() => Float)
  totalAmount: number

  @Field(() => [OrderProductInput])
  products: OrderProductInput[]
}
