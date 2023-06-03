import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from 'src/store/store.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { Permission, Roles } from './role.enum';
import { ChangeRoleDto } from './dto/change-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    @InjectRepository(Store)
    private storeRepository: Repository<Store>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async changeRole(
    userId: number,
    storeId: number,
    changeRoleDto: ChangeRoleDto,
  ) {
    const user = await this.userRepository.findOne({ id: userId });

    if (!user) {
      throw new NotFoundException();
    }

    const store = await this.storeRepository.findOne({ id: storeId });

    if (!store) {
      throw new NotFoundException();
    }

    const role = await this.roleRepository.findOne({
      userId: userId,
      storeId: storeId,
    });

    if (!role) {
      throw new NotFoundException();
    }

    if (!Object.values(Roles).includes(changeRoleDto.roleName as Roles)) {
      throw new BadRequestException();
    }

    role.name = changeRoleDto.roleName;
    role.permission =
      changeRoleDto.roleName === Roles.OWNER || Roles.MANAGER
        ? Permission.ADMIN
        : Permission.EMPLOYEE;

    await this.roleRepository.save(role);
  }
}
