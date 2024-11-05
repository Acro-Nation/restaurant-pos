// src/restaurant/restaurant.service.ts
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../common/prisma/prisma.service'
import * as bcrypt from 'bcrypt'
import {
  CreateOwnerInput,
  CreateRestaurantInput,
} from './dto/create-restaurant.input'
import { UserRole } from 'src/common/interfaces/config'
import { Restaurant } from 'src/common/entities/restaurant.entity'
import { User } from 'src/common/entities/user.entity'

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  private mapPrismaUserToGraphQL(prismaUser: any): User {
    return {
      id: prismaUser.id,
      name: prismaUser.name,
      email: prismaUser.email,
      password: prismaUser.password,
      role: prismaUser.role as UserRole, // Explicit cast to GraphQL UserRole
      tenantId: prismaUser.tenantId,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
    }
  }

  private mapPrismaRestaurantToGraphQL(
    prismaRestaurant: any,
    admin?: any,
  ): Restaurant {
    return {
      id: prismaRestaurant.id,
      name: prismaRestaurant.name,
      address: prismaRestaurant.address,
      tenantId: prismaRestaurant.tenantId,
      admin: admin ? this.mapPrismaUserToGraphQL(admin) : undefined,
      createdAt: prismaRestaurant.createdAt,
      updatedAt: prismaRestaurant.updatedAt,
    }
  }

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

    // Transform the Prisma result to match the GraphQL type
    return this.mapPrismaRestaurantToGraphQL(restaurant, restaurant.admin)
  }

  async findAll(): Promise<Restaurant[]> {
    const restaurants = await this.prisma.restaurant.findMany({
      include: {
        admin: true,
      },
    })

    return restaurants.map((restaurant) =>
      this.mapPrismaRestaurantToGraphQL(restaurant, restaurant.admin),
    )
  }
}
