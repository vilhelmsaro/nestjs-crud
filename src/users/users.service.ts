import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  getUser(id: string) {
    return this.userModel
      .findOne({ _id: id }, { _id: 0, __v: 0, password: 0 })
      .lean();
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).lean();
  }
}
//TODO mongoose updated and created at timestamps!
