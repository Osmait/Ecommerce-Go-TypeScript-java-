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
import { CategoryService } from '../services/category.service';
import { CategoryRequest, CategoryRequestDto } from '../schema/categoryRequest';
import { ZodPipe } from 'src/zodpipe/zodpipe.pipe';
import { CategoryFilters, CategoryFiltersDto } from '../schema/categoryFilters';
import { Public } from 'src/auth/authGuard/public.decorator';
import { idValidate, idValidateDto } from 'src/share/idValidate';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  @Public()
  public createUser(
    @Body(new ZodPipe(CategoryRequest)) categoryRequest: CategoryRequestDto,
  ): void {
    this.categoryService.createCategory(categoryRequest);
  }
  @Get()
  @Public()
  @UsePipes(new ZodPipe(CategoryFilters))
  public findCategorys(@Query() categoryFilters: CategoryFiltersDto) {
    console.log(categoryFilters);
    const filter: CategoryFiltersDto = {
      skip: categoryFilters.skip ? categoryFilters.skip : 1,
      take: categoryFilters.take ? categoryFilters.take : 10,
      orderBy: categoryFilters.orderBy ? categoryFilters.orderBy : 'name',
      orderDir: categoryFilters.orderDir ? categoryFilters.orderDir : 'asc',
    };
    return this.categoryService.findAllCategory(filter);
  }

  @Put()
  @Public()
  public updateCategory(
    @Body(new ZodPipe(CategoryRequest)) categoryRequest: CategoryRequestDto,
    @Query(new ZodPipe(idValidate)) param: idValidateDto,
  ) {
    this.categoryService.updateCategory(categoryRequest, param.id);
  }

  @Delete()
  @Public()
  public deleteCategory(@Query(new ZodPipe(idValidate)) param: idValidateDto) {
    this.categoryService.deleteCategory(param.id);
  }
}
