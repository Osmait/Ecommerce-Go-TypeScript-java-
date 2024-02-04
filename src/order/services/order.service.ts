import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  public async createOrder(userId: string) {
    const orderActive = await this.prisma.order.findFirst({
      where: { status: 'Active', userId },
    });
    if (orderActive) {
      throw new ConflictException();
    }
    const order = {
      id: uuidv4(),
    };

    await this.prisma.order.create({ data: order });
  }
  public async findActiveOrder(userId: string) {
    return await this.prisma.order.findMany({
      where: { userId },
      include: { items: true },
    });
  }
  public async cancelOrder(orderId: string) {
    const order = await this.prisma.order.findFirst({ where: { id: orderId } });
    order.status = 'canceled';
    await this.prisma.order.update({ where: { id: order.id }, data: order });
  }
}
