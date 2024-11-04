import { Field, ObjectType } from '@nestjs/graphql'
import { registerEnumType } from '@nestjs/graphql'

@ObjectType()
export class EncryptResponse {
  @Field({ nullable: false })
  success: boolean
  @Field({ nullable: true })
  data?: string
  @Field({ nullable: false })
  message: string
}

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  RESTAURANT_ADMIN = 'RESTAURANT_ADMIN',
  MANAGER = 'MANAGER',
  WAITER = 'WAITER',
  CHEF = 'CHEF',
}

registerEnumType(UserRole, {
  name: 'UserRole', // This name should match GraphQL's schema
  description: 'The roles a user can have in the system',
})
