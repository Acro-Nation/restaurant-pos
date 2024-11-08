import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies['accessToken']

    if (!token) {
      throw new UnauthorizedException('Access token is missing')
    }

    try {
      const decoded = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      })
      const userId = decoded.sub
      const tenantId = decoded.tenantId

      const user = await this.userService.findOne(userId)
      if (!user || user.tenantId !== tenantId) {
        throw new UnauthorizedException('Invalid tenant access')
      }

      req['user'] = user
      req['tenantId'] = tenantId
      next()
    } catch (error) {
      throw new UnauthorizedException('Invalid access token')
    }
  }
}
