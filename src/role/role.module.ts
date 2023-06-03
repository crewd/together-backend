import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from 'src/store/store.entity';
import { User } from 'src/user/user.decorator';
import { Role } from './role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Store, User])],
  controllers: [],
  providers: [],
})
export class RoleModule {}
