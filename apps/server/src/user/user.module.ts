import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver' // Import the UserResolver if you have one
import { PrismaModule } from '../common/prisma/prisma.module' // Adjust based on your project structure

@Module({
  imports: [PrismaModule], // Import PrismaModule if you're using it
  providers: [UserService, UserResolver],
  exports: [UserService], // Export UserService
})
export class UserModule {}
