import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'
import { Request } from 'express'
import { UserService } from 'src/user/user.service'
import { JwtPayload } from 'src/common/interfaces/payload'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: (req: Request) => {
        return req.cookies?.accessToken // Extract JWT from cookie named 'accessToken'
      },
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findOne(payload.sub)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
