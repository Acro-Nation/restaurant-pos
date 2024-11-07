import { Resolver, Mutation, Args, Query, Context, Int } from '@nestjs/graphql'
import { UserService } from './user.service'
import { Roles } from '../auth/roles.decorator'
import { User } from 'src/common/entities/user.entity'
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard'
import { UseGuards } from '@nestjs/common'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { UserRole } from '@prisma/client'
import { PaginationParams } from 'src/common/utils/pagination.utils'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.RESTAURANT_ADMIN) // Only Restaurant Admins can view all users
  async getAllUsers(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
    @Context() context: any,
  ): Promise<User[]> {
    const params: PaginationParams = { page, limit }
    const result = await this.userService.findAll(context.req.user, params)
    return result.data
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.RESTAURANT_ADMIN) // Only Restaurant Admins or Owners can create users
  async createUser(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('role', { type: () => UserRole }) role: UserRole,
    @Context() context: any,
  ): Promise<User> {
    const user = context.req.user
    return this.userService.create({
      name,
      email,
      password,
      role,
      tenantId: user.tenantId,
      restaurantId: user.restaurantId,
    })
  }
}
