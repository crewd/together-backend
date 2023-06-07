import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class StoreDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  address: string;

  @Expose()
  startTime: string;

  @Expose()
  endTime: string;
}
