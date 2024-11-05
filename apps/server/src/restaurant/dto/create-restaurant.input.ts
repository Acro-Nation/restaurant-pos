import { InputType, Field } from '@nestjs/graphql'
import { UserRole } from '@prisma/client'

@InputType()
export class CreateRestaurantInput {
  @Field()
  name: string

  @Field()
  address: string
}

@InputType()
export class CreateOwnerInput {
  @Field()
  name: string

  @Field()
  email: string

  @Field()
  password: string

  @Field() // Add this field to connect the owner to a tenant
  tenantId: string
  @Field(() => UserRole) // Use Prisma UserRole here
  role: UserRole
}
