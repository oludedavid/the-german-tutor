import { Body, Post, Get, Query, Controller, UseGuards } from '@nestjs/common';
import { AuthenticationManagerService } from './authentication-manager.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './guard/jwt-guard';

@Controller('auth')
export class AuthenticationManagerController {
  constructor(private readonly authService: AuthenticationManagerService) {}

  @Post('register')
  async registerUser(@Body() user: RegisterUserDto): Promise<string> {
    return this.authService.registerUser(user);
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string): Promise<string> {
    return this.authService.verifyEmail(token);
  }

  @Post('login')
  async loginUser(@Body() user: LoginUserDto): Promise<string> {
    return this.authService.loginUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logOutUser(): Promise<string> {
    return this.authService.logoutUser();
  }
}
