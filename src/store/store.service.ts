import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './store.entity';
import { Repository } from 'typeorm';
import { CreateStoreDto } from './dto/create-store.dto';
import { User } from 'src/user/user.entity';
import { Role } from 'src/role/role.entity';
import { Roles } from 'src/role/role.enum';

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
    role.user = user;
    role.userId = user.id;
    role.store = savedStore;
    role.storeId = savedStore.id;

    await this.roleRepository.save(role);
  }
}
