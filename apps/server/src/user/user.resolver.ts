import { Resolver, Mutation, Args, Query, Context, Int } from '@nestjs/graphql'
import { UserService } from './user.service'
import { Roles } from '../auth/roles.decorator'
import { User } from 'src/common/entities/user.entity'
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard'
import { UseGuards } from '@nestjs/common'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { UserRole } from '@prisma/client'
import { PaginationParams } from 'src/common/utils/pagination.utils'
import { EncryptResponse } from 'src/common/interfaces/config'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => EncryptResponse)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.RESTAURANT_ADMIN)
  async getAllUsers(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
    @Context() context: any,
  ): Promise<EncryptResponse> {
    const params: PaginationParams = { page, limit }
    return await this.userService.findAll(context.req.user, params)
  }

  @Mutation(() => EncryptResponse)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.RESTAURANT_ADMIN)
  async createUser(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('role', { type: () => UserRole }) role: UserRole,
    @Context() context: any,
  ): Promise<EncryptResponse> {
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
