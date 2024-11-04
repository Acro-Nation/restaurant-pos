import { Resolver, Mutation, Args, Context } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { Response } from 'express'
import { UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request as ExpressRequest } from 'express'
import { LoginResponse, RefreshTokenResponse } from './dto/auth-response.dto'

interface RequestWithCookies extends ExpressRequest {
  cookies: { [key: string]: string }
}

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Mutation(() => LoginResponse)
  async login(
    @Args('loginDto') loginDto: LoginDto,
    @Context('res') res: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.validateUser(loginDto)

    // Set cookies for access and refresh tokens
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000, // 15 minutes
      sameSite: 'strict',
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
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
        secret: process.env.JWT_REFRESH_SECRET,
      })

      const newAccessToken = this.jwtService.sign(
        { sub: decoded.sub, tenantId: decoded.tenantId, role: decoded.role },
        { secret: process.env.JWT_SECRET, expiresIn: '15m' },
      )

      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
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
