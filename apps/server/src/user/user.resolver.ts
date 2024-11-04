import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { UserService } from './user.service'
import { Roles } from '../auth/roles.decorator'
import { User } from 'src/common/entities/user.entity'
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard'
import { UseGuards } from '@nestjs/common'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { UserRole } from 'src/common/interfaces/config'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('RESTAURANT_ADMIN', 'OWNER') // Only Restaurant Admins or Owners can create users
  async createUser(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('role') role: UserRole,
    @Args('tenantId') tenantId: string,
  ): Promise<User> {
    return this.userService.create({ name, email, password, role, tenantId })
  }
}
