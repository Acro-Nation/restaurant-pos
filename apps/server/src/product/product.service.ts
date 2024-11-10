import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { User } from '@prisma/client'
import {
  calculateOffset,
  paginate,
  PaginationParams,
} from 'src/common/utils/pagination.utils'
import { CreateProductInput } from './dto/create-product.input'
import { UpdateProductInput } from './dto/update-product.input'
import { EncryptDecryptService } from 'src/common/encrypt-decrypt/encrypt-decrypt.service'
import { EncryptResponse } from 'src/common/interfaces/config'

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private readonly encryptDecryptService: EncryptDecryptService,
  ) {}

  async create(
    createProductInput: CreateProductInput,
    user: User,
  ): Promise<EncryptResponse> {
    const product = await this.prisma.product.create({
      data: {
        title: createProductInput.title,
        description: createProductInput.description,
        price: createProductInput.price,
        restaurantId: createProductInput.restaurantId,
        tenantId: user.tenantId,
      },
    })

    const encryptedData = this.encryptDecryptService.encryptData(product)
    return {
      data: encryptedData,
      success: true,
      message: 'Product created successfully!',
    }
  }

  async findAll(
    user: User,
    params: PaginationParams,
  ): Promise<EncryptResponse> {
    const { page, limit } = params
    const offset = calculateOffset(page, limit)

    const [products, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where: {
          tenantId: user.tenantId,
        },
        include: {
          orders: {
            include: {
              order: true,
            },
          },
        },
        skip: offset,
        take: limit,
      }),
      this.prisma.product.count({
        where: {
          tenantId: user.tenantId,
        },
      }),
    ])

    const paginatedResult = paginate(products, total, page, limit)

    const encryptedData =
      this.encryptDecryptService.encryptData(paginatedResult)
    return {
      data: encryptedData,
      success: true,
      message: 'Products retrieved successfully!',
    }
  }

  async findOne(id: string): Promise<EncryptResponse> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        orders: {
          include: {
            order: true,
          },
        },
      },
    })

    if (!product) {
      throw new NotFoundException('Product not found')
    }

    const encryptedData = this.encryptDecryptService.encryptData(product)
    return {
      data: encryptedData,
      success: true,
      message: 'Product retrieved successfully!',
    }
  }

  async update(
    id: string,
    updateProductInput: UpdateProductInput,
  ): Promise<EncryptResponse> {
    const product = await this.prisma.product.update({
      where: { id },
      data: updateProductInput,
    })

    const encryptedData = this.encryptDecryptService.encryptData(product)
    return {
      data: encryptedData,
      success: true,
      message: 'Product updated successfully!',
    }
  }

  async remove(id: string): Promise<EncryptResponse> {
    const product = await this.prisma.product.delete({
      where: { id },
    })

    const encryptedData = this.encryptDecryptService.encryptData(product)
    return {
      data: encryptedData,
      success: true,
      message: 'Product deleted successfully!',
    }
  }
}
