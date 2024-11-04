// tenant.service.ts
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../common/prisma/prisma.service'
import { Tenant } from '@prisma/client'

@Injectable()
export class TenantService {
  constructor(private prisma: PrismaService) {}

  async createTenant(name: string): Promise<Tenant> {
    return this.prisma.tenant.create({
      data: { name },
    })
  }

  async findAll(): Promise<Tenant[]> {
    return this.prisma.tenant.findMany()
  }

  async findOne(id: string): Promise<Tenant | null> {
    return this.prisma.tenant.findUnique({ where: { id } })
  }
}
