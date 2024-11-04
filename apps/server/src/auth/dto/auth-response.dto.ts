import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class LoginResponse {
  @Field()
  message: string
}
@ObjectType()
export class RefreshTokenResponse {
  @Field()
  message: string
}
