import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class MemoDto {
  @Expose()
  id: number;

  @Expose()
  wirter: string;

  @Expose()
  content: string;

  @Expose()
  checked: boolean;

  @Expose()
  completer: string;

  @Expose()
  createdTime: Date;

  @Expose()
  updatedTime: Date;
}
