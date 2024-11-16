// src/order/order.service.ts
import { Injectable, ForbiddenException } from '@nestjs/common'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { NotificationType, OrderStatus, User, UserRole } from '@prisma/client'
import {
  PaginationParams,
  calculateOffset,
  paginate,
} from 'src/common/utils/pagination.utils'
import { CreateOrderInput } from './dto/create-order.input'
import {
  EncryptResponse,
  NotificationTitle,
} from 'src/common/interfaces/config'
import { EncryptDecryptService } from 'src/common/encrypt-decrypt/encrypt-decrypt.service'
import { NotificationService } from 'src/notification/notification.service'

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private readonly encryptDecryptService: EncryptDecryptService,
    private readonly notificationService: NotificationService,
  ) {}

  async createOrder(
    createOrderInput: CreateOrderInput,
    tenantId: string,
  ): Promise<EncryptResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id: createOrderInput.waiterId },
    })

    if (user?.role === UserRole.CHEF) {
      throw new ForbiddenException('Chefs are not allowed to create orders.')
    }

    // Create Order and associated OrderProducts in a transaction
    const order = await this.prisma.$transaction(async (prisma) => {
      const newOrder = await prisma.order.create({
        data: {
          tenantId,
          restaurantId: createOrderInput.restaurantId,
          waiterId: createOrderInput.waiterId,
          amount: createOrderInput.totalAmount,
          status: OrderStatus.PENDING,
        },
      })

      // Create OrderProduct entries
      await prisma.orderProduct.createMany({
        data: createOrderInput.products.map((product) => ({
          orderId: newOrder.id,
          productId: product.productId,
          quantity: product.quantity,
          tenantId,
        })),
      })

      return newOrder
    })

    // Generate a dynamic message based on products and quantities
    const productDetailsMessage = createOrderInput.products
      .map((product) => `${product.title} - (x${product.quantity})`)
      .join(', ')

    const message = `Order has been created with the following items: ${productDetailsMessage}.`

    // Send notification after creating the order
    await this.notificationService.create({
      type: NotificationType.ORDER_CREATED,
      title: NotificationTitle.ORDER_CREATED(),
      message,
      tenantId,
      orderId: order.id,
    })

    const encryptedData = this.encryptDecryptService.encryptData(order)
    return {
      data: encryptedData,
      success: true,
      message: 'Order created successfully!',
    }
  }

  // Get all orders for a tenant
  async getAllOrders(
    user: User,
    params: PaginationParams,
  ): Promise<EncryptResponse> {
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
        include: {
          products: {
            // Include products with quantities in each order
            include: {
              product: true,
            },
          },
        },
      }),
      this.prisma.order.count({
        where: {
          tenantId,
        },
      }),
    ])

    const paginatedResult = paginate(orders, total, page, limit)

    const encryptedData =
      this.encryptDecryptService.encryptData(paginatedResult)
    return {
      data: encryptedData,
      success: true,
      message: 'Orders retrieved successfully!',
    }
  }

  // Get a specific order by ID with associated products and quantities
  async getOrderById(orderId: string): Promise<EncryptResponse> {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        products: {
          // Include products in the order
          include: {
            product: true, // Include product details
          },
        },
      },
    })

    if (!order) {
      throw new Error('Order not found')
    }

    const encryptedData = this.encryptDecryptService.encryptData(order)
    return {
      data: encryptedData,
      success: true,
      message: 'Order retrieved successfully!',
    }
  }

  // Update the status of an order
  async updateOrderStatus(
    orderId: string,
    status: OrderStatus,
  ): Promise<EncryptResponse> {
    const order = await this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    })

    // Create notification for order status change
    const notificationType =
      status === OrderStatus.COMPLETED
        ? NotificationType.ORDER_COMPLETED
        : NotificationType.ORDER_CANCELLED

    await this.notificationService.create({
      type: notificationType,
      title:
        status === OrderStatus.COMPLETED
          ? NotificationTitle.ORDER_COMPLETED()
          : NotificationTitle.ORDER_CANCELLED(),
      message: `Order #${orderId} status changed to ${status}`,
      tenantId: order.tenantId,
      orderId: order.id,
    })

    const encryptedData = this.encryptDecryptService.encryptData(order)
    return {
      data: encryptedData,
      success: true,
      message: 'Order updated successfully!',
    }
  }
}
