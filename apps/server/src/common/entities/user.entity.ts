import { Field, ObjectType, ID } from '@nestjs/graphql'
import { UserRole } from '../interfaces/config'

@ObjectType()
export class User {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field()
  email: string

  @Field()
  password: string

  @Field(() => UserRole)
  role: UserRole

  @Field(() => String)
  tenantId: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
