import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderItem } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { OrderItemRequestDto } from '../schema/orderItemRequest';
@Injectable()
export class OrderItemService {
  constructor(private prisma: PrismaService) {}

  public async createOrderItem(orderRequest: OrderItemRequestDto) {
    const product = await this.prisma.product.findFirst({
      where: { id: orderRequest.productId },
    });
    if (!product) {
      throw new BadRequestException();
    }
    const order = await this.prisma.order.findFirst({
      where: { id: orderRequest.orderId },
    });
    if (!order || order.status != 'Active') {
      throw new BadRequestException();
    }
    const orderItem = {
      id: uuidv4(),
      productId: product.id,
      quantity: orderRequest.quantity,
      orderId: order.id,
    };
    await this.prisma.orderItem.create({ data: orderItem });
  }
  public async updateOrderItem(orderRequest: OrderItem, id: string) {
    const product = await this.prisma.product.findFirst({
      where: { id: orderRequest.productId },
    });
    if (!product) {
      throw new BadRequestException();
    }
    const order = await this.prisma.order.findFirst({
      where: { id: orderRequest.orderId },
    });
    if (!order || order.status != 'Active') {
      throw new BadRequestException();
    }
    await this.prisma.orderItem.update({ where: { id }, data: orderRequest });
  }
  public async deleteOrderItem(id: string) {
    await this.prisma.orderItem.delete({ where: { id } });
  }
}
