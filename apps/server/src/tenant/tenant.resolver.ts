// tenant.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { TenantService } from './tenant.service'
import { Tenant } from 'src/common/entities/tenant.entity'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { Roles } from 'src/auth/roles.decorator'
import { UserRole } from 'src/common/interfaces/config'

@Resolver(() => Tenant)
export class TenantResolver {
  constructor(private tenantService: TenantService) {}

  @Mutation(() => Tenant)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN) // Only Super Admins can create tenants
  async createTenant(@Args('name') name: string): Promise<Tenant> {
    return this.tenantService.createTenant(name)
  }

  @Query(() => [Tenant])
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN) // Only Super Admins can view all tenants
  async getAllTenants(): Promise<Tenant[]> {
    return this.tenantService.findAll()
  }
}
