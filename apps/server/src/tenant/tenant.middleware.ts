import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing')
    }

    const token = authHeader.split(' ')[1]

    try {
      const decoded = this.jwtService.verify(token)
      const userId = decoded.sub
      const tenantId = decoded.tenantId

      // Fetch user to validate tenant
      const user = await this.userService.findOne(userId)
      if (!user || user.tenantId !== tenantId) {
        throw new UnauthorizedException('Invalid tenant access')
      }

      req['user'] = user
      next()
    } catch (error) {
      throw new UnauthorizedException('Invalid token')
    }
  }
}
