import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrderController } from './controller/order.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [OrderService, PrismaService],
  controllers: [OrderController],
})
export class OrderModule {}
