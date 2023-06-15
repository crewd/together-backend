import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Work } from './work.entity';
import { Repository } from 'typeorm';
import { Store } from 'src/store/store.entity';
import { plainToInstance } from 'class-transformer';
import { WorkDto } from './dto/work.dto';
import { Category } from 'src/category/category.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class WokrService {
  constructor(
    @InjectRepository(Work)
    private workRepository: Repository<Work>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Store)
    private storeRepository: Repository<Store>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getWorkList(
    userId: number,
    storeId: number,
    categoryId: number,
  ): Promise<WorkDto[]> {
    const user = await this.userRepository.findOne({ id: userId });

    if (!user) {
      throw new NotFoundException();
    }

    const store = await this.storeRepository.findOne({
      id: storeId,
      userId: userId,
    });

    if (!store) {
      throw new NotFoundException();
    }

    const category = await this.categoryRepository.findOne({
      id: categoryId,
      storeId: storeId,
    });

    if (!category) {
      throw new NotFoundException();
    }

    const works = await this.workRepository.find({
      categoryId: categoryId,
    });

    const workList: WorkDto[] = plainToInstance(WorkDto, works);
    return workList;
  }
}
