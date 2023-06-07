import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from './notice.entity';
import { Repository } from 'typeorm';
import { Store } from 'src/store/store.entity';
import { User } from 'src/user/user.entity';
import { Role } from 'src/role/role.entity';
import { plainToInstance } from 'class-transformer';
import { NoticeDto } from './dto/notice.dto';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private noticeRepository: Repository<Notice>,

    @InjectRepository(Store)
    private storeRepository: Repository<Store>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async getNoticeList(userId: number, storeId: number): Promise<NoticeDto[]> {
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

    const notices = await this.noticeRepository.find({ storeId: store.id });

    if (!notices) {
      throw new NotFoundException();
    }

    const noticeList = plainToInstance(NoticeDto, notices);

    return noticeList;
  }
}
