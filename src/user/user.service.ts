import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const user = this.userRepo.create(createUserDto);
      const checkUser = this.userRepo.findOne({
        where: { email: createUserDto.email },
      });
      if (user != null && checkUser == null) {
        return this.userRepo.save(user);
      } else {
        return res
          .status(400)
          .json({ status: 400, message: 'User already exists' });
      }
    } catch {
      return res
        .status(500)
        .json({ status: 500, message: 'Internal server error' });
    }
  }

  async findAll(res: Response) {
    const user = await this.userRepo.find({
      order: { id: 'ASC' },
    });
    return res
      .status(200)
      .json({ status: 200, message: 'Users found', data: user });
  }

  async findOne(id: number, res: Response) {
    try {
      const user = await this.userRepo.findOne({ where: { id: id } });
      if (user != null) {
        return res
          .status(200)
          .json({ status: 200, message: 'User found', data: user });
      } else {
        return res.status(400).json({ status: 400, message: 'User not found' });
      }
    } catch {
      return res
        .status(500)
        .json({ status: 500, message: 'Internal server error' });
    }
  }

  async update(id: number, updateUserDto: CreateUserDto, res: Response) {
    try {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      const user = this.userRepo.update(id, updateUserDto);
      if (user != null) {
        return res.status(200).json({ status: 200, message: 'User updated' });
      } else {
        return res.status(400).json({ status: 400, message: 'User not found' });
      }
    } catch {
      return res
        .status(500)
        .json({ status: 500, message: 'Internal server error' });
    }
  }

  async remove(id: number, res: Response) {
    try {
      const user = await this.userRepo.findOne({ where: { id: id } });
      if (user != null) {
        this.userRepo.remove(user);
        return res.status(200).json({ status: 200, message: 'User deleted' });
      } else {
        return res.status(400).json({ status: 400, message: 'User not found' });
      }
    } catch {
      return res
        .status(500)
        .json({ status: 500, message: 'Internal server error' });
    }
  }
}
