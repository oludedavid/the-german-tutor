import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticationManagerService {
  registerUser(user: {
    fullName: string;
    email: string;
    password: string;
  }): string {
    return `I am a user ${user.fullName}`;
  }
}
