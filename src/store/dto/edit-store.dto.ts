import { IsString } from 'class-validator';

export class EditStoreDto {
  /**
   * 수정할 매장의 이름
   * @example "교촌치킨"
   */
  @IsString()
  name: string;

  /**
   * 수정할 매장의 주소
   * @example "서울시 마포구 월드컵북로 35"
   */
  @IsString()
  address: string;

  /**
   * 수정할 매장의 오픈 시간
   * @example "오전 10:00"
   */
  @IsString()
  startTime: string;

  /**
   * 수정할 매장의 마감 시간
   * @example "오후 10:00"
   */
  @IsString()
  endTime: string;
}
