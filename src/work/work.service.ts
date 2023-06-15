import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Work } from './work.entity';
import { Repository } from 'typeorm';
import { Store } from 'src/store/store.entity';
import { plainToInstance } from 'class-transformer';
import { WorkDto } from './dto/work.dto';

@Injectable()
export class WokrService {
  constructor(
    @InjectRepository(Work)
    private workRepository: Repository<Work>,

    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
  ) {}

  async getWorkList(categoryId: number): Promise<WorkDto[]> {
    const works = await this.workRepository.find({
      categoryId: categoryId,
    });

    const workList: WorkDto[] = plainToInstance(WorkDto, works);
    return workList;
  }
}
