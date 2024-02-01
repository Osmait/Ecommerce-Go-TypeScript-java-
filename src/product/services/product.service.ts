import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { ProductRequestDto } from '../schema/produtRequest';
import { ProductFiltersDto } from '../schema/productFilter';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  public async createProduct(productRequest: ProductRequestDto): Promise<void> {
    const category = await this.prisma.category.findUnique({
      where: { id: productRequest.categoryId },
    });
    if (!category) {
      throw new NotFoundException();
    }
    const product = {
      id: uuidv4(),
      name: productRequest.name,
      description: productRequest.description,
      price: productRequest.price,
      stock: productRequest.stock,
      imagen: productRequest.imagen,
      categoryId: category.id,
    };
    await this.prisma.product.create({ data: product });
  }

  public async findAllProduct(
    productFilters: ProductFiltersDto,
  ): Promise<Product[]> {
    const {
      skip,
      take,
      orderBy,
      filterBy,
      filterParam,
      orderDir,
      maxPrice,
      minPrice,
    } = productFilters;

    const skipCal = (skip - 1) * take;

    const condition = {
      skip: skipCal,
      take: take,
      orderBy: { [orderBy]: orderDir },
      where: {
        ...(filterBy && { [filterBy]: filterParam }),
        price: {
          gte: minPrice,
          lte: maxPrice,
        },
      },
    };

    try {
      const listOfProduct = await this.prisma.product.findMany(condition);
      return listOfProduct;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
  public async maxPriceofProducts() {
    const maxPrice = await this.prisma.product.findFirst({
      select: {
        price: true,
      },
      orderBy: {
        price: 'desc',
      },
    });
    return maxPrice.price;
  }

  public async updateProduct(
    productRequest: ProductRequestDto,
    id: string,
  ): Promise<void> {
    await this.prisma.product.update({
      where: { id },
      data: productRequest,
    });
  }

  public async deleteProduct(id: string): Promise<void> {
    await this.prisma.product.delete({
      where: { id },
    });
  }
}
