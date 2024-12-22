import { Body, Post, Controller } from '@nestjs/common';
import { AuthenticationManagerService } from './authentication-manager.service';
import { RegisterUserDto } from './dtos/register-user.dto';

@Controller('auth')
export class AuthenticationManagerController {
  constructor(private readonly authService: AuthenticationManagerService) {}

  @Post('register')
  registerUser(@Body() user: RegisterUserDto): string {
    return this.authService.registerUser(user);
  }
}
