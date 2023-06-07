import { Store } from 'src/store/store.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Notice {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  writer: string;
}
