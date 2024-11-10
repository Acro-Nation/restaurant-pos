import { Request } from 'express'
import { User } from '@prisma/client'
import { Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'

import { UserService } from 'src/user/user.service'
import { JwtPayload } from 'src/common/interfaces/payload'
import { EncryptDecryptService } from 'src/common/encrypt-decrypt/encrypt-decrypt.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly encryptDecryptService: EncryptDecryptService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: (req: Request) => req.cookies?.accessToken,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    })
  }

  async validate(payload: JwtPayload) {
    try {
      // Use decryptFromJwt for JWT payload data
      const userId = this.encryptDecryptService.decryptFromJwt(payload.sub)
      const tenantId = this.encryptDecryptService.decryptFromJwt(
        payload.tenantId,
      )

      const { data, success } = await this.userService.findOne(userId)
      if (!success || !data) {
        throw new UnauthorizedException('User not found')
      }

      // Use regular decryptData for database data
      const user = this.encryptDecryptService.decryptData(data, true)

      if (user.tenantId !== tenantId) {
        throw new UnauthorizedException('Invalid tenant access')
      }

      return user
    } catch (error) {
      throw new UnauthorizedException(
        `Invalid JWT payload or decryption failed: ${error.message}`,
      )
    }
  }
}
