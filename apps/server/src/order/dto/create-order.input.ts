// src/order/order.input.ts
import { InputType, Field } from '@nestjs/graphql'
import { IsString, IsNumber, IsNotEmpty } from 'class-validator'

@InputType()
export class CreateOrderInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  tenantId: string

  @Field()
  @IsString()
  @IsNotEmpty()
  restaurantId: string

  @Field()
  @IsString()
  @IsNotEmpty()
  userId: string

  @Field()
  @IsNumber()
  totalAmount: number
}
