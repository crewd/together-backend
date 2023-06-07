import { IsNumber, IsString } from 'class-validator';

export class NoticeDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  wirter: string;
}
