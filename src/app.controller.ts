import {
  Controller,
  Post,
  UseGuards,
  Request,
  UsePipes,
  Body,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JoiValidationPipe } from './users/pipes/validation.pipe';
import { signUpUserSchema } from './users/schemas/sign-up-user.schema';
import { CreateUserDto } from './users/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/register')
  @UsePipes(new JoiValidationPipe(signUpUserSchema))
  async register(@Body() createUserDto: CreateUserDto) {
    await this.authService.register(createUserDto);
    return 'User created.';
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
