// src/order/order.service.ts
import { Injectable, ForbiddenException } from '@nestjs/common'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { UserRole } from '@prisma/client'
import { CreateOrderInput } from './dto/create-order.input'
import { Order } from 'src/common/entities/order.entity'

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  // Create a new order
  async createOrder(createOrderInput: CreateOrderInput): Promise<Order> {
    // Fetch the user to check their role
    const user = await this.prisma.user.findUnique({
      where: { id: createOrderInput.userId },
    })

    if (user?.role === UserRole.CHEF) {
      throw new ForbiddenException('Chefs are not allowed to create orders.')
    }

    // Create the order in the database
    const order = await this.prisma.order.create({
      data: {
        tenantId: createOrderInput.tenantId,
        restaurantId: createOrderInput.restaurantId,
        userId: createOrderInput.userId,
        totalAmount: createOrderInput.totalAmount,
        status: 'PENDING', // Default status
      },
    })

    return order
  }

  // Get all orders for a tenant
  async getAllOrders(
    tenantId: string,
    skip: number,
    take: number,
  ): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: { tenantId },
      skip,
      take,
    })

    return orders
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
  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    const order = await this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    })

    return order
  }
}
