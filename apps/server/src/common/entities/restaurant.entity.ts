import { Field, ObjectType, ID } from '@nestjs/graphql'
import { User } from './user.entity'

@ObjectType()
export class Restaurant {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field()
  address: string

  @Field(() => String)
  tenantId: string

  @Field(() => User, { nullable: true })
  admin?: User

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
