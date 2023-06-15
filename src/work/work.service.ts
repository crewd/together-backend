import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Work } from './work.entity';
import { Repository } from 'typeorm';
import { Store } from 'src/store/store.entity';
import { plainToInstance } from 'class-transformer';
import { WorkDto } from './dto/work.dto';
import { Category } from 'src/category/category.entity';

@Injectable()
export class WokrService {
  constructor(
    @InjectRepository(Work)
    private workRepository: Repository<Work>,

    @InjectRepository(Store)
    private storeRepository: Repository<Store>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getWorkList(categoryId: number): Promise<WorkDto[]> {
    const category = await this.categoryRepository.findOne({ id: categoryId });

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
