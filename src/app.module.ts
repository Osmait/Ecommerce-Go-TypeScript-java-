import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { OrderItemModule } from './order-item/order-item.module';

@Module({
  imports: [CategoryModule, UserModule, ProductModule, OrderModule, AuthModule, OrderItemModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
