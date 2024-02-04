import { Body, Controller, Delete, Post, Put, Query } from '@nestjs/common';
import { OrderItemService } from '../services/orderItem.service';
import { OrderItem } from '@prisma/client';
import { ZodPipe } from 'src/zodpipe/zodpipe.pipe';
import { idValidate, idValidateDto } from 'src/share/idValidate';
import {
  OrderItemRequest,
  OrderItemRequestDto,
} from '../schema/orderItemRequest';

@Controller('order')
export class OrderItemController {
  constructor(private orderItemServices: OrderItemService) {}
  @Post()
  public createOrderItem(
    @Body(new ZodPipe(OrderItemRequest)) orderRequest: OrderItemRequestDto,
  ) {
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
