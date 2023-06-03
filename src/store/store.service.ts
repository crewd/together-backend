import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './store.entity';
import { Repository } from 'typeorm';
import { CreateStoreDto } from './dto/create-store.dto';
import { User } from 'src/user/user.entity';
import { Role } from 'src/role/role.entity';
import { Permission, Roles } from 'src/role/role.enum';
import { plainToInstance } from 'class-transformer';
import { StoreDto } from './dto/store.dto';
import { EditStoreDto } from './dto/edit-store.dto';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async storeList(userId: number, permission: string): Promise<StoreDto[]> {
    if (!userId) {
      throw new NotFoundException();
    }

    if (!Object.values(Permission).includes(permission as Permission)) {
      throw new BadRequestException();
    }

    const myPermission = await this.roleRepository.find({
      permission: permission as Permission,
      userId: userId,
    });

    if (myPermission.length <= 0) {
      throw new NotFoundException();
    }

    const storeIds = myPermission.map((role) => role.storeId);

    const myStores = await this.storeRepository.findByIds(storeIds);

    const stores = plainToInstance(StoreDto, myStores);

    return stores;
  }

  async createStore(createStoreDto: CreateStoreDto, userId: number) {
    const user = await this.userRepository.findOne({ id: userId });

    if (!user) {
      throw new NotFoundException();
    }

    const store = new Store();
    store.name = createStoreDto.name;
    store.address = createStoreDto.address;
    store.user = user;
    store.userId = user.id;
    store.startTime = createStoreDto.startTime;
    store.endTime = createStoreDto.endTime;

    const savedStore = await this.storeRepository.save(store);

    const role = new Role();
    role.name = Roles.OWNER;
    role.permission = Permission.ADMIN;
    role.user = user;
    role.userId = user.id;
    role.store = savedStore;
    role.storeId = savedStore.id;

    await this.roleRepository.save(role);
  }

  async editStore(
    storeId: number,
    userId: number,
    editStoreDto: EditStoreDto,
  ): Promise<void> {
    const user = await this.userRepository.findOne({ id: userId });

    if (!user) {
      throw new NotFoundException();
    }
    const store = await this.storeRepository.findOne({ id: storeId });

    if (!store) {
      throw new NotFoundException();
    }

    if (userId !== store.userId) {
      throw new UnauthorizedException();
    }

    store.name = editStoreDto.name;
    store.address = editStoreDto.address;
    store.startTime = editStoreDto.startTime;
    store.endTime = editStoreDto.endTime;

    await this.storeRepository.save(store);
  }
}
