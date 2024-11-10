import { InputType, Field, Int } from '@nestjs/graphql'

@InputType()
export class CreateProductInput {
  @Field()
  title: string

  @Field()
  description: string

  @Field(() => Int)
  price: number

  @Field()
  restaurantId: string
}
