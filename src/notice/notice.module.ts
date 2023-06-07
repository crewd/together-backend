import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice } from './notice.entity';
import { Store } from 'src/store/store.entity';
import { User } from 'src/user/user.entity';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';

@Module({
  imports: [TypeOrmModule.forFeature([Notice, User, Store])],
  controllers: [NoticeController],
  providers: [NoticeService],
})
export class NoticeModule {}
