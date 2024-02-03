import { Injectable } from '@nestjs/common';
import { OrderItem } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class OrderItemService {
  constructor(private prisma: PrismaService) {}

  public async createOrderItem(orderRequest: OrderItem) {
    const order = {
      id: uuidv4(),
      productId: orderRequest.productId,
      quantity: orderRequest.quantity,
      orderId: orderRequest.orderId,
    };
    await this.prisma.orderItem.create({ data: order });
  }
  public async updateOrderItem(orderRequest: OrderItem, id: string) {
    await this.prisma.orderItem.update({ where: { id }, data: orderRequest });
  }
  public async deleteOrderItem(id: string) {
    await this.prisma.orderItem.delete({ where: { id } });
  }
}
