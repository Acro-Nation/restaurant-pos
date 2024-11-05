import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class RestaurantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context)
    const { user } = ctx.getContext().req
    const { restaurantId } = ctx.getArgs()

    if (!user || user.role === 'SUPER_ADMIN') {
      return true
    }

    if (
      user.adminOfRestaurantId !== restaurantId &&
      !user.managedRestaurants.some((r) => r.id === restaurantId) &&
      !user.waitingRestaurants.some((r) => r.id === restaurantId) &&
      !user.chefRestaurants.some((r) => r.id === restaurantId)
    ) {
      throw new ForbiddenException('Access denied to this restaurant')
    }

    return true
  }
}
