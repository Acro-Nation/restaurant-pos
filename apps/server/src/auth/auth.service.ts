import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import { LoginDto } from './dto/login.dto'
import { EncryptDecryptService } from 'src/common/encrypt-decrypt/encrypt-decrypt.service'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly encryptDecryptService: EncryptDecryptService,
    private readonly configService: ConfigService, // Inject ConfigService
  ) {}

  async validateUser(loginDto: LoginDto) {
    const user = await this.userService.validateCredentials(
      loginDto.email,
      loginDto.password,
    )

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    // Encrypt user ID and tenant ID
    const encryptedUserId = this.encryptDecryptService.encryptData(user.id)
    const encryptedTenantId = this.encryptDecryptService.encryptData(
      user.tenantId,
    )

    // Generate access and refresh tokens with encrypted values
    const payload = {
      sub: encryptedUserId,
      tenantId: encryptedTenantId,
      role: user.role,
    }
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '15m',
    })

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    })

    return { accessToken, refreshToken }
  }
}
