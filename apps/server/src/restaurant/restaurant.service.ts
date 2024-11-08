// src/restaurant/restaurant.service.ts
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../common/prisma/prisma.service'
import * as bcrypt from 'bcrypt'
import {
  CreateOwnerInput,
  CreateRestaurantInput,
} from './dto/create-restaurant.input'
import { Restaurant } from 'src/common/entities/restaurant.entity'
import { UserRole } from '@prisma/client'
import {
  calculateOffset,
  paginate,
  PaginatedResult,
  PaginationParams,
} from 'src/common/utils/pagination.utils'

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  /**
   * Creates a new restaurant and its admin owner in a single transaction
   * @param tenantId - The ID of the tenant this restaurant belongs to
   * @param restaurantData - Restaurant details including name and address
   * @param ownerData - Owner details including name, email and password
   * @returns The created restaurant with its admin user
   *
   * This method:
   * 1. Creates a new user with RESTAURANT_ADMIN role
   * 2. Hashes the owner's password for security
   * 3. Creates the restaurant and links it to the admin user
   * 4. Returns the restaurant with the admin details included
   */
  async createRestaurantWithOwner(
    tenantId: string,
    restaurantData: CreateRestaurantInput,
    ownerData: CreateOwnerInput,
  ): Promise<Restaurant> {
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

    return restaurant
  }

  /**
   * Retrieves a paginated list of all restaurants
   * @param params - Pagination parameters including page number and limit
   * @returns A paginated result containing restaurants and total count
   *
   * This method:
   * 1. Calculates pagination offset based on page and limit
   * 2. Fetches restaurants with their admin details included
   * 3. Gets total count of restaurants for pagination
   * 4. Returns paginated data with restaurants and metadata
   */
  async findAll(
    params: PaginationParams,
  ): Promise<PaginatedResult<Restaurant>> {
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

    return paginate(restaurants, total, page, limit)
  }
}
