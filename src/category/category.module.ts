import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Store } from 'src/store/store.entity';
import { User } from 'src/user/user.entity';
import { Role } from 'src/role/role.entity';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Store, User, Role])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
