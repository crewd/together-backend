import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { LoginResultDto } from './dto/login-result.dto';
import { compare, hash } from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { SignUpDto } from './dto/signUpDto.dto';

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
      { id: checkedUser.id, email: checkedUser.email, name: checkedUser.name },
      loginDto.keep,
    );

    return { token: userToken };
  }

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const checkEmail = await this.userRepository.find({
      email: signUpDto.email,
    });

    console.log(checkEmail);

    if (checkEmail.length > 0) {
      throw new ConflictException();
    }
    const hashPassword = await hash(
      signUpDto.password,
      Number(process.env.SALT_ROUNDS),
    );

    const user = new User();
    user.email = signUpDto.email;
    user.name = signUpDto.name;
    user.password = hashPassword;

    await this.userRepository.save(user);
  }
}
