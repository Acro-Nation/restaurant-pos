import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
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
import { UserRole } from 'src/common/interfaces/config'

@Resolver(() => Restaurant) // Define the resolver for the Restaurant type
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

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

  @Query(() => [Restaurant])
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN) // Only Super Admins can view all restaurants
  async getAllRestaurants(): Promise<Restaurant[]> {
    return this.restaurantService.findAll()
  }
}
