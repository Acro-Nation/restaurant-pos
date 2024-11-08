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

  /**
   * Retrieves a user by their email address
   * @param email - The email address to search for
   * @returns The found User object or null if not found
   *
   * This method:
   * 1. Looks up a user by their unique email in the database
   * 2. Returns null if no user is found with that email
   * 3. Maps the Prisma user model to the GraphQL User type
   * 4. Used for authentication and duplicate email checks
   */
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } })
    return user ? user : null
  }

  /**
   * Retrieves a single user by their ID
   * @param id - The unique identifier of the user to find
   * @returns The found User object or null if not found
   *
   * This method:
   * 1. Looks up a user by their unique ID in the database
   * 2. Returns null if no user is found with that ID
   * 3. Maps the Prisma user model to the GraphQL User type
   * 4. Used for authentication and user profile lookups
   */
  async findOne(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } })
    return user ? user : null
  }

  /**
   * Retrieves all users for a given tenant with pagination
   * @param user - The authenticated user making the request
   * @param params - Pagination parameters (page and limit)
   * @returns Encrypted response containing paginated user data
   *
   * This method:
   * 1. Calculates pagination offset based on page and limit
   * 2. Queries users belonging to the same tenant as requesting user
   * 3. Excludes the requesting user from results
   * 4. Returns encrypted paginated data with success message
   */
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

    // Encrypt without needing JSON.stringify
    const encryptedData =
      this.encryptDecryptService.encryptData(paginatedResult)

    return {
      data: encryptedData,
      success: true,
      message: 'Users retrieved successfully!',
    }
  }

  /**
   * Creates a new user in the system
   * @param data - Object containing user details
   * @param data.name - User's full name
   * @param data.email - User's email address (must be unique)
   * @param data.password - User's password (will be hashed)
   * @param data.role - User's role in the system
   * @param data.tenantId - ID of tenant this user belongs to
   * @param data.restaurantId - ID of restaurant if user is restaurant staff
   * @returns The created User object
   *
   * This method:
   * 1. Checks if email is already in use
   * 2. Hashes the password for security
   * 3. Creates user with provided role and tenant
   * 4. Handles restaurant connection if applicable
   * 5. Returns created user with all fields except password
   */
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

    return user
  }

  /**
   * Validates user credentials for authentication
   * @param email - User's email address
   * @param password - User's password to validate
   * @returns The authenticated User if credentials are valid
   *
   * This method:
   * 1. Looks up user by email address
   * 2. Throws NotFoundException if user doesn't exist
   * 3. Compares provided password with stored hash
   * 4. Throws UnauthorizedException if password is invalid
   * 5. Returns the authenticated user if successful
   */
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

  /**
   * Gets the appropriate role-based restaurant connections for a user
   * @param role - The user's role in the system
   * @param restaurantId - Optional ID of restaurant to connect user to
   * @returns Object containing Prisma connection data based on role
   *
   * This method:
   * 1. Returns empty object if no restaurantId provided
   * 2. Maps each role to its corresponding restaurant relationship
   * 3. Connects managers to managedRestaurants
   * 4. Connects waiters to waitingRestaurants
   * 5. Connects chefs to chefRestaurants
   * 6. Connects admins to adminOfRestaurant
   * 7. Returns empty object for roles without restaurant connections
   */
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
