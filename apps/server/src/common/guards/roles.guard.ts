import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    )
    if (!requiredRoles) return true

    const ctx = GqlExecutionContext.create(context)
    const { user } = ctx.getContext().req

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Insufficient permissions')
    }

    return true
  }
}
