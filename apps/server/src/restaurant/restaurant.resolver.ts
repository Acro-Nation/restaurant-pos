import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql'
import { RestaurantService } from './restaurant.service'
import {
  CreateOwnerInput,
  CreateRestaurantInput,
} from './dto/create-restaurant.input'
import { Restaurant } from 'src/common/entities/restaurant.entity'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { UseGuards } from '@nestjs/common'
import { Roles } from 'src/auth/roles.decorator'
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard'
import { UserRole } from '@prisma/client'
import { PaginationParams } from 'src/common/utils/pagination.utils'
import { EncryptResponse } from 'src/common/interfaces/config'

@Resolver(() => Restaurant) // Define the resolver for the Restaurant type
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation(() => EncryptResponse)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN) // Only Super Admins can create restaurants
  async createRestaurantWithOwner(
    @Args('tenantId') tenantId: string,
    @Args('restaurantData') restaurantData: CreateRestaurantInput,
    @Args('ownerData') ownerData: CreateOwnerInput,
  ): Promise<EncryptResponse> {
    return this.restaurantService.createRestaurantWithOwner(
      tenantId,
      restaurantData,
      ownerData,
    )
  }

  @Query(() => EncryptResponse)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN) // Only Super Admins can view all restaurants
  async getAllRestaurants(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  ): Promise<EncryptResponse> {
    const params: PaginationParams = { page, limit }
    return this.restaurantService.findAll(params)
  }
}
