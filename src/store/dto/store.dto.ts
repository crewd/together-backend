import { IsNumber, IsString } from 'class-validator';

export class StoreDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;
}
