import { Resolver, Mutation, Args, Context } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { Response } from 'express'
import { UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request as ExpressRequest } from 'express'
import { LoginResponse, RefreshTokenResponse } from './dto/auth-response.dto'
import { EncryptDecryptService } from 'src/common/encrypt-decrypt/encrypt-decrypt.service'
import { ConfigService } from '@nestjs/config'

interface RequestWithCookies extends ExpressRequest {
  cookies: { [key: string]: string }
}

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly encryptDecryptService: EncryptDecryptService,
    private readonly configService: ConfigService, // Inject ConfigService
  ) {}

  @Mutation(() => LoginResponse)
  async login(
    @Args('loginDto') loginDto: LoginDto,
    @Context('res') res: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.validateUser(loginDto)

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      maxAge: 15 * 60 * 1000, // 15 minutes
      sameSite: 'strict',
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: 'strict',
    })

    return {
      message: 'Login successful',
    }
  }

  @Mutation(() => RefreshTokenResponse)
  async refreshToken(
    @Context('req') req: RequestWithCookies,
    @Context('res') res: Response,
  ) {
    const refreshToken = req.cookies['refreshToken']

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is missing')
    }

    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      })

      // Decrypt user ID and tenant ID from the decoded token
      const decryptedUserId = this.encryptDecryptService.decryptData(
        decoded.sub,
      )
      const decryptedTenantId = this.encryptDecryptService.decryptData(
        decoded.tenantId,
      )

      // Create a new access token with the decrypted information
      const newAccessToken = this.jwtService.sign(
        {
          sub: decryptedUserId,
          tenantId: decryptedTenantId,
          role: decoded.role,
        },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: '15m',
        },
      )

      // Set the new access token in a cookie
      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: this.configService.get<string>('NODE_ENV') === 'production',
        maxAge: 15 * 60 * 1000, // 15 minutes
        sameSite: 'strict',
      })

      return {
        message: 'Access token refreshed',
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token')
    }
  }

  @Mutation(() => String)
  async logout(@Context('res') res: Response) {
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    return 'Logout successful'
  }
}
