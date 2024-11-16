import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql'
import { NotificationType } from '@prisma/client'

registerEnumType(NotificationType, {
  name: 'NotificationType',
  description: 'Type of Notification',
})

@ObjectType()
export class Notification {
  @Field(() => ID)
  id: string

  @Field(() => NotificationType)
  type: NotificationType

  @Field()
  title: string

  @Field()
  message: string

  @Field()
  tenantId: string

  @Field({ nullable: true })
  orderId?: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}

@ObjectType()
export class NotificationSubscriptionPayload {
  @Field(() => Notification)
  notification: Notification
}
