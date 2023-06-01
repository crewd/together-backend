import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './store.entity';
import { User } from 'src/user/user.entity';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { Role } from 'src/role/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Store, User, Role])],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
