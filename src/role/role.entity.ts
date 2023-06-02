import { Store } from 'src/store/store.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permission, Roles } from './role.enum';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.PART_TIME,
  })
  name: Roles;

  @Column({
    type: 'enum',
    enum: Permission,
    default: Permission.EMPLOYEE,
  })
  permission: Permission;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Store, (store) => store.id)
  @JoinColumn({ name: 'storeId', referencedColumnName: 'id' })
  store: Store;

  @Column()
  storeId: number;
}
