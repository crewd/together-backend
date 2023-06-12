import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class EditMemoDto {
  /**
   * 수정할 인수인계의 내용
   * @example '오후 8시 저녁 예약 있습니다'
   */
  @IsString()
  content: string;

  /**
   * 수정할 인수인계의 완료 여부
   * @example true
   */
  @IsBoolean()
  checked: boolean;

  /**
   * 인수인계의 완료자
   * @example '홍길동'
   */
  @IsOptional()
  @IsString()
  completer: string | null;
}
