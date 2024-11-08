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

@Resolver(() => Restaurant) // Define the resolver for the Restaurant type
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  /**
   * Creates a new restaurant and its admin owner
   * @param tenantId - ID of the tenant this restaurant belongs to
   * @param restaurantData - Restaurant details including name and address
   * @param ownerData - Owner details including name, email and password
   * @returns The created Restaurant with its admin user
   *
   * This mutation:
   * 1. Is protected by authentication and role guards
   * 2. Can only be accessed by Super Admins
   * 3. Creates both restaurant and admin user in a single transaction
   * 4. Returns the created restaurant with admin details included
   */
  @Mutation(() => Restaurant)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN) // Only Super Admins can create restaurants
  async createRestaurantWithOwner(
    @Args('tenantId') tenantId: string,
    @Args('restaurantData') restaurantData: CreateRestaurantInput,
    @Args('ownerData') ownerData: CreateOwnerInput,
  ): Promise<Restaurant> {
    return this.restaurantService.createRestaurantWithOwner(
      tenantId,
      restaurantData,
      ownerData,
    )
  }

  /**
   * Retrieves a paginated list of all restaurants
   * @param page - Page number for pagination (default: 1)
   * @param limit - Number of items per page (default: 10)
   * @returns Array of Restaurant objects for the requested page
   *
   * This query:
   * 1. Is protected by authentication and role guards
   * 2. Can only be accessed by Super Admins
   * 3. Returns paginated restaurant data with admin details included
   * 4. Uses default pagination of 10 items per page if not specified
   */
  @Query(() => [Restaurant])
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN) // Only Super Admins can view all restaurants
  async getAllRestaurants(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  ): Promise<Restaurant[]> {
    const params: PaginationParams = { page, limit }
    const result = await this.restaurantService.findAll(params)
    return result.data
  }
}
