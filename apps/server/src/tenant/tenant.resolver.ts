// tenant.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { TenantService } from './tenant.service'
import { Tenant } from 'src/common/entities/tenant.entity'

@Resolver(() => Tenant)
export class TenantResolver {
  constructor(private tenantService: TenantService) {}

  @Mutation(() => Tenant)
  async createTenant(@Args('name') name: string): Promise<Tenant> {
    return this.tenantService.createTenant(name)
  }

  @Query(() => [Tenant])
  async tenants(): Promise<Tenant[]> {
    return this.tenantService.findAll()
  }
}
