// src/notification/notification.resolver.ts
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Context,
  Subscription,
} from '@nestjs/graphql'
import { NotificationService } from './notification.service'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { Roles } from 'src/auth/roles.decorator'
import { UserRole } from '@prisma/client'
import { CreateNotificationInput } from './dto/create-notification.input'
import { UpdateNotificationInput } from './dto/update-notification.input'
import { PaginationParams } from 'src/common/utils/pagination.utils'
import { EncryptResponse } from 'src/common/interfaces/config'
import {
  Notification,
  NotificationSubscriptionPayload,
} from 'src/common/entities/notification.entity'
import { PaginatedResult } from 'src/common/utils/pagination.utils'
import { PubSub } from 'graphql-subscriptions'
import { Inject } from '@nestjs/common'
import { PUB_SUB } from '../common/interfaces/payload'

@Resolver(() => Notification)
export class NotificationResolver {
  constructor(
    private readonly notificationService: NotificationService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  @Query(() => [Notification])
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(
    UserRole.RESTAURANT_ADMIN,
    UserRole.MANAGER,
    UserRole.WAITER,
    UserRole.CHEF,
  )
  async getAllNotifications(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
    @Context() context: any,
  ): Promise<PaginatedResult<Notification>> {
    const params: PaginationParams = { page, limit }
    const user = context.req.user
    return this.notificationService.findAllByTenant(user.tenantId, params)
  }

  @Query(() => Notification)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(
    UserRole.RESTAURANT_ADMIN,
    UserRole.MANAGER,
    UserRole.WAITER,
    UserRole.CHEF,
  )
  async getNotificationById(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Notification> {
    return this.notificationService.findOne(id)
  }

  @Mutation(() => EncryptResponse)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(
    UserRole.RESTAURANT_ADMIN,
    UserRole.MANAGER,
    UserRole.WAITER,
    UserRole.CHEF,
  )
  async createNotification(
    @Args('createNotificationInput')
    createNotificationInput: CreateNotificationInput,
    @Context() context: any,
  ): Promise<Notification> {
    const user = context.req.user
    return this.notificationService.create({
      ...createNotificationInput,
      tenantId: user.tenantId,
    })
  }

  @Mutation(() => EncryptResponse)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(
    UserRole.RESTAURANT_ADMIN,
    UserRole.MANAGER,
    UserRole.WAITER,
    UserRole.CHEF,
  )
  async updateNotification(
    @Args('id', { type: () => String }) id: string,
    @Args('updateNotificationInput')
    updateNotificationInput: UpdateNotificationInput,
  ): Promise<Notification> {
    return this.notificationService.update(id, updateNotificationInput)
  }

  @Mutation(() => EncryptResponse)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(
    UserRole.RESTAURANT_ADMIN,
    UserRole.MANAGER,
    UserRole.WAITER,
    UserRole.CHEF,
  )
  async removeNotification(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Notification> {
    return this.notificationService.remove(id)
  }

  @Subscription(() => NotificationSubscriptionPayload, {
    filter: (payload, variables, context) => {
      // Filter notifications based on tenantId
      return (
        payload.notificationCreated.notification.tenantId ===
        context.req.user.tenantId
      )
    },
  })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(
    UserRole.RESTAURANT_ADMIN,
    UserRole.MANAGER,
    UserRole.WAITER,
    UserRole.CHEF,
  )
  notificationCreated() {
    return this.pubSub.asyncIterator('notificationCreated')
  }
}
