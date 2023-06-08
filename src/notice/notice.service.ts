import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from './notice.entity';
import { Repository } from 'typeorm';
import { Store } from 'src/store/store.entity';
import { User } from 'src/user/user.entity';
import { Role } from 'src/role/role.entity';
import { plainToInstance } from 'class-transformer';
import { NoticeDto } from './dto/notice.dto';
import { Permission } from 'src/role/role.enum';
import { CreateNoticetDto } from './dto/create-notice.dto';
import { EditNoticetDto } from './dto/edit-notice.dto';

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

  async createNotice(
    userId: number,
    storeId: number,
    createNoticeDto: CreateNoticetDto,
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

    const role = await this.roleRepository.findOne({
      userId: userId,
      storeId: storeId,
    });

    if (role.permission !== Permission.ADMIN) {
      throw new UnauthorizedException();
    }

    const notice = new Notice();
    notice.title = createNoticeDto.title;
    notice.content = createNoticeDto.content;
    notice.user = user;
    notice.userId = user.id;
    notice.store = store;
    notice.storeId = store.id;
    notice.writer = user.name;

    await this.noticeRepository.save(notice);
  }

  async editNotice(
    userId: number,
    storeId: number,
    noticeId: number,
    editNoticeDto: EditNoticetDto,
  ): Promise<void> {
    const user = await this.userRepository.findOne({ id: userId });

    if (!user) {
      throw new NotFoundException();
    }

    const userRole = await this.roleRepository.findOne({
      userId: userId,
      storeId: storeId,
    });

    if (!userRole) {
      throw new NotFoundException();
    }

    if (userRole.permission !== Permission.ADMIN) {
      throw new UnauthorizedException();
    }

    const notice = await this.noticeRepository.findOne({ id: noticeId });

    if (!notice) {
      throw new NotFoundException();
    }

    notice.title = editNoticeDto.title;
    notice.content = editNoticeDto.content;

    await this.noticeRepository.save(notice);
  }

  async deleteNotice(
    userId: number,
    storeId: number,
    noticeId: number,
  ): Promise<void> {
    const user = await this.userRepository.findOne({ id: userId });

    if (!user) {
      throw new NotFoundException();
    }

    const userRole = await this.roleRepository.findOne({
      userId: userId,
      storeId: storeId,
    });

    if (!userRole) {
      throw new NotFoundException();
    }

    if (userRole.permission !== Permission.ADMIN) {
      throw new UnauthorizedException();
    }

    const notice = await this.noticeRepository.findOne({ id: noticeId });

    if (!notice) {
      throw new NotFoundException();
    }

    await this.noticeRepository.delete({ id: noticeId });
  }
}
