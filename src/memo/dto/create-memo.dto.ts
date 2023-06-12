import { IsString } from 'class-validator';

export class CreateMemoDto {
  /**
   * 생성할 인수인계의 내용
   * @example '오후 7시 저녁 예약 있습니다'
   */
  @IsString()
  content: string;

  /**
   * 생성할 인수인계의 날짜
   * @example '2023-06-12'
   */
  @IsString()
  date: string;
}
