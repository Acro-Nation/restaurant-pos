import { Field, ObjectType, ID, registerEnumType } from '@nestjs/graphql'
import { UserRole } from '@prisma/client'

registerEnumType(UserRole, {
  name: 'UserRole',
})

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
