import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Store } from 'src/store/store.entity';
import { User } from 'src/user/user.entity';
import { Role } from 'src/role/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Store, User, Role])],
  controllers: [],
  providers: [],
})
export class CategoryModule {}
