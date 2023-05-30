import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  sign(id: string, keep: boolean) {
    try {
      const token = this.jwtService.sign(id, !keep && { expiresIn: '1h' });
      return token;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  verify(token: string) {
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.SECRET_KEY,
      });
      return payload;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
