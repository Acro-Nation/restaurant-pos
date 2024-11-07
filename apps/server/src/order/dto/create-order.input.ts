// src/order/dto/create-order.input.ts
import { InputType, Field } from '@nestjs/graphql'
import { OrderStatus } from '@prisma/client'

@InputType()
export class CreateOrderInput {
  @Field()
  restaurantId: string

  @Field()
  waiterId: string

  @Field(() => [String])
  productIds: string[]

  @Field()
  amount: number

  @Field(() => OrderStatus, { defaultValue: OrderStatus.PENDING })
  status?: OrderStatus
}
