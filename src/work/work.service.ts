import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Work } from './work.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WokrService {
  constructor(
    @InjectRepository(Work)
    private workRepository: Repository<Work>,
  ) {}
}
