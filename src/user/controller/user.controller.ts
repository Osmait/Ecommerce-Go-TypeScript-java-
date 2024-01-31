import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { userRequest, userRequestDto } from '../schema/userRequest';
import { ZodPipe } from 'src/zodpipe/zodpipe.pipe';
import { UserResponse } from '../schema/userResponse';
import {
  UserQueryParams,
  UserQueryParamsSchema,
} from '../schema/userQueryParams';
import { idValidate, idValidateDto } from 'src/share/idValidate';
import { Public } from 'src/auth/authGuard/public.decorator';
import { Roles } from 'src/auth/roleDecorate/role.decorator';
import { Role } from 'src/auth/roleDecorate/role.enum';
import { RolesGuard } from 'src/auth/rolesGuard/roles.guard';

@Controller('user')
export class UserController {
  constructor(private userServices: UserService) {}

  @Post()
  @Public()
  @UsePipes(new ZodPipe(userRequest))
  public createUser(@Body() user: userRequestDto) {
    this.userServices.createUser(user);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @UsePipes(new ZodPipe(UserQueryParamsSchema))
  public findOne(@Query() params: UserQueryParams): Promise<UserResponse> {
    return this.userServices.findUserbyEmail(params);
  }

  @Put()
  public updateUser(
    @Body(new ZodPipe(userRequest)) user: userRequestDto,
    @Query(new ZodPipe(idValidate)) param: idValidateDto,
    @Req() request: Request,
  ): void {
    const userAuth = request['x-user'];
    if (userAuth.id === param.id) {
      throw new UnauthorizedException();
    }

    this.userServices.updateUser(user, param.id);
  }

  @Delete()
  public deleteuser(
    @Query(new ZodPipe(idValidate)) param: idValidateDto,
    @Req() request: Request,
  ): void {
    const user = request['x-user'];
    if (user.id === param.id) {
      throw new UnauthorizedException();
    }
    this.userServices.deleteUser(param.id);
  }
}
