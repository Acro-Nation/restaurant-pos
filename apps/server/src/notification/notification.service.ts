import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../common/prisma/prisma.service'
import { CreateNotificationInput } from './dto/create-notification.input'
import { UpdateNotificationInput } from './dto/update-notification.input'
import {
  calculateOffset,
  paginate,
  PaginatedResult,
  PaginationParams,
} from 'src/common/utils/pagination.utils'
import { NotificationType, Notification } from '@prisma/client'
import { NotificationTitle } from 'src/common/interfaces/config'
import { PubSub } from 'graphql-subscriptions'
import { PUB_SUB } from '../common/interfaces/payload'

@Injectable()
export class NotificationService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  async create(createNotificationInput: CreateNotificationInput) {
    const titleTemplate = NotificationTitle[createNotificationInput.type]

    const title = titleTemplate ? titleTemplate() : 'Notification'

    const notification = await this.prisma.notification.create({
      data: {
        ...createNotificationInput,
        title,
      },
    })

    // Publish the notification event
    await this.pubSub.publish('notificationCreated', {
      notificationCreated: { notification },
    })

    return notification
  }

  async findAllByTenant(
    tenantId: string,
    params: PaginationParams,
  ): Promise<PaginatedResult<Notification>> {
    const { page, limit } = params
    const offset = calculateOffset(page, limit)

    const [notifications, total] = await this.prisma.$transaction([
      this.prisma.notification.findMany({
        where: {
          tenantId,
          type: {
            not: NotificationType.ORDER_COMPLETED,
          },
        },
        skip: offset,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.notification.count({
        where: {
          tenantId,
          type: {
            not: NotificationType.ORDER_COMPLETED,
          },
        },
      }),
    ])
    const paginatedResult = paginate(notifications, total, page, limit)

    return paginatedResult
  }

  async findOne(id: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    })
    if (!notification) throw new NotFoundException('Notification not found')
    return notification
  }

  async update(id: string, updateNotificationInput: UpdateNotificationInput) {
    await this.findOne(id) // Ensure the notification exists
    return this.prisma.notification.update({
      where: { id },
      data: updateNotificationInput,
    })
  }

  async remove(id: string) {
    await this.findOne(id) // Ensure the notification exists
    return this.prisma.notification.delete({ where: { id } })
  }
}
