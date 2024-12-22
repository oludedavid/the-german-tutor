import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../schemas/user.schema';

interface RequestWithUser extends Request {
  user?: UserDocument;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const token = req.headers['authorization']?.replace('Bearer ', '');
      if (!token) {
        throw new UnauthorizedException('No token provided');
      }
      const decoded = this.jwtService.verify(token);
      if (!decoded) {
        throw new UnauthorizedException('Invalid token');
      }
      req.user = decoded;

      next();
    } catch {
      throw new UnauthorizedException('Authentication failed');
    }
  }
}
