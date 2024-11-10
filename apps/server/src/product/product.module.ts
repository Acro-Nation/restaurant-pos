import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductResolver } from './product.resolver'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { EncryptDecryptModule } from 'src/common/encrypt-decrypt/encrypt-decrypt.module'

@Module({
  imports: [EncryptDecryptModule],
  providers: [
    ProductService,
    ProductResolver,
    PrismaService,
    GqlAuthGuard,
    RolesGuard,
  ],
  exports: [ProductService],
})
export class ProductModule {}
