import { Module } from '@nestjs/common';
import { CategoryController } from './controller/category.controller';
import { CategoryService } from './services/category.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CategoryController],
  providers: [PrismaService, CategoryService],
})
export class CategoryModule {}
