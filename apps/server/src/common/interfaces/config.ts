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

export const NotificationTitle = {
  ORDER_CREATED: () => `New Order Notification.`,
  ORDER_UPDATED: () => `Order Updated Notification.`,
  ORDER_COMPLETED: () => `Order Completed Notification.`,
  ORDER_CANCELLED: () => `Order Cancelled Notification.`,
  PAYMENT_DONE: () => `Payment Completed Notification.`,
}
