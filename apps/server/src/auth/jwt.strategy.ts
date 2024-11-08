import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'
import { Request } from 'express'
import { UserService } from 'src/user/user.service'
import { JwtPayload } from 'src/common/interfaces/payload'
import { EncryptDecryptService } from 'src/common/encrypt-decrypt/encrypt-decrypt.service'
import { ConfigService } from '@nestjs/config'
import { User } from '@prisma/client'

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
      // Decrypt user ID and tenant ID from JWT payload
      const decryptedUserId = this.encryptDecryptService.decryptData(
        payload.sub,
      )
      const decryptedTenantId = this.encryptDecryptService.decryptData(
        payload.tenantId,
      )

      // Check if decryption was successful
      if (!decryptedUserId || !decryptedTenantId) {
        throw new UnauthorizedException('Decryption failed')
      }

      // Fetch user from the database using decrypted user ID
      const encryptedUser = await this.userService.findOne(decryptedUserId)

      // Check if the encrypted user was found and decrypt the data field
      if (!encryptedUser || !encryptedUser.data) {
        throw new UnauthorizedException(
          'User not found or missing encrypted data',
        )
      }

      // Decrypt the user data (which contains tenantId)
      const userData: User = this.encryptDecryptService.decryptData(
        encryptedUser.data,
      )

      // Verify that the decrypted tenantId matches the expected tenantId
      if (!userData || userData.tenantId !== decryptedTenantId) {
        throw new UnauthorizedException('Invalid tenant access')
      }

      // Return the decrypted user data if everything is valid
      return userData
    } catch (error) {
      throw new UnauthorizedException(
        'Invalid JWT payload or decryption failed',
      )
    }
  }
}
