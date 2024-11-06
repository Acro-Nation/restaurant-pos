import { Injectable } from '@nestjs/common'
import { CreateProductInput } from './dto/create-product.input'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Product } from '@prisma/client'

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  async createProduct(
    createProductInput: CreateProductInput,
  ): Promise<CreateProductInput> {
    return this.prisma.product.create({
      data: createProductInput,
    })
  }

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany()
  }
}
