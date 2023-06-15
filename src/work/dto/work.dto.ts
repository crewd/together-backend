import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class WorkDto {
  @Expose()
  id: number;

  @Expose()
  category: string;

  @Expose()
  title: string;

  @Expose()
  content: string;
}
