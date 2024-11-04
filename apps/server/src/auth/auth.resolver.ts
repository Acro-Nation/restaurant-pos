import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { AuthResponse } from './dto/auth-response.dto' // Ensure you have a DTO for response
import { LoginDto } from './dto/login.dto'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async login(
    @Args('loginDto') loginDto: LoginDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto)
  }
}
