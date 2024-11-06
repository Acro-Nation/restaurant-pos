import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class Product {
  @Field()
  title: string

  @Field()
  price: number

  @Field()
  description: string
}
