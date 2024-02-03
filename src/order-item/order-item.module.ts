import { Module } from '@nestjs/common';
import { OrderItemService } from './services/orderItem.service';
import { OrderItemController } from './Controller/orderItem.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [OrderItemService, PrismaService],
  controllers: [OrderItemController],
})
export class OrderItemModule {}
