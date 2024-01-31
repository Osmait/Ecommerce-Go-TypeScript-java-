import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { userRequestDto } from '../schema/userRequest';
import { UserResponse } from '../schema/userResponse';
import { UserQueryParams } from '../schema/userQueryParams';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  public async createUser(userRequest: userRequestDto): Promise<void> {
    const user: Prisma.UserCreateInput = {
      id: uuidv4(),
      name: userRequest.name,
      lastName: userRequest.lastName,
      email: userRequest.email,
      password: await bcrypt.hash(userRequest.password, 10),
    };
    await this.prisma.user.create({ data: user });
  }
  public async findUserbyEmail(params: UserQueryParams): Promise<UserResponse> {
    const result = await this.prisma.user.findFirst({
      where: { OR: [{ email: params.email }, { id: params.id }] },
    });
    if (!result) {
      throw new NotFoundException();
    }
    const { id, name, lastName, email, createdAt } = result;
    const userResponse: UserResponse = { id, name, lastName, email, createdAt };
    return userResponse;
  }
  public async updateUser(user: userRequestDto, id: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { ...user },
    });
  }
  public async deleteUser(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
