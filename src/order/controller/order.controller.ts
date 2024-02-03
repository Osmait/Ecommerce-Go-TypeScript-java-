import {
  Controller,
  Get,
  Post,
  Put,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { ZodPipe } from 'src/zodpipe/zodpipe.pipe';
import { idValidate, idValidateDto } from 'src/share/idValidate';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  public createOrder(@Req() request: Request) {
    const userAuth = request['x-user'];
    this.orderService.createOrder(userAuth.sub);
  }
  @Get()
  public getOrderAvtive(@Req() request: Request) {
    const userAuth = request['x-user'];
    this.orderService.findActiveOrder(userAuth.sub);
  }
  @Put()
  public cancelOrder(
    @Query(new ZodPipe(idValidate)) param: idValidateDto,
    @Req() request: Request,
  ) {
    const user = request['x-user'];
    if (user.sub !== param.id) {
      throw new UnauthorizedException();
    }
    this.orderService.cancelOrder(param.id);
  }
}
