import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './store.entity';
import { Repository } from 'typeorm';
import { CreateStoreDto } from './dto/create-store.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
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
  }
}
