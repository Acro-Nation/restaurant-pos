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
import {
  calculateOffset,
  paginate,
  PaginationParams,
} from 'src/common/utils/pagination.utils'
import { EncryptDecryptService } from 'src/common/encrypt-decrypt/encrypt-decrypt.service'
import { EncryptResponse } from 'src/common/interfaces/config'

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly encryptDecryptService: EncryptDecryptService,
  ) {}

  async findByEmail(email: string): Promise<EncryptResponse> {
    const user = await this.prisma.user.findUnique({ where: { email } })
    if (!user) {
      return { data: '', success: false, message: 'User not found' }
    }

    // Encrypt the user data
    const encryptedData = this.encryptDecryptService.encryptData(user)
    return {
      data: encryptedData,
      success: true,
      message: 'User retrieved successfully',
    }
  }

  async findOne(id: string): Promise<EncryptResponse> {
    const user = await this.prisma.user.findUnique({ where: { id } })
    if (!user) {
      throw new NotFoundException('User not found')
    }

    const encryptedData = this.encryptDecryptService.encryptData(user)
    return {
      data: encryptedData,
      success: true,
      message: 'User retrieved successfully',
    }
  }

  async findAll(
    user: User,
    params: PaginationParams,
  ): Promise<EncryptResponse> {
    const { page, limit } = params
    const offset = calculateOffset(page, limit)

    const [users, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where: {
          tenantId: user.tenantId,
          id: { not: user.id }, // Exclude current user
        },
        skip: offset,
        take: limit,
      }),
      this.prisma.user.count({
        where: {
          tenantId: user.tenantId,
          id: { not: user.id }, // Exclude current user
        },
      }),
    ])
    const paginatedResult = paginate(users, total, page, limit)

    const encryptedData =
      this.encryptDecryptService.encryptData(paginatedResult)
    return {
      data: encryptedData,
      success: true,
      message: 'Users retrieved successfully!',
    }
  }

  async create(data: {
    name: string
    email: string
    password: string
    role: UserRole
    tenantId: string
    restaurantId?: string
  }): Promise<EncryptResponse> {
    const existingUser = await this.findByEmail(data.email)
    if (existingUser.success) {
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

    const encryptedData = this.encryptDecryptService.encryptData(user)
    return {
      data: encryptedData,
      success: true,
      message: 'User created successfully!',
    }
  }

  async validateCredentials(email: string, password: string): Promise<User> {
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
