import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { RestaurantService } from './restaurant.service'
import {
  CreateOwnerInput,
  CreateRestaurantInput,
} from './dto/create-restaurant.input'
import { Restaurant } from 'src/common/entities/restaurant.entity'

@Resolver(() => Restaurant) // Define the resolver for the Restaurant type
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation(() => Restaurant)
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
}
