import { IsString } from 'class-validator';

export class CreateStoreDto {
  /**
   * 생성할 매장의 이름
   * @example "왕수제돈까스"
   */
  @IsString()
  name: string;

  /**
   * 생성할 매장의 주소
   * @example "서울시 마포구 월드컵북로 33"
   */
  @IsString()
  address: string;

  /**
   * 생성할 매장의 오픈 시간
   * @example "오전 09:00"
   */
  @IsString()
  startTime: string;

  /**
   * 생성할 매장의 마감 시간
   * @example "오후 09:00"
   */
  @IsString()
  endTime: string;
}
