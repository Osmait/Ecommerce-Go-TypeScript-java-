import { Body, Controller, Delete, Post, Put, Query } from '@nestjs/common';
import { OrderItemService } from '../services/orderItem.service';
import { OrderItem } from '@prisma/client';
import { ZodPipe } from 'src/zodpipe/zodpipe.pipe';
import { idValidate, idValidateDto } from 'src/share/idValidate';

@Controller('order')
export class OrderItemController {
  constructor(private orderItemServices: OrderItemService) {}
  @Post()
  public createOrderItem(@Body() orderRequest: OrderItem) {
    this.orderItemServices.createOrderItem(orderRequest);
  }
  @Put()
  public updateOrderItem(
    @Body() orderRequest: OrderItem,
    @Query(new ZodPipe(idValidate)) param: idValidateDto,
  ) {
    this.orderItemServices.updateOrderItem(orderRequest, param.id);
  }
  @Delete()
  public deleteOrderItem(@Query(new ZodPipe(idValidate)) param: idValidateDto) {
    this.orderItemServices.deleteOrderItem(param.id);
  }
}
