import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Memo } from './memo.entity';
import { User } from 'src/user/user.entity';
import { Store } from 'src/store/store.entity';
import { Role } from 'src/role/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Memo, User, Store, Role])],
  controllers: [],
  providers: [],
})
export class MemoModule {}
