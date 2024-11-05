import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class EncryptResponse {
  @Field({ nullable: false })
  success: boolean
  @Field({ nullable: true })
  data?: string
  @Field({ nullable: false })
  message: string
}
