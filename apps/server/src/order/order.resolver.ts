// src/order/order.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { OrderService } from './order.service'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { Roles } from 'src/auth/roles.decorator'
import { UserRole } from '@prisma/client'
import { Order } from 'src/common/entities/order.entity'
import { CreateOrderInput } from './dto/create-order.input'
import { UpdateOrderInput } from './dto/update-order.input'

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query(() => [Order])
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(
    UserRole.RESTAURANT_ADMIN,
    UserRole.MANAGER,
    UserRole.WAITER,
    UserRole.WAITER,
    UserRole.CHEF,
  ) // Restrict to these roles
  async getAllOrders(
    @Args('tenantId') tenantId: string,
    @Args('skip', { type: () => Number, nullable: true }) skip: number = 0,
    @Args('take', { type: () => Number, nullable: true }) take: number = 10,
  ): Promise<Order[]> {
    return this.orderService.getAllOrders(tenantId, skip, take)
  }

  @Query(() => Order)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.WAITER) // Restrict to these roles
  async getOrderById(@Args('orderId') orderId: string): Promise<Order> {
    return this.orderService.getOrderById(orderId)
  }

  @Mutation(() => Order)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.WAITER) // Restrict to these roles
  async createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ): Promise<Order> {
    return this.orderService.createOrder(createOrderInput)
  }

  @Mutation(() => Order)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.WAITER) // Restrict to these roles
  async updateOrderStatus(
    @Args('orderId') orderId: string,
    @Args('updateOrderInput') updateOrderInput: UpdateOrderInput,
  ): Promise<Order> {
    return this.orderService.updateOrderStatus(orderId, updateOrderInput.status)
  }
}
