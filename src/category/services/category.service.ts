import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { CategoryRequestDto } from '../schema/categoryRequest';
import { CategoryFiltersDto } from '../schema/categoryFilters';
@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  public async createCategory(
    categoryRequest: CategoryRequestDto,
  ): Promise<void> {
    const category: Prisma.CategoryCreateInput = {
      id: uuidv4(),
      name: categoryRequest.name,
      description: categoryRequest.description,
    };
    await this.prisma.category.create({ data: category });
  }

  public async findAllCategory(
    categoryFilters: CategoryFiltersDto,
  ): Promise<Category[]> {
    const { skip, take, orderBy, filterBy, filterParam, orderDir } =
      categoryFilters;

    const skipCal = (skip - 1) * take;

    try {
      const listOfCategory = filterBy
        ? await this.prisma.category.findMany({
            skip: skipCal,
            take: take,
            orderBy: { [orderBy]: orderDir },
            where: {
              [filterBy]: filterParam,
            },
          })
        : await this.prisma.category.findMany({
            skip: skipCal,
            take: take,
            orderBy: { [orderBy]: orderDir },
            include: { product: true },
          });

      return listOfCategory;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  public async updateCategory(
    categoryRequest: CategoryRequestDto,
    id: string,
  ): Promise<void> {
    await this.prisma.category.update({
      where: { id },
      data: categoryRequest,
    });
  }

  public async deleteCategory(id: string): Promise<void> {
    await this.prisma.category.delete({
      where: { id },
    });
  }
}
