import { Field, ObjectType, ID, registerEnumType } from '@nestjs/graphql'
import { OrderStatus } from '@prisma/client'

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
})

@ObjectType()
export class Order {
  @Field(() => ID)
  id: string

  @Field(() => String)
  restaurantId: string

  @Field(() => String)
  waiterId: string

  @Field(() => String, { nullable: true })
  chefId?: string

  @Field()
  amount: number

  @Field()
  status: OrderStatus

  @Field()
  createdAt: Date

  @Field({ nullable: true })
  completedAt?: Date

  @Field(() => String)
  tenantId: string
}
