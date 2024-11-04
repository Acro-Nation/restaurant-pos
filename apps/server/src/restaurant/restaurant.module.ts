import { Module } from '@nestjs/common'
import { RestaurantService } from './restaurant.service'
import { RestaurantResolver } from './restaurant.resolver' // Import the resolver
import { PrismaService } from '../common/prisma/prisma.service'
import { UserModule } from 'src/user/user.module'

@Module({
  imports: [UserModule],
  providers: [RestaurantService, RestaurantResolver, PrismaService], // Add resolver here
  exports: [RestaurantService],
})
export class RestaurantModule {}
