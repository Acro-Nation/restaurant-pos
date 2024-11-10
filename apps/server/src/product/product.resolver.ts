import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql'
import { ProductService } from './product.service'
import { Product } from 'src/common/entities/product.entity'
import { CreateProductInput } from './dto/create-product.input'
import { UpdateProductInput } from './dto/update-product.input'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { Roles } from 'src/auth/roles.decorator'
import { UserRole } from '@prisma/client'
import { PaginationParams } from 'src/common/utils/pagination.utils'
import { EncryptResponse } from 'src/common/interfaces/config'

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => EncryptResponse)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.RESTAURANT_ADMIN, UserRole.MANAGER)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
    @Context() context: any,
  ): Promise<EncryptResponse> {
    return this.productService.create(createProductInput, context.req.user)
  }

  @Query(() => EncryptResponse)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(
    UserRole.RESTAURANT_ADMIN,
    UserRole.MANAGER,
    UserRole.WAITER,
    UserRole.CHEF,
  )
  async getAllProducts(
    @Context() context: any,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  ): Promise<EncryptResponse> {
    const params: PaginationParams = { page, limit }
    return this.productService.findAll(context.req.user, params)
  }

  @Query(() => EncryptResponse)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(
    UserRole.RESTAURANT_ADMIN,
    UserRole.MANAGER,
    UserRole.WAITER,
    UserRole.CHEF,
  )
  async getProduct(@Args('id') id: string): Promise<EncryptResponse> {
    return this.productService.findOne(id)
  }

  @Mutation(() => EncryptResponse)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.RESTAURANT_ADMIN, UserRole.MANAGER)
  async updateProduct(
    @Args('id') id: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ): Promise<EncryptResponse> {
    return this.productService.update(id, updateProductInput)
  }

  @Mutation(() => EncryptResponse)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.RESTAURANT_ADMIN, UserRole.MANAGER)
  async removeProduct(@Args('id') id: string): Promise<EncryptResponse> {
    return this.productService.remove(id)
  }
}
