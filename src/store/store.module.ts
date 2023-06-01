import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './store.entity';
import { User } from 'src/user/user.entity';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Store]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
