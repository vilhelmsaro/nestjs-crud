import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { hashPassword, matchPassword } from './utils/password.util';
import { EmailAlreadyExistsError } from '../users/errors/email-already-exists.error';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    console.log('user.password === pass', user.password, password);
    if (user) {
      const matches = await matchPassword(user.password, password);
      if (matches) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async register(userData: any) {
    const alreadyExists = await this.usersService.findByEmail(userData.email);
    if (alreadyExists?._id) {
      throw new EmailAlreadyExistsError();
    }
    userData.password = await hashPassword(userData.password);
    await this.usersService.create(userData);
  }

  async login(user: any) {
    const payload = { email: user.email, id: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
