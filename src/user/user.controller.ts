import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    return this.userService.create(createUserDto, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    return this.userService.findAll(res);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.userService.findOne(+id, res);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    return this.userService.update(+id, updateUserDto, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.userService.remove(+id, res);
  }
}
