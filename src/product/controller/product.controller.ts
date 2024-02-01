import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { Public } from 'src/auth/authGuard/public.decorator';
import { ZodPipe } from 'src/zodpipe/zodpipe.pipe';

import { idValidate, idValidateDto } from 'src/share/idValidate';
import { ProductRequest, ProductRequestDto } from '../schema/produtRequest';
import { ProductFilters, ProductFiltersDto } from '../schema/productFilter';

@Controller('product')
export class ProductController {
  constructor(private productServices: ProductService) {}

  @Post()
  @Public()
  public createProduct(
    @Body(new ZodPipe(ProductRequest)) productRequest: ProductRequestDto,
  ) {
    this.productServices.createProduct(productRequest);
  }
  @Get()
  @Public()
  @UsePipes(new ZodPipe(ProductFilters))
  public async findProducts(@Query() productFilters: ProductFiltersDto) {
    const filter: ProductFiltersDto = {
      skip: productFilters.skip ? productFilters.skip : 1,
      take: productFilters.take ? productFilters.take : 10,
      orderBy: productFilters.orderBy ? productFilters.orderBy : 'name',
      orderDir: productFilters.orderDir ? productFilters.orderDir : 'desc',
      maxPrice: productFilters.maxPrice
        ? productFilters.maxPrice
        : await this.productServices.maxPriceofProducts(),
      minPrice: productFilters.minPrice ? productFilters.minPrice : 0,
    };
    return this.productServices.findAllProduct(filter);
  }

  @Put()
  public updateProduct(
    @Body(new ZodPipe(ProductRequest)) categoryRequest: ProductRequestDto,
    @Query(new ZodPipe(idValidate)) param: idValidateDto,
  ) {
    this.productServices.updateProduct(categoryRequest, param.id);
  }

  @Delete()
  public deleteProduct(@Query(new ZodPipe(idValidate)) param: idValidateDto) {
    this.productServices.deleteProduct(param.id);
  }
}
