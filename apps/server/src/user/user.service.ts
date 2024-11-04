import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/common/prisma/prisma.service'
import * as bcrypt from 'bcrypt'
import { User } from 'src/common/entities/user.entity'
import { UserRole } from 'src/common/interfaces/config'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Add mapper function
  private mapPrismaUserToGraphQL(prismaUser: any): User {
    return {
      id: prismaUser.id,
      name: prismaUser.name,
      email: prismaUser.email,
      password: prismaUser.password,
      role: prismaUser.role as UserRole,
      tenantId: prismaUser.tenantId,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } })
    return user ? this.mapPrismaUserToGraphQL(user) : null
  }

  async findOne(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } })
    return user ? this.mapPrismaUserToGraphQL(user) : null
  }

  async create(data: {
    name: string
    email: string
    password: string
    role: UserRole // Change this type from string to UserRole
    tenantId: string // Keep this for the input, but not in data directly.
  }): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role as UserRole, // Add type assertion if needed
        tenant: { connect: { id: data.tenantId } }, // Connect the tenant relation
      },
    })
    return this.mapPrismaUserToGraphQL(user)
  }
}
