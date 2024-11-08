import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import { ConfigService } from '@nestjs/config'
import { EncryptDecryptService } from 'src/common/encrypt-decrypt/encrypt-decrypt.service'
import { User } from '@prisma/client'

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly encryptDecryptService: EncryptDecryptService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies['accessToken']

    if (!token) {
      throw new UnauthorizedException('Access token is missing')
    }

    try {
      // Verify the token
      const decoded = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      })

      // Decrypt user ID and tenant ID from JWT payload
      const decryptedUserId = this.encryptDecryptService.decryptData(
        decoded.sub,
      )
      const decryptedTenantId = this.encryptDecryptService.decryptData(
        decoded.tenantId,
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

      // Attach user data and tenantId to the request object
      req['user'] = userData
      req['tenantId'] = decryptedTenantId

      // Proceed to the next middleware or route handler
      next()
    } catch (error) {
      throw new UnauthorizedException(
        'Invalid access token or decryption failed',
      )
    }
  }
}
