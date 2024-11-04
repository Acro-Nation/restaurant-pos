import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { JwtStrategy } from './jwt.strategy'
import { UserModule } from '../user/user.module'
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // jwt secret
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    AuthResolver,
    GqlAuthGuard,
    RolesGuard,
    PrismaService,
  ],
})
export class AuthModule {}
