import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { LoginResultDto } from './dto/login-result.dto';
import { compare } from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResultDto> {
    const checkedUser = await this.userRepository.findOne({
      email: loginDto.email,
    });

    if (!checkedUser) {
      throw new UnauthorizedException();
    }

    const checkPassword = await compare(
      loginDto.password,
      checkedUser.password,
    );

    if (!checkPassword) {
      throw new UnauthorizedException();
    }

    const userToken = this.authService.sign(
      checkedUser.id.toString(),
      loginDto.keep,
    );

    return { token: userToken };
  }
}
