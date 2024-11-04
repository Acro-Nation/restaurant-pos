// src/utils/enumMapper.ts
import { UserRole as AppUserRole } from '../interfaces/config'
import { UserRole as PrismaUserRole } from '@prisma/client'

export function mapPrismaUserRoleToAppUserRole(
  prismaRole: PrismaUserRole,
): AppUserRole {
  switch (prismaRole) {
    case PrismaUserRole.SUPER_ADMIN:
      return AppUserRole.SUPER_ADMIN
    case PrismaUserRole.RESTAURANT_ADMIN:
      return AppUserRole.RESTAURANT_ADMIN
    case PrismaUserRole.MANAGER:
      return AppUserRole.MANAGER
    case PrismaUserRole.WAITER:
      return AppUserRole.WAITER
    case PrismaUserRole.CHEF:
      return AppUserRole.CHEF
    default:
      throw new Error(`Unknown role: ${prismaRole}`)
  }
}
