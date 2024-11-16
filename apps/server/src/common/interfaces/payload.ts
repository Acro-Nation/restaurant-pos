//payload.entity.ts
import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class EventPayloads {
  'email.verification': { email: string; name: string; code: string }
  'forgot.password': { email: string; name: string; link: string }
  'password.changed': { email: string; name: string }
  'user.invitation': { name: string; email: string; link: string }
  'notification.unseen': {
    message: string
    user: { email: string }
  }
}

export const PUB_SUB = 'PUB_SUB'

export interface JwtPayload {
  sub: string // user ID
  email: string
  role: string
  tenantId: string
}

export interface NotificationPayload {
  notification: {
    id: string
    type: string
    title: string
    message: string
    tenantId: string
    orderId?: string
    createdAt: Date
    updatedAt: Date
  }
}
