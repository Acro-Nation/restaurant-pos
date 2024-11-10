import { InputType, Field } from '@nestjs/graphql'
import { IsString, IsEnum, IsOptional } from 'class-validator'
import { NotificationType } from '@prisma/client'

@InputType()
export class CreateNotificationInput {
  @Field(() => NotificationType)
  @IsEnum(NotificationType)
  type: NotificationType

  @Field()
  @IsString()
  title: string

  @Field()
  @IsString()
  message: string

  @Field()
  @IsString()
  tenantId: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  orderId?: string
}
