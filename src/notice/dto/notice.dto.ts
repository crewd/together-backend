import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class NoticeDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  wirter: string;

  @Expose()
  createdTime: Date;

  @Expose()
  updatedTime: Date;
}
