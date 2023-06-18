import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Work } from './work.entity';
import { Repository } from 'typeorm';
import { Store } from 'src/store/store.entity';
import { plainToInstance } from 'class-transformer';
import { WorkDto } from './dto/work.dto';
import { Category } from 'src/category/category.entity';
import { User } from 'src/user/user.entity';
import { CreateWorkDto } from './dto/create-work.dto';
import { Role } from 'src/role/role.entity';
import { Permission } from 'src/role/role.enum';

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

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
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

  async createWork(
    userId: number,
    storeId: number,
    categoryId: number,
    createWorkDto: CreateWorkDto,
  ): Promise<void> {
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

    const category = await this.categoryRepository.findOne({ id: categoryId });

    if (category.storeId !== storeId) {
      throw new BadRequestException();
    }

    const role = await this.roleRepository.findOne({ userId, storeId });

    if (role.permission !== Permission.ADMIN) {
      throw new UnauthorizedException();
    }

    const work = new Work();
    work.store = store;
    work.storeId = storeId;
    work.category = category;
    work.categoryId = categoryId;
    work.title = createWorkDto.title;
    work.content = createWorkDto.content;

    await this.workRepository.save(work);
  }
}
