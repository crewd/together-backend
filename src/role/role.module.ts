import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from 'src/store/store.entity';
import { Role } from './role.entity';
import { User } from 'src/user/user.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Store, User])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
