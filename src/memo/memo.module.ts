import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Memo } from './memo.entity';
import { User } from 'src/user/user.entity';
import { Store } from 'src/store/store.entity';
import { Role } from 'src/role/role.entity';
import { MemoController } from './memo.controller';
import { MemoService } from './memo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Memo, User, Store, Role])],
  controllers: [MemoController],
  providers: [MemoService],
})
export class MemoModule {}
