// src/order/dto/update-order.input.ts
import { InputType, Field } from '@nestjs/graphql'
import { OrderStatus } from '@prisma/client'
import { IsEnum, IsNotEmpty } from 'class-validator'

@InputType()
export class UpdateOrderInput {
  @Field(() => OrderStatus)
  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status: OrderStatus
}
