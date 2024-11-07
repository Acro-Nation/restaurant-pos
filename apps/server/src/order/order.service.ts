// src/order/order.service.ts
import { Injectable, ForbiddenException } from '@nestjs/common'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { OrderStatus, User, UserRole } from '@prisma/client'
import {
  PaginatedResult,
  PaginationParams,
  calculateOffset,
  paginate,
} from 'src/common/utils/pagination.utils'
import { CreateOrderInput } from './dto/create-order.input'
import { Order } from 'src/common/entities/order.entity'

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(createOrderInput: CreateOrderInput): Promise<Order> {
    // Fetch the user to check their role (using waiterId now)
    const user = await this.prisma.user.findUnique({
      where: { id: createOrderInput.waiterId },
    })

    if (user?.role === UserRole.CHEF) {
      throw new ForbiddenException('Chefs are not allowed to create orders.')
    }

    // Create the order in the database
    const order = await this.prisma.order.create({
      data: {
        tenantId: createOrderInput.tenantId,
        restaurantId: createOrderInput.restaurantId,
        waiterId: createOrderInput.waiterId,
        amount: createOrderInput.totalAmount,
        status: 'PENDING', // Default status
      },
    })

    return order
  }

  // Get all orders for a tenant
  async getAllOrders(
    user: User,
    params: PaginationParams,
  ): Promise<PaginatedResult<Order>> {
    const tenantId = user.tenantId

    const { page, limit } = params
    const offset = calculateOffset(page, limit)

    const [orders, total] = await this.prisma.$transaction([
      this.prisma.order.findMany({
        where: {
          tenantId,
        },
        skip: offset,
        take: limit,
      }),
      this.prisma.order.count({
        where: {
          tenantId,
        },
      }),
    ])

    return paginate(orders, total, page, limit)
  }

  // Get a specific order by ID
  async getOrderById(orderId: string): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    })

    if (!order) {
      throw new Error('Order not found')
    }

    return order
  }

  // Update the status of an order
  async updateOrderStatus(
    orderId: string,
    status: OrderStatus,
  ): Promise<Order> {
    const order = await this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    })

    return order
  }
}
