import { ObjectType, Field } from '@nestjs/graphql'
import { NotificationSubscriptionPayload } from './notification.entity'

@ObjectType('RealTimeSubscriptions')
export class RealTimeSubscriptions {
  @Field(() => NotificationSubscriptionPayload, { nullable: true })
  notificationCreated?: NotificationSubscriptionPayload
}
