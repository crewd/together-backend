import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Memo } from './memo.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Store } from 'src/store/store.entity';
import { plainToInstance } from 'class-transformer';
import { MemoDto } from './dto/memo.dto';
import { CreateMemoDto } from './dto/create-memo.dto';

@Injectable()
export class MemoService {
  constructor(
    @InjectRepository(Memo)
    private memoRepository: Repository<Memo>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
  ) {}

  async getMemoList(
    userId: number,
    storeId: number,
    date: string,
  ): Promise<MemoDto[]> {
    const store = await this.storeRepository.find({
      id: storeId,
    });

    if (store.length < 1) {
      throw new NotFoundException();
    }

    const storeUser = store.filter((data) => data.userId === userId);

    if (storeUser.length < 1) {
      throw new UnauthorizedException();
    }

    const memos = await this.memoRepository.find({
      storeId: storeId,
      date: date,
    });

    const memoList = plainToInstance(MemoDto, memos);

    return memoList;
  }

  async createMemo(
    userId: number,
    storeId: number,
    createMemoDto: CreateMemoDto,
  ) {
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

    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const day = String(new Date().getDate()).padStart(2, '0');

    const today = `${year}-${month}-${day}`;

    if (createMemoDto.date !== today) {
      throw new BadRequestException();
    }

    const memo = new Memo();
    memo.user = user;
    memo.userId = user.id;
    memo.store = store;
    memo.storeId = store.id;
    memo.content = createMemoDto.content;
    memo.wirter = user.name;

    memo.date = createMemoDto.date;

    await this.memoRepository.save(memo);
  }
}
