import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import { ProductService } from './product.service'

import { CreateProductInput } from './dto/create-product.input'
import { Product } from 'src/common/entities/product.entity'

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productService.createProduct(createProductInput)
  }

  @Query(() => [Product])
  getAllProducts(): Promise<Product[]> {
    return this.productService.findAll()
  }
}
