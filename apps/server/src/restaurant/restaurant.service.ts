// src/restaurant/restaurant.service.ts
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../common/prisma/prisma.service'
import * as bcrypt from 'bcrypt'
import {
  CreateOwnerInput,
  CreateRestaurantInput,
} from './dto/create-restaurant.input'
import { UserRole } from '@prisma/client'
import {
  calculateOffset,
  paginate,
  PaginationParams,
} from 'src/common/utils/pagination.utils'
import { EncryptResponse } from 'src/common/interfaces/config'
import { EncryptDecryptService } from 'src/common/encrypt-decrypt/encrypt-decrypt.service'

@Injectable()
export class RestaurantService {
  constructor(
    private prisma: PrismaService,
    private readonly encryptDecryptService: EncryptDecryptService,
  ) {}

  async createRestaurantWithOwner(
    tenantId: string,
    restaurantData: CreateRestaurantInput,
    ownerData: CreateOwnerInput,
  ): Promise<EncryptResponse> {
    const hashedPassword = await bcrypt.hash(ownerData.password, 10)

    const adminUser = await this.prisma.user.create({
      data: {
        name: ownerData.name,
        email: ownerData.email,
        password: hashedPassword,
        role: UserRole.RESTAURANT_ADMIN,
        tenantId,
      },
    })

    const restaurant = await this.prisma.restaurant.create({
      data: {
        name: restaurantData.name,
        address: restaurantData.address,
        tenantId,
        adminId: adminUser.id,
      },
      include: {
        admin: true,
      },
    })

    const encryptedData = this.encryptDecryptService.encryptData(restaurant)
    const decryptedData = this.encryptDecryptService.decryptData(encryptedData)
    console.log({ decryptedData })
    return {
      data: encryptedData,
      success: true,
      message: 'Restaurant created successfully!',
    }
  }

  async findAll(params: PaginationParams): Promise<EncryptResponse> {
    const { page, limit } = params
    const offset = calculateOffset(page, limit)

    const [restaurants, total] = await this.prisma.$transaction([
      this.prisma.restaurant.findMany({
        skip: offset,
        take: limit,
        include: {
          admin: true,
        },
      }),
      this.prisma.restaurant.count(),
    ])

    const paginatedResult = paginate(restaurants, total, page, limit)
    const encryptedData =
      this.encryptDecryptService.encryptData(paginatedResult)
    return {
      data: encryptedData,
      success: true,
      message: 'Restaurants fetched successfully!',
    }
  }
}
