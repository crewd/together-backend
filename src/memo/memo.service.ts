import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Memo } from './memo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MemoService {
  constructor(
    @InjectRepository(Memo)
    private memoRepository: Repository<Memo>,
  ) {}
}
