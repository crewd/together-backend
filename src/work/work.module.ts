import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Work } from './work.entity';
import { Category } from 'src/category/category.entity';
import { Store } from 'src/store/store.entity';
import { Role } from 'src/role/role.entity';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Work, Category, Store, User, Role])],
  controllers: [],
  providers: [],
})
export class WorkModule {}
