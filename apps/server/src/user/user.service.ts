import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common'
import { PrismaService } from 'src/common/prisma/prisma.service'
import * as bcrypt from 'bcrypt'
import { User } from 'src/common/entities/user.entity'
import { UserRole } from '@prisma/client'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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

  async findAll(user: User): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: {
        tenantId: user.tenantId,
        id: { not: user.id }, // Exclude current user
      },
    })
    return users.map(this.mapPrismaUserToGraphQL)
  }

  async create(data: {
    name: string
    email: string
    password: string
    role: UserRole
    tenantId: string
    restaurantId?: string
  }): Promise<User> {
    // Check if user already exists
    const existingUser = await this.findByEmail(data.email)
    if (existingUser) {
      throw new ConflictException('Email already in use')
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const roleConnections = this.getRoleConnections(
      data.role,
      data.restaurantId,
    )

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role,
        tenant: { connect: { id: data.tenantId } },
        ...roleConnections,
      },
    })

    return this.mapPrismaUserToGraphQL(user)
  }

  async validateCredentials(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } })
    if (!user) {
      throw new NotFoundException('User not found')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    return user
  }

  private getRoleConnections(role: UserRole, restaurantId?: string) {
    if (!restaurantId) return {}

    switch (role) {
      case UserRole.MANAGER:
        return { managedRestaurants: { connect: { id: restaurantId } } }
      case UserRole.WAITER:
        return { waitingRestaurants: { connect: { id: restaurantId } } }
      case UserRole.CHEF:
        return { chefRestaurants: { connect: { id: restaurantId } } }
      case UserRole.RESTAURANT_ADMIN:
        return { adminOfRestaurant: { connect: { id: restaurantId } } }
      default:
        return {}
    }
  }
}
