import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validateUser(loginDto: LoginDto) {
    const user = await this.userService.validateCredentials(
      loginDto.email,
      loginDto.password,
    )

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    // Generate access and refresh tokens
    const payload = { sub: user.id, tenantId: user.tenantId, role: user.role }
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m', // Short-lived access token
    })

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d', // Long-lived refresh token
    })

    return { accessToken, refreshToken }
  }
}
